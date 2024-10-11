import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../css/profileInit.css';
import { useSelector } from 'react-redux';
// import axios from 'axios';


const BackgroundContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
    background-color: white; /* 배경을 흰색으로 설정 */
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileInit = ({onAuthenticate}) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState(''); // 비밀번호 상태 추가
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가

    // const isLogin = useSelector(state => state.user.isLogin);

    // useEffect(() => {
        
    //     if(!isLogin) {
    //         navigate('/login');
    //     }
    // }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // 입력된 비밀번호 상태 업데이트
    };

    // const handlePasswordSubmit = async (e) => {
    //     e.preventDefault();

    //     // 비밀번호 검증 로직
    //     try {
    //         const response = await axios.post('http:주소값넣어줘야함', {
    //             password
    //         });

    //         // 검증 성공 시
    //         if (response.data.isValid) {
    //             onAuthenticate(); // 인증 상태 변경
    //             navigate('/mypage'); // 인증이 완료되면 Mypage로 이동
    //         } else {
    //             setErrorMessage('비밀번호가 틀렸습니다. 다시 시도해 주세요.');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setErrorMessage('오류가 발생했습니다. 다시 시도해 주세요.');
    //     }
    // };

    ////////////////// 임시로 바로 인증 통과 및 페이지 이동//////////////////////////
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        onAuthenticate();
        navigate('/mypage');
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
    )
}

export default ProfileInit