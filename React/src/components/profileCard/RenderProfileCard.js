import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import axios from 'axios';

const RenderProfileCard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchedProfile = async () => {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      try {
        const response = await axios.get('http://localhost:9090/profile/profiles', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const profile = {
          id: response.data.userId,
          username: response.data.username,
          authen: response.data.authen,
          dep: response.data.dep,
          profileImg: response.data.profileImg
        };
        // console.log(profile);
        setProfile(profile);
      } catch (error) {
        console.error("프로필 정보를 가져오는데 실패했습니다: ", error);
      }
    };

    fetchedProfile();
  }, []);

  const [announcements, setAnnouncements] = useState([]); // useState를 컴포넌트 최상단에 이동

  useEffect(() => {
    const fetchedNotice = async () => {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      try {
        const response = await axios.get('http://localhost:9090/profile/notices', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        let items = response.data;
        
        // 공지사항을 날짜순으로 내림차순 정렬하고 상위 3개만 추출
        items = items.sort((a, b) => new Date(b.created) - new Date(a.created)); // created 기준 내림차순 정렬
        const latestNotices = items.slice(0, 3); // 최신 3개의 공지 추출

        const notice = latestNotices.map(item => ({
          id: item.notice_id,
          title: item.title,
          content: item.content,
        }));

        setAnnouncements(notice);
      } catch (error) {
        console.error('공지사항을 가져오는 데 오류가 발생했습니다: ', error);
      }
    };

    fetchedNotice(); // useEffect 내에서 한 번만 호출
  }, []); // 빈 배열로 의존성 지정

  return (
    <ProfileCard profile={profile} announcements={announcements} /> // ProfileCard 사용
  );
}

export default RenderProfileCard;
