import React from 'react';
import '../../css/profile-card.css'

const ProfileCard = ({ profile, announcements }) => {
  if (!profile) {
    return <div className='bm-profileCard'>프로필 정보를 불러오는 중...</div>;
  }

  return (
    <div className="bm-profileCard">
      <div className="bm-profile">
        <span className='bm-prodile-title'>좋은 하루입니다!</span>
        <img 
          src={profile.profileImg !== null ? profile.profileImg : '/icons/dataink-logo_icon.svg'} 
          alt={`${profile.username} 프로필 이미지`} />
        <h3 className="bm-username">
          {profile.username}
          <span style={{ fontSize: '1rem', color: '#2F2F2F', fontWeight: 'normal'}}>  님</span>
        </h3>
      </div>
      <div className="bm-statusInfo">
        <div className="bm-roleInfo">
          <div className="bm-affiliation">
            <span style={{ color: '#929292', fontSize: '0.9rem' }}>소속</span>
            <span 
              className="bm-affiliation-detail"
              style={{ fontSize: profile.dep && profile.dep !== '배정되지 않음' ? '1rem' : '0.85rem' }}
            >
              {profile.dep ? profile.dep : "배정되지 않음"}
            </span>
          </div>
          <div className="bm-role">
            <span style={{ color: '#929292', fontSize: '0.9rem' }}>역할</span>
            <span 
              className='bm-role-detail'
              style={
                {fontSize: profile.authen !== 'ROLE_MANAGER' &&  profile.authen !== '배정되지 않음' ? '1rem' : '0.85rem'}
              }
            >
              {profile.authen ? profile.authen : "배정되지 않음"}
            </span>
          </div>
        </div>
        <div className="bm-announcement">
          <span className='bm-announcement-title'>
            &lt;공지사항&gt;
            <a className="bm-announcementDetail" href="../Notice">
              더보기
            </a>
          </span>
          {announcements.map((announcement, index) => (
              <div key={index} className="bm-detailInfo">
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