import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 백엔드에서 유저 정보를 가져오기 위한 axios
import styled from 'styled-components';
import ProfileInit from '../pages/ProfileInit';
import Profile from '../components/mypage/Profile';
import Workstatus from '../components/mypage/Workstatus';
import Alarm from '../components/mypage/Alarm';
import StatusEditModal from '../components/mypage/StatusEditModal';
import BackgroundImgModal from '../components/mypage/BackgroundImgModal';
import ProfileImgModal from '../components/mypage/ProfileImgModal'; // 새로 추가된 컴포넌트
import { useLocation } from 'react-router-dom';
import '../css/profile.css';

const MypageContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
`;

const Mypage = () => {
    const [user, setUser] = useState({ name: '', role: '' }); // 유저 정보 상태
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false); // 배경 이미지 모달 상태
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // 프로필 이미지 모달 상태
    const [status, setStatus] = useState("소개 글을 입력해 주세요.");
    const [activeTab, setActiveTab] = useState('Profile');
    const [profileImage, setProfileImage] = useState('/images/dataInk_logo_sqr.png');
    const [backgroundImage, setBackgroundImage] = useState('/images/dataInk_background_default.jpg');
    const [selectedBackgroundFile, setSelectedBackgroundFile] = useState(null);
    const [selectedProfileFile, setSelectedProfileFile] = useState(null); // 프로필 파일 상태
    

    const location = useLocation();

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

    const handleProfileImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // 배경 수정 모달 열기
    const handleOpenBackgroundModal = () => {
        setIsBackgroundModalOpen(true);
    };

    // 배경 수정 모달 닫기
    const handleCloseBackgroundModal = () => {
        setIsBackgroundModalOpen(false);
    };

    // 배경 이미지 저장
    const handleSaveBackground = (file) => {
        if (file) {
            setSelectedBackgroundFile(file);
        }
        setIsBackgroundModalOpen(false);
    };

    // 기본 이미지로 설정
    const handleSetDefaultBackground = () => {
        setBackgroundImage('/images/dataInk_background_default.jpg');
        setSelectedBackgroundFile(null);
        setIsBackgroundModalOpen(false);
    };

    // 프로필 수정 모달 열기
    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    // 프로필 수정 모달 닫기
    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    // 프로필 이미지 저장
    const handleSaveProfile = (file) => {
        if (file) {
            setSelectedProfileFile(file);
        }
        setIsProfileModalOpen(false);
    };

    // 기본 이미지로 설정
    const handleSetDefaultProfile = () => {
        setProfileImage('/images/dataInk_logo_sqr.png');
        setSelectedProfileFile(null);
        setIsProfileModalOpen(false);
    };
    useEffect(() => {
        if (isAuthenticated) { // isAuthenticated가 true일 때만 실행
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get('/api/user');
                    const userData = response.data.user;
                    setUser({
                        name: userData.name,
                        role: userData.role,
                    });
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };

            fetchUserInfo();
        }
    }, [isAuthenticated]); // isAuthenticated가 변경될 때만 useEffect 실행

    // 배경 이미지 업데이트 (파일 선택되었을 때)
    useEffect(() => {
        if (selectedBackgroundFile) {
            const imageUrl = URL.createObjectURL(selectedBackgroundFile);
            setBackgroundImage(imageUrl);
        }
    }, [selectedBackgroundFile]);

    // 프로필 이미지 업데이트 (파일 선택되었을 때)
    useEffect(() => {
        if (selectedProfileFile) {
            const imageUrl = URL.createObjectURL(selectedProfileFile);
            setProfileImage(imageUrl);
        }
    }, [selectedProfileFile]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const section = queryParams.get('section');
        if (section) {
            setActiveTab(section === 'workstatus' ? 'Workstatus' : 'Profile');
        }
    }, [location.search]);

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
                        onClick={handleOpenBackgroundModal} // 배경 수정 모달 열기
                    >
                        배경 수정
                    </button>

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
                            onClick={handleOpenProfileModal} // 프로필 수정 모달 열기
                        />
                        <input 
                            type="file" 
                            id="profile-input" 
                            style={{ display: 'none' }} 
                            accept="image/*" 
                            onChange={handleProfileImageUpload} 
                        />

                        <div className="profile-info__intro">
                            <h2 className="profile-info__intro profile-info__intro--name">{user.name}Soyeon Jung</h2>
                            <p className="profile-info__intro profile-info__intro--role">{user.role}Labeler</p>
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

            <BackgroundImgModal 
                isOpen={isBackgroundModalOpen} 
                currentImage={backgroundImage} // 현재 배경 이미지
                defaultImage="/images/dataInk_background_default.jpg" // 기본 이미지
                onClose={handleCloseBackgroundModal} 
                onSave={handleSaveBackground} 
                onSetDefault={handleSetDefaultBackground} 
            />

            <ProfileImgModal 
                isOpen={isProfileModalOpen}
                currentImage={profileImage}
                defaultImage="/images/dataInk_logo_sqr.png"
                onClose={handleCloseProfileModal}
                onSave={handleSaveProfile}
                onSetDefault={handleSetDefaultProfile}
            />
        </MypageContainer>
    );

};

export default Mypage;
