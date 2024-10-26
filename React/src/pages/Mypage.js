import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProfileInit from '../components/mypage/ProfileInit';
import Profile from '../components/mypage/Profile';
import Workstatus from '../components/mypage/Workstatus';
import Alarm from '../components/mypage/Alarm';
import Calendar from '../components/mypage/Calendar 원본';
import StatusEditModal from '../components/mypage/StatusEditModal';
import BackgroundImgModal from '../components/mypage/BackgroundImgModal';
import ProfileImgModal from '../components/mypage/ProfileImgModal';
import { passwordChk, fetchMypageInfo, fetchProfileIntro } from '../apis/mypageApis';
import { resetProfileAuth, setBackgroundImage, setProfileImage } from '../slices/mypageSlice';
import styled from 'styled-components';
import '../css/profile.css';

const MypageContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
`;

const Mypage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { profileImage, backgroundImage, isProfileAuthenticated} = useSelector((state) => state.mypageSlice);
    const { profileIntro = "" } = useSelector((state) => state.mypageSlice);

    // 이스케이프된 문자열인지 확인하고 파싱
    const parsedProfileIntro = profileIntro.startsWith('"') && profileIntro.endsWith('"')
    ? JSON.parse(profileIntro)
    : profileIntro;

    const { name, id, email, tel, birth, authen} = useSelector(state => state.userSlice);
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Workstatus');
    
    const handleProfileAuthentication = async (password) => {
        await dispatch(passwordChk(password));
    };

    // 모달 열기 & 닫기
    const handleOpenStatusModal = () => {
        setStatusModalOpen(true);
    };

    const handleCloseStatusModal = () => {
        setStatusModalOpen(false);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleCloseBackgroundModal = () => {
        setIsBackgroundModalOpen(false);
    };

    const handleOpenBackgroundModal = () => {
        setIsBackgroundModalOpen(true);
    };

    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    // userEffect
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const section = queryParams.get('section');

        if (section && ['Alarm', 'Profile', 'Calendar'].includes(section)) {
            setActiveTab(section);
        }
    }, [location.search]);

    useEffect(() => {
        if (activeTab === 'Profile') {
            dispatch(resetProfileAuth());
        }
    }, [activeTab]);

    // useEffect(() => {
    //     dispatch(fetchMypageInfo());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProfileIntro());
    }, [dispatch]);

    const handleSaveBackground = (file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            dispatch(setBackgroundImage(imageUrl));
        }
        setIsBackgroundModalOpen(false);
    };

    const handleSetDefaultBackground = () => {
        dispatch(setBackgroundImage('/images/dataInk_background_default.jpg'));
        setIsBackgroundModalOpen(false);
    };
    
    const handleSaveProfile = (file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            dispatch(setProfileImage(imageUrl));
        }
        setIsProfileModalOpen(false);
    };

    const handleSetDefaultProfile = () => {
        dispatch(setProfileImage('/images/dataInk_profile_default.png'));
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

                        <div className="profile-info__intro">
                            <h2 className="profile-info__intro profile-info__intro--name">{name}</h2>
                            <p className="profile-info__intro profile-info__intro--role">{authen}</p>
                            <p className="profile-info__intro profile-info__intro--status">
                                {parsedProfileIntro}
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
                defaultImage="/images/dataInk_profile_default.png"
                onClose={handleCloseProfileModal}
                onSave={handleSaveProfile}
                onSetDefault={handleSetDefaultProfile}
            />
        </MypageContainer>
    );
};

export default Mypage;