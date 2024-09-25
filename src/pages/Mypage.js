import React, { useState } from 'react';
import Profile from '../components/Profile';
import Workstatus from '../components/Workstatus';
import Alarm from '../components/Alarm';
import '../css/profile.css';

const Mypage = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const renderComponent = () => {
    if (activeTab === 'Profile') return <Profile />;
    if (activeTab === 'Workstatus') return <Workstatus />;
    if (activeTab === 'Alarm') return <Alarm />;
  };


  return (
        <section className="content">
                <div className="profile-header">
                    <div className="profile-cover"></div>
                    <div className="profile-info">
                        <img className="profile-info__image" src="/images/절미얼굴.jpg" alt="Profile Image" />
                        <div className="profile-info__intro">
                            <h2 className="profile-info__intro profile-info__intro--name">Soyeon Jung</h2>
                            <p className="profile-info__intro profile-info__intro--role">Labeler</p>
                            <p className="profile-info__intro profile-info__intro--status">언제든지 편하게 연락해주세요 :)</p>
                        </div>
                        <div className="profile-buttons">
                            <button className="follow-btn">Follow</button>
                            <button className="meeting-btn">Schedule a meeting</button>
                        </div>
                    </div>
                </div>




          <div className="tabs">
            <button class="tab-links active" onClick={() => setActiveTab('Profile')}>Profile</button>
            <button class="tab-links workstatus" onClick={() => setActiveTab('Workstatus')}>Work status</button>
            <button class="tab-links alarm" onClick={() => setActiveTab('Alarm')}>Alarm</button>
          </div>

          <div>
            {renderComponent()}
          </div>
        </section>
  );
};

export default Mypage;
