import React, { useState } from 'react';

const MypageTab = ({ renderComponent }) => {
const [activeTab, setActiveTab] = useState('Profile');

return (
    <>
    <div className="tabs">
        <button className={`tab-links ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => setActiveTab('Profile')}>
        Profile
        </button>
        <button className={`tab-links ${activeTab === 'Workstatus' ? 'active' : ''}`} onClick={() => setActiveTab('Workstatus')}>
        Work status
        </button>
        <button className={`tab-links alarm ${activeTab === 'Alarm' ? 'active' : ''}`} onClick={() => setActiveTab('Alarm')}>
        Alarm
        </button>
    </div>

    <div>{renderComponent(activeTab)}</div>
    </>
);
};

export default MypageTab;
