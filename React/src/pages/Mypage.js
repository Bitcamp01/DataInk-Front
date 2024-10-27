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
import { fetchProfileIntro, fetchUserDetails } from '../apis/mypageApis';
import { resetProfileAuth, setBackgroundImage, setProfileImage } from '../slices/mypageSlice';
import styled from 'styled-components';
import '../css/profile.css';

const MypageContainer = styled.div`
    font-family: 'Pretendard', 'NotoSansKR', sans-serif;
`;

const Mypage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { profileImage, backgroundImage, isProfileAuthenticated, profileIntro = "", userDetails} = useSelector((state) => state.mypageSlice);

    // 이스케이프된 문자열인지 확인하고 파싱
    const parsedProfileIntro = profileIntro.startsWith('"') && profileIntro.endsWith('"')
    ? JSON.parse(profileIntro)
    : profileIntro;

    const { name, authen} = useSelector(state => state.userSlice);
    const [isStatusModalOpen, setStatusModalOpen] = useState(false);
    const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Workstatus');
    

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
    }, [activeTab, dispatch]);

    useEffect(() => {
        dispatch(fetchProfileIntro());
        dispatch(fetchUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (activeTab === 'Profile') {
            dispatch(resetProfileAuth(false)); // 초기에는 인증을 false로 설정
        }
    }, [activeTab, dispatch]);

    const handleProfileAuthentication = () => {
        dispatch(resetProfileAuth(true));  // 인증 성공 시 true로 설정
    };


    // userDetails 데이터를 콘솔에 출력하여 확인
console.log("userDetails:", userDetails);

    // userDetails가 로드될 때만 profileImageUrl와 backgroundImageUrl을 설정
    const profileImageUrl = userDetails?.profileImageUrl 
        ? `https://kr.object.ncloudstorage.com/dataink/${userDetails.profileImageUrl}`
        : '/images/default-profile.png'; // 기본 프로필 이미지

    const backgroundImageUrl = userDetails?.backgroundImageUrl 
        ? `https://kr.object.ncloudstorage.com/dataink/${userDetails.backgroundImageUrl}`
        : '/images/default-background.jpg'; // 기본 배경 이미지


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

    // const renderComponent = () => {
    //     if (activeTab === 'Profile') {
    //         if (!isProfileAuthenticated) {
    //             return <ProfileInit onAuthenticate={(password) => { handleProfileAuthentication(password); }} />;
    //         }
    //         return <Profile userDetails={userDetails || {}} />;
    //     }
    //     if (activeTab === 'Workstatus') return <Workstatus />;
    //     if (activeTab === 'Alarm') return <Alarm />;
    //     if (activeTab === 'Calendar') return <Calendar />;
    // };
    const renderComponent = () => {
        if (activeTab === 'Profile') {
            return isProfileAuthenticated ? (
                <Profile userDetails={userDetails} />
            ) : (
                <ProfileInit onAuthenticated={() => dispatch(resetProfileAuth(true))} />
            );
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
                        backgroundImage: `url(${backgroundImageUrl})`,
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
                            src={profileImageUrl} 
                            alt="ProfileImage" 
                        />
                        <img 
                            className="profile-info__editicon" 
                            src="/icons/profile_image.svg"
                            alt="EditProfileIcon" 
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