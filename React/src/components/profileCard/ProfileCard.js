import React from 'react';
import '../../css/profile-card.css'

const ProfileCard = ({ profile, announcements }) => {
  if (!profile) {
    return <div>프로필 정보를 불러오는 중...</div>;
  }

  return (
    <div className="profileCard">
      <div className="profile">
        <h4>좋은 하루입니다!</h4>
        <img 
          src={profile.profileImg ? profile.profileImg : '/icons/dataink-logo_icon.svg'} 
          alt={`${profile.username} 프로필 이미지`} />
        <h2 className="username">
          {profile.username}
          <span style={{ fontSize: '1rem', color: '#2F2F2F' }}>  님</span>
        </h2>
      </div>
      <div className="statusInfo">
        <div className="roleInfo">
          <div className="Affiliation">
            <span style={{ color: '#929292', fontSize: '0.9rem' }}>소속</span>
            <h5>{profile.dep ? profile.dep : "배정되지 않음"}</h5>
          </div>
          <div className="role">
            <span style={{ color: '#929292', fontSize: '0.9rem' }}>역할</span>
            <h5>{profile.authen ? profile.authen : "배정되지 않음"}</h5>
          </div>
        </div>
        <div className="Announcement">
          <h5>
            &lt;공지사항&gt;
            <a className="Announcement-detail" href="../Notice">
              더보기
            </a>
          </h5>
          {announcements.map((announcement, index) => (
              <div key={index} className="detail-info">
                <img
                  src={announcement.urgent ? '/icons/urgent-speaker_icon.svg' : '/icons/speaker_icon.svg'}
                  alt={announcement.urgent ? '긴급아이콘' : '일반아이콘'}
                />
                <span style={announcement.urgent ? { color: '#F67171' } : { color: '#7C97FE' }}>
                  [{announcement.title}]
                </span>
                <a href="/" style={{ fontSize: '0.8rem' }}>
                  {announcement.content}
                </a>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
