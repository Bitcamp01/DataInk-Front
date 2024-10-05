import React, { useState } from 'react';
import '../../css/profile.css';
import PasswordChangeModal from './PasswordChangeModal'; // 모달 컴포넌트 임포트

const Profile = () => {
    // 비밀번호 변경 모달 열림/닫힘 상태 관리
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    // 비밀번호 모달 열기
    const openPasswordModal = (e) => {
        e.preventDefault(); // 버튼의 기본 동작 방지
        setIsPasswordModalOpen(true);
    };

    // 비밀번호 모달 닫기
    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

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
                    <input type="text" id="name" name="name" placeholder="이름 입력" />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="username">*아이디</label>
                    <input type="text" id="username" name="username" placeholder="아이디 입력" />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="nickname">*닉네임</label>
                    <input type="text" id="nickname" name="nickname" placeholder="닉네임 입력" />
                </div>
                {/* <div className="profile-form__group">
                <label htmlFor="password">*비밀번호</label>
                <input type="password" id="password" name="password" placeholder="대소문자 숫자가 포함된 8-16자 이내" />
                </div>
                <div className="profile-form__group">
                <label htmlFor="confirm-password">*비밀번호 확인</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="비밀번호를 동일하게 입력해주세요" />
                </div> */}
                <div className="profile-form__group">
                    <label htmlFor="email">*이메일</label>
                    <input type="email" id="email" name="email" placeholder="이메일 주소를 입력해주세요" />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="phone-carrier">*휴대폰 인증</label>
                    <select id="phone-carrier" name="carrier">
                        <option value="KT">KT</option>
                        <option value="SKT">SKT</option>
                        <option value="LGU+">LGU+</option>
                    </select>
                    <div className="profile-form__input-container">
                        <input type="text" id="phone" name="phone" placeholder="-없이 숫자만 입력" />
                        <button type="button" className="profile-form__button">인증번호 요청</button>
                    </div>
                </div>
                <div className="profile-form__group">
                    <label htmlFor="birthdate">생년월일</label>
                    <input type="text" id="birthdate" name="birthdate" placeholder="생년월일 6자리" />
                </div>
                <div className="profile-form__group">
                    <label htmlFor="address" className="address-label">주소</label>
                    <div className="profile-form__group-address">
                        <input type="text" id="address" name="address" placeholder="우편 번호" />
                        <input type="text" name="detailed-address" placeholder="도로명 / 지번주소" />
                        <input type="text" name="extra-address" placeholder="상세 주소" />
                    </div>
                </div>
                <div className="button-container">
                    <button className="button profile-form__submit" onClick={openPasswordModal}>비밀번호 변경</button>
                    <button className="button profile-password__submit">저장</button>
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
