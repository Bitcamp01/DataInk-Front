import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ProfileInit from '../components/mypage/ProfileInit';
import Profile from '../components/mypage/Profile';
import Workstatus from '../components/mypage/Workstatus';
import Alarm from '../components/mypage/Alarm';
import Calendar from '../components/mypage/Calendar';
import StatusEditModal from '../components/mypage/StatusEditModal';
import BackgroundImgModal from '../components/mypage/BackgroundImgModal';
import ProfileImgModal from '../components/mypage/ProfileImgModal';
import '../css/profile.css';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { passwordChk } from '../apis/mypageApis';
import { resetProfileAuth } from '../slices/mypageSlice';

const MypageContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
`;

const Mypage = () => {
    const dispatch = useDispatch();
    const { isProfileAuthenticated } = useSelector(state => state.mypageSlice);
    const { name = '', id = '', email = '', tel = '', birth = '', authen = '' } = useSelector(state => state.userSlice);
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [status, setStatus] = useState("소개 글을 입력해 주세요.");
    const [activeTab, setActiveTab] = useState('Workstatus');
    const [profileImage, setProfileImage] = useState('/images/dataInk_logo_sqr.png');
    const [backgroundImage, setBackgroundImage] = useState('/images/dataInk_background_default.jpg');
    const [selectedBackgroundFile, setSelectedBackgroundFile] = useState(null);
    const [selectedProfileFile, setSelectedProfileFile] = useState(null);
    

    const location = useLocation();

    const handleProfileAuthentication = async (password) => {
        await dispatch(passwordChk(password));
    };

    useEffect(() => {
        // Query parameters를 사용하여 activeTab 설정
        const queryParams = new URLSearchParams(location.search);
        const section = queryParams.get('section');

        if (section && ['Alarm', 'Profile', 'Calendar'].includes(section)) {
            setActiveTab(section);
        }
    }, [location.search]);

    useEffect(() => {
        // Reset profile authentication every time Profile tab is clicked
        if (activeTab === 'Profile') {
            dispatch(resetProfileAuth());
        }
    }, [activeTab]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/api/user');
                const userData = response.data.user;
                setStatus(userData?.status || "소개 글을 입력해 주세요.");
                setProfileImage(userData?.profileImage || '/images/dataInk_logo_sqr.png');
                setBackgroundImage(userData?.backgroundImage || '/images/dataInk_background_default.jpg');
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        // 배경 이미지 업데이트 (파일 선택되었을 때)
        if (selectedBackgroundFile) {
            const imageUrl = URL.createObjectURL(selectedBackgroundFile);
            setBackgroundImage(imageUrl);
        }
    }, [selectedBackgroundFile]);

    useEffect(() => {
        // 프로필 이미지 업데이트 (파일 선택되었을 때)
        if (selectedProfileFile) {
            const imageUrl = URL.createObjectURL(selectedProfileFile);
            setProfileImage(imageUrl);
        }
    }, [selectedProfileFile]);

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

    const handleOpenBackgroundModal = () => {
        setIsBackgroundModalOpen(true);
    };

    const handleCloseBackgroundModal = () => {
        setIsBackgroundModalOpen(false);
    };

    const handleSaveBackground = (file) => {
        if (file) {
            setSelectedBackgroundFile(file);
        }
        setIsBackgroundModalOpen(false);
    };

    const handleSetDefaultBackground = () => {
        setBackgroundImage('/images/dataInk_background_default.jpg');
        setSelectedBackgroundFile(null);
        setIsBackgroundModalOpen(false);
    };

    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleSaveProfile = (file) => {
        if (file) {
            setSelectedProfileFile(file);
        }
        setIsProfileModalOpen(false);
    };

    const handleSetDefaultProfile = () => {
        setProfileImage('/images/dataInk_logo_sqr.png');
        setSelectedProfileFile(null);
        setIsProfileModalOpen(false);
    };

    const renderComponent = () => {
        if (activeTab === 'Profile') {
            if (!isProfileAuthenticated) {
                return <ProfileInit onAuthenticate={(password) => { handleProfileAuthentication(password); }} />;
            }
            return <Profile userDetails={{ name, id, email, tel, birth }} />;
        }
        if (activeTab === 'Workstatus') return <Workstatus />;
        if (activeTab === 'Alarm') return <Alarm />;
        if (activeTab === 'Calendar') return <Calendar />;
    };

    return (
        <MypageContainer>
            <section className="profile-content">
                <div className="profile-header" 
                    style={{ 
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                >
                    <button className="edit-header-btn"
                        onClick={handleOpenBackgroundModal}
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
                            onClick={handleOpenProfileModal}
                        />
                        <input 
                            type="file" 
                            id="profile-input" 
                            style={{ display: 'none' }} 
                            accept="image/*" 
                            onChange={handleProfileImageUpload} 
                        />

                        <div className="profile-info__intro">
                            <h2 className="profile-info__intro profile-info__intro--name">{name}</h2>
                            <p className="profile-info__intro profile-info__intro--role">{authen}</p>
                            <p className="profile-info__intro profile-info__intro--status">
                                {status}
                                <button className="edit-status-btn" onClick={handleOpenStatusModal}>
                                    Edit
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="tabs">
                    <button
                        className={`tab-links workstatus ${activeTab === 'Workstatus' ? 'active' : ''}`}
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
                    <button
                        className={`tab-links profile ${activeTab === 'Profile' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('Profile');
                            dispatch(resetProfileAuth());
                        }}
                    >
                        Profile
                    </button>
                    <button
                        className={`tab-links calendar ${activeTab === 'Calendar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Calendar')}
                    >
                        Calendar
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
                currentImage={backgroundImage}
                defaultImage="/images/dataInk_background_default.jpg"
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