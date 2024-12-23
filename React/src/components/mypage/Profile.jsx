import React, { useState, useEffect } from 'react';
import '../../css/profile.css';
import PasswordChangeModal from './PasswordChangeModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails, updateMypageInfo } from '../../apis/mypageApis';

const Profile = ({userDetails}) => {
    console.log("Profile component received userDetails:", userDetails);
    const dispatch = useDispatch();

    // Redux에서 사용자 데이터 가져오기
    const { name, id, email, tel, birth } = useSelector(state => state.userSlice);

    // 비밀번호 변경 모달 열림/닫힘 상태 관리
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    
    // 주소 관련 상태 관리
    const [nickname, setNickname] = useState(userDetails?.nickname || '');
    const [dep, setDep] = useState(userDetails?.dep || '');
    const [address, setAddress] = useState(userDetails?.addr || '');
    const [postcode, setPostcode] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');

    useEffect(() => {
        if (userDetails?.addr) {
            const addressParts = userDetails.addr.match(/([0-9]{5})\s(.+?\s\d+)\s(.+?)-(.+?)\s\((.+?)\)/);
            if (addressParts) {
                setPostcode(addressParts[1]);           // 우편번호
                setAddress(addressParts[2]);        // 도로명 주소까지만
                setDetailAddress(`${addressParts[3]}-${addressParts[4]}`); // 동호수만
                setExtraAddress(addressParts[5]);       // 참고 항목
            }
        }
    }, [userDetails]);


    // Daum 우편번호 API 스크립트 로드
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        // 스크립트 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 비밀번호 모달 열기
    const openPasswordModal = (e) => {
        e.preventDefault(); // 버튼의 기본 동작 방지
        setIsPasswordModalOpen(true);
    };

    // 비밀번호 모달 닫기
    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    // Daum 우편번호 찾기 API 함수
    const execDaumPostcode = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function(data) {
                    let addr = ''; // 주소 변수
                    let extraAddr = ''; // 참고항목 변수

                    // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress;
                    } else {
                        addr = data.jibunAddress;
                    }

                    // 참고항목 조합
                    if (data.userSelectedType === 'R') {
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                    }

                    // 상태에 값 설정
                    setPostcode(data.zonecode);
                    setAddress(addr);
                    setExtraAddress(extraAddr);
                    setDetailAddress(''); // 상세 주소는 비워둔다.
                }
            }).open();
        } else {
            console.error('Daum Postcode API가 로드되지 않았습니다.');
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
    
        try {
            const fullAddress = `${postcode} ${address} ${detailAddress} ${extraAddress}`;
            await dispatch(updateMypageInfo({
                nickname,
                dep,
                addr: fullAddress
            })).unwrap();
            alert('회원 정보가 성공적으로 수정되었습니다.');
            
            // 저장 후 최신 정보를 다시 가져옴
            dispatch(fetchUserDetails());
        } catch (error) {
            alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        // userDetails가 변경될 때마다 nickname, dep, address 값 설정
        setNickname(userDetails?.nickname || '');
        setDep(userDetails?.dep || '');
        setAddress(userDetails?.addr || '');
    }, [userDetails]);

    return (
        <div id="Profile" className="tab-content">
            <div className="profile-header-title">
                <h3>회원정보수정</h3>
                <p className="required-info">*는 필수입력 항목입니다</p>
            </div>
            <form className="profile-form">
                {/* 폼 필드들 */}
                <div className="profile-form__group">
                    <label htmlFor="name">*이름</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="이름"
                        value={name}
                        readOnly 
                    />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="username">*아이디</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="아이디"
                        value={id}
                        readOnly 
                    />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="nickname">닉네임</label>
                    <input 
                        type="text" 
                        id="nickname" 
                        name="nickname" 
                        placeholder="닉네임 입력해주세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="dep">부서</label>
                    <input 
                        type="text" 
                        id="department" 
                        name="department" 
                        placeholder="부서 입력해주세요"
                        value={dep}
                        onChange={(e) => setDep(e.target.value)}
                    />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="email">*이메일</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="이메일 주소를 입력해주세요" 
                        value={email}
                    />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="phone-carrier">*휴대폰 번호</label>
                    <div className="profile-form__input-container">
                        <input 
                            type="text" 
                            id="phone" 
                            name="phone" 
                            placeholder="-없이 숫자만 입력" 
                            value={tel}
                        />
                    </div>
                </div>
                <div className="profile-form__group">
                    <label htmlFor="birthdate">*생년월일</label>
                    <input 
                        type="text" 
                        id="birthdate" 
                        name="birthdate" 
                        placeholder="생년월일"
                        value={birth}
                        readOnly 
                    />
                </div>
                
                {/* 주소 입력 필드 */}
                <div className="profile-form__group">
                    <label htmlFor="address" className="address-label">주소</label>
                    <div className="profile-form__group-address">
                        <div className="postcode-container">
                            <input 
                                type="text" 
                                className="postcode-number"
                                id="sample6_postcode" 
                                name="postcode" 
                                placeholder="우편 번호" 
                                value={postcode} 
                                readOnly 
                            />
                            <input 
                                type="button" 
                                className="postcode-search"
                                onClick={execDaumPostcode} 
                                value="우편번호 찾기" 
                            />
                        </div>
                        <input 
                            type="text" 
                            name="address" 
                            placeholder="도로명 / 지번주소" 
                            value={address} 
                            readOnly 
                        />
                        <input 
                            type="text" 
                            name="detailed-address" 
                            placeholder="상세 주소" 
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            name="extra-address" 
                            placeholder="참고 항목" 
                            value={extraAddress} 
                            readOnly 
                        />
                    </div>
                </div>

                <div className="button-container">
                    <button 
                        className="button profile-form__submit" 
                        onClick={openPasswordModal}
                    >
                        비밀번호 변경
                    </button>
                    <button 
                        className="button profile-password__submit"
                        onClick={handleSaveProfile}
                    >
                        저장
                    </button>
                </div>
            </form>
            
            {/* 비밀번호 변경 모달 컴포넌트 */}
            <PasswordChangeModal 
                isOpen={isPasswordModalOpen} 
                onClose={closePasswordModal}
            />
        </div>
    );
};

export default Profile;
