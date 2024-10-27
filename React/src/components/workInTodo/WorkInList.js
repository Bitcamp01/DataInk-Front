import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WorkItem from './WorkItem';
import axios from 'axios';
import moment from 'moment';

const WorkInListBlock = styled.div`
  padding-left: 20px;
  padding-bottom: 20px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #E7E7E7;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const WorkInList = () => {
  // 환경 변수에서 API URL 가져오기
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [workItems, setWorkItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchWorkItems = async () => {
      const token = sessionStorage.getItem('ACCESS_TOKEN'); // localStorage에서 토큰 가져오기
      // console.log(token);
      try {
        const response = await axios.get(`${API_BASE_URL}/workIn/work-items`, {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰 추가
          },
        });
        const items = response.data;

        const sortedItems = items.map(item => {

          const endDate = moment(item.projectDto.endDate);
          const today = moment().startOf('day');
          const diffDays = endDate.diff(today, 'days');

          return { 
            id: item.userId,  // userId를 id로 사용
            name: item.projectDto.name,     // 프로젝트 이름
            endDate: item.projectDto.endDate, // 종료일
            diffDays // 남은 날짜를 항목에 추가
          };
        })
        .filter(item => item.diffDays >= 0) // 오늘 이후나 오늘이 마감일인 항목만 필터링
        .sort((a, b) => a.diffDays - b.diffDays); // 남은 날짜 기준으로 오름차순 정렬
        console.log('Before sorting:', sortedItems);
        sortedItems.sort((a, b) => a.diffDays - b.diffDays);
        console.log('After sorting:', sortedItems);
        setWorkItems(sortedItems);
      } catch (error) {
        console.error('Error fetching work items: ', error);
        setError('Work items could not be fetched.'); // 에러 메시지 설정
        if (error.response) {
          console.log('Error response data:', error.response.data);
          console.log('Error status:', error.response.status);
        } else {
          console.log('Error message:', error.message);
        }
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchWorkItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 메시지 표시
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 메시지 표시
  }

  return (
    <WorkInListBlock>
      {workItems.map(item => (
        <WorkItem key={item.id} text={item.name} deadline={item.endDate} />
      ))}
    </WorkInListBlock>
  );
};

export default WorkInList;
