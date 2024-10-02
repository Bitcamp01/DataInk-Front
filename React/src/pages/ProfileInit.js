import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/profileInit.css';

const ProfileInit = ({onAuthenticate}) => {
    const navigate = useNavigate();

    const handlePasswordSubmit = (e) => {
        e.preventDefault(); // 기본 동작 방지
        onAuthenticate(); // 인증 상태 변경
      // 비밀번호 검증 로직
      navigate('/mypage'); // 인증이 완료되면 Mypage로 이동
    };


    return (
        <div className="profileinit-content">
            <div className="profileinit-header-title">
                <h3>비공개 페이지 입니다. 비밀번호를 눌러주세요.</h3>
            </div>

            <form className="profileinit-form" onSubmit={handlePasswordSubmit}>
                <div className="profileinit-form__group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" placeholder="대소문자 숫자가 포함된 8-16자 이내" />
                </div>

                <div className="profileinit-form__group">
                    <button type="submit" className="profile-form__submit">확인</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileInit