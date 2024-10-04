import React, { useState } from 'react';
import ProfileInit from '../pages/ProfileInit';
import Profile from '../components/mypage/Profile';
import Workstatus from '../components/mypage/Workstatus';
import Alarm from '../components/mypage/Alarm';
import '../css/profile.css';

const Mypage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('Profile');
    const [profileImage, setProfileImage] = useState('/images/jeolmi_img.jpg');
    const [backgroundImage, setBackgroundImage] = useState('/images/profileBackground_img.jpg');


    // 비밀번호 확인 완료 후 인증 상태 변경
    const handleAuthentication = () => {
        setIsAuthenticated(true);
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

    // if (!isAuthenticated) {
    //     return <ProfileInit onAuthenticate={() => setIsAuthenticated(true)} />;
    // }

    // 인증되지 않은 경우 ProfileInit을 렌더링
    if (!isAuthenticated) {
        return <ProfileInit onAuthenticate={handleAuthentication} />;
    }

    const openTab = (tabName) => {
        setActiveTab(tabName);
        };

    const renderComponent = () => {
        if (activeTab === 'Profile') return <Profile />;
        if (activeTab === 'Workstatus') return <Workstatus />;
        if (activeTab === 'Alarm') return <Alarm />;
        };

    return (
        <section className="profile-content">
            <div className="profile-header" 
                style={{ backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
            }}
            >
                {/* 배경 수정 버튼 */}
                <button className="edit-header-btn"
                    onClick={() => document.querySelector('.background-input').click()}
                >
                    배경 수정
                </button>
                
                {/* 배경 이미지 업로드 input */}
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
                            언제든지 편하게 연락해주세요 :)
                            <button className="edit-status-btn">Edit</button>
                        </p>
                    </div>
                    <div className="profile-buttons">
                        <button className="calendar-btn">Calendar</button>
                    </div>
                </div>
            </div>

            {/* 탭 버튼 */}
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
    );
};

export default Mypage;
