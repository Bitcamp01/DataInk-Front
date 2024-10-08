import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';
import ProfileInit from '../pages/ProfileInit';
import Profile from '../components/mypage/Profile';
import Workstatus from '../components/mypage/Workstatus';
import Alarm from '../components/mypage/Alarm';
import StatusEditModal from '../components/mypage/StatusEditModal';
import { useLocation } from 'react-router-dom'; // 추가된 import
import '../css/profile.css';

const MypageContainer = styled.div `
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
`;

const Mypage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [status, setStatus] = useState("소개 글을 입력해 주세요.");
    const [activeTab, setActiveTab] = useState('Profile');
    const [profileImage, setProfileImage] = useState('/images/dataInk_logo_sqr.png');
    const [backgroundImage, setBackgroundImage] = useState('/images/dataInk_background_default.jpg');

    // location 객체를 사용하여 URL 쿼리 파라미터를 가져오기
    const location = useLocation();

    // 비밀번호 확인 완료 후 인증 상태 변경
    const handleAuthentication = () => {
        setIsAuthenticated(true);
    };

    const handleOpenStatusModal = () => {
        setStatusModalOpen(true);
    };

    const handleCloseStatusModal = () => {
        setStatusModalOpen(false);
    };

    const handleSaveStatus = (newStatus) => {
        setStatus(newStatus);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleBackgroundUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };

    // 쿼리 파라미터에서 섹션을 읽어서 activeTab 상태를 설정
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const section = queryParams.get('section');
        if (section) {
            setActiveTab(section === 'workstatus' ? 'Workstatus' : 'Profile'); // section에 따라 탭 변경
        }
    }, [location.search]); // location.search가 변경될 때마다 실행

    // 인증되지 않은 경우 ProfileInit을 렌더링
    if (!isAuthenticated) {
        return <ProfileInit onAuthenticate={handleAuthentication} />;
    }

    const renderComponent = () => {
        if (activeTab === 'Profile') return <Profile />;
        if (activeTab === 'Workstatus') return <Workstatus />;
        if (activeTab === 'Alarm') return <Alarm />;
    };

    return (
        <MypageContainer>
            <section className="profile-content">
                <div className="profile-header" 
                    style={{ backgroundImage: `url(${backgroundImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'
                }}
                >
                    <button className="edit-header-btn"
                        onClick={() => document.querySelector('.background-input').click()}
                    >
                        배경 수정
                    </button>
                    
                    <input 
                        type="file" 
                        className="background-input"
                        style={{ display: 'none' }} 
                        accept="image/*" 
                        onChange={handleBackgroundUpload} 
                    />

                    <div className="profile-cover"></div>
                    <div className="profile-info">
                        <img 
                            id="profile-image" 
                            className="profile-info__image" 
                            src={profileImage} 
                            alt="Profile Image" 
                        />
                        <img 
                            className="profile-info__editicon" 
                            src="/icons/profile_image.svg"
                            alt="Edit Profile Icon" 
                            onClick={() => document.getElementById('profile-input').click()}
                        />
                        <input 
                            type="file" 
                            id="profile-input" 
                            style={{ display: 'none' }} 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                        />

                        <div className="profile-info__intro">
                            <h2 className="profile-info__intro profile-info__intro--name">Soyeon Jung</h2>
                            <p className="profile-info__intro profile-info__intro--role">Labeler</p>
                            <p className="profile-info__intro profile-info__intro--status">
                                {status}
                                <button className="edit-status-btn" onClick={handleOpenStatusModal}>
                                    Edit
                                </button>
                            </p>
                        </div>
                        <div className="profile-buttons">
                            <button className="calendar-btn">Calendar</button>
                        </div>
                    </div>
                </div>

                <div className="tabs">
                    <button
                        className={`tab-links ${activeTab === 'Profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`tab-links ${activeTab === 'Workstatus' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Workstatus')}
                    >
                        Work status
                    </button>
                    <button
                        className={`tab-links alarm ${activeTab === 'Alarm' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Alarm')}
                    >
                        Alarm
                    </button>
                </div>

                <div>
                    {renderComponent()}
                </div>
            </section>
            <StatusEditModal 
                isOpen={isStatusModalOpen} 
                onClose={handleCloseStatusModal} 
                onSave={handleSaveStatus}
            />
        </MypageContainer>
    );
};

export default Mypage;
