import React from 'react';

const TabMenu = ({ activeTab, handleTabClick }) => (
  <div className="tab-menu">
    <button className={activeTab === 'findId' ? 'tab active' : 'tab'} onClick={() => handleTabClick('findId')}>
      아이디 찾기
    </button>
    <button className={activeTab === 'findPw' ? 'tab active' : 'tab'} onClick={() => handleTabClick('findPw')}>
      비밀번호 찾기
    </button>
  </div>
);

export default TabMenu;