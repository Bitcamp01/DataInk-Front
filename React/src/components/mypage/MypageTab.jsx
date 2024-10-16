import React, { useState } from 'react';

const MypageTab = ({ renderComponent }) => {
const [activeTab, setActiveTab] = useState('Workstatus');

return (
    <>

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
            onClick={() => setActiveTab('Profile')}
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

    <div>{renderComponent(activeTab)}</div>
    </>
);
};

export default MypageTab;
