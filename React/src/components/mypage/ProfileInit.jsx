import React, { useState } from 'react';
import styled from 'styled-components';
import '../../css/profileInit.css';
import { useDispatch  } from 'react-redux';
import { passwordChk, fetchUserDetails  } from '../../apis/mypageApis';
// import { useNavigate } from 'react-router-dom';

const BackgroundContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
    background-color: #f9f9f9; /* 배경을 흰색으로 설정 */
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileInit = ({ onAuthenticated }) => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [password, setPassword] = useState(''); // 비밀번호 상태 추가
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // 입력된 비밀번호 상태 업데이트
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(passwordChk(password));
        if (passwordChk.fulfilled.match(resultAction)) {
            // 비밀번호 확인 후 인증 상태 true로 설정
            onAuthenticated();  
            
            // userDetails 다시 로드
            await dispatch(fetchUserDetails());
        } else {
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
                        <p style={{ color: 'red', marginTop: '10px', fontSize: '15px' }}>{errorMessage}</p>
                    )}
                </div>
            </div>
        </BackgroundContainer>
    );
};

export default ProfileInit;