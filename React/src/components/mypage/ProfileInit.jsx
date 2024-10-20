import React, { useState } from 'react';
import styled from 'styled-components';
import '../../css/profileInit.css';
import { useDispatch  } from 'react-redux';
import { passwordChk } from '../../apis/mypageApis';
import { useNavigate } from 'react-router-dom'; // navigate 사용

const BackgroundContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
    background-color: white; /* 배경을 흰색으로 설정 */
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileInit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // navigate 함수 추가
    const [password, setPassword] = useState(''); // 비밀번호 상태 추가
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // 입력된 비밀번호 상태 업데이트
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(passwordChk(password));
        if (passwordChk.fulfilled.match(resultAction)) {
            // 비밀번호 확인 성공 시 profile 페이지로 이동
            navigate('/mypage?section=Profile');
        } else {
            // 실패한 경우 오류 메시지 설정
            setErrorMessage('비밀번호가 잘못되었습니다. 다시 시도해주세요.');
        }
    };

    return (
        <BackgroundContainer>
            <div className="profileinit-content">
                <div className='profileinit-box'>
                    <div className="profileinit-header-title">
                        <h3>비공개 페이지 입니다.</h3>
                        <h3>비밀번호를 입력해주세요.</h3>
                    </div>

                    <form className="profileinit-form" onSubmit={handlePasswordSubmit}>
                        <div className="profileinit-form__group">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="대소문자 숫자가 포함된 8-16자 이내"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="submit" className="profileinit-form__submit">확인</button>
                    </form>

                    {/* 비밀번호 검증 실패 시 오류 메시지 표시 */}
                    {errorMessage && (
                        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
                    )}
                </div>
            </div>
        </BackgroundContainer>
    );
};

export default ProfileInit;