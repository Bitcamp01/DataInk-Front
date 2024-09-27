import React from 'react';
import '../css/profile-card.css'

const ProfileCard = ({ profile, announcements }) => {
  return (
    <div className="profileCard">
      <div className="profile">
        <h4>좋은 하루입니다!</h4>
        <img src={profile.profileImg} alt={`${profile.username} 프로필 이미지`} />
        <h2 className="username">
          {profile.username}
          <span style={{ fontSize: '1rem', color: '#2F2F2F' }}>  님</span>
        </h2>
      </div>
      <div className="statusInfo">
        <div className="roleInfo">
          <div className="Affiliation">
            <span style={{ color: '#929292', fontSize: '0.9rem' }}>소속</span>
            <h4>{profile.Affiliation}</h4>
          </div>
          <div className="role">
            <span style={{ color: '#929292', fontSize: '0.9rem' }}>역할</span>
            <h4>{profile.role}</h4>
          </div>
        </div>
        <div className="Announcement">
          <h5>
            공지사항
            <a className="Announcement-detail" href="/">
              더보기
            </a>
          </h5>
          {announcements.map((announcement, index) => (
              <div key={index} className="detail-info">
                <img
                  src={announcement.urgent ? '/icon/urgent-speaker_icon.png' : '/icon/speaker_icon.png'}
                  alt={announcement.urgent ? '긴급아이콘' : '일반아이콘'}
                />
                <span style={announcement.urgent ? { color: '#F67171' } : { color: '#7C97FE' }}>
                  [{announcement.department} 부서]
                </span>
                <a href="/" style={{ fontSize: '0.8rem' }}>
                  {announcement.notice}
                </a>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
