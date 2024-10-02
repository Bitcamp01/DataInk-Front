import React from 'react';
import ProfileCard from './ProfileCard';

const RenderProfileCard = () => {
  const profile = {
    username: '정소연',
    Affiliation: 'AI clovar',
    role: '라벨러',
    profileImg: '/images/profile_img.png',
  };
  
  const announcements = [
    {
      department: 'AI',
      notice: '사내 작업에 대한 규칙 어쩌고저쩌고',
      urgent: true, // 긴급 여부
    },
    {
      department: 'AI',
      notice: '일반 공지사항',
      urgent: false,
    },
    {
      department: 'AI',
      notice: '일반 공지사항',
      urgent: false,
    }
  ];
  
  return (
    <ProfileCard profile={profile} announcements={announcements} /> // ProfileCard 사용
  );
}

export default RenderProfileCard;