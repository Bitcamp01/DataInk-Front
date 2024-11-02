import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProgress, getUserProjects } from '../../apis/userProjectsApis';

// 날짜 변환 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

// 날짜 차이를 일 수로 계산하는 함수
const calculateDaysDifference = (endDateString) => {
  const currentDate = new Date();
  const endDate = new Date(endDateString);
  const timeDifference = endDate - currentDate;
  const daysDifference = Math.ceil((timeDifference / (1000 * 60 * 60 * 24)) - 1); // 밀리초를 일 수로 변환

  return daysDifference;
};

const RendarProjectCard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.userProjectsSlice.projects);
  console.log(projects);

    // 개별 프로젝트의 진행률을 관리하는 상태
    const [progressMap, setProgressMap] = useState({});

  // 컴포넌트가 마운트될 때 프로젝트 목록을 가져오기 위해 useEffect 사용
  useEffect(() => {
    dispatch(getUserProjects()); // JWT를 통해 사용자 정보가 자동으로 처리됨
  }, [dispatch]);

   // 프로젝트별 진행률 요청 후 상태 업데이트
   useEffect(() => {
    if (projects) {
      projects.forEach((project) => {
        dispatch(getProgress(project.projectId)).then((result) => {
          if (result.payload) {
            setProgressMap((prevProgressMap) => ({
              ...prevProgressMap,
              [project.projectId]: result.payload.progress
            }));
          }
        });
      });
    }
  }, [dispatch, projects]);

  // 프로젝트 목록을 정렬: 북마크된 것이 먼저, 날짜 차이 순서로 정렬 (가까운 날짜가 위로 오도록)
  const sortedProjects = projects
    ? [...projects].sort((a, b) => {
        // 1. 북마크된 프로젝트를 우선 정렬
        if (a.isBookmarked !== b.isBookmarked) {
          return a.isBookmarked ? -1 : 1;
        }
        // 2. 날짜 차이로 정렬 (가까운 날짜 순)
        return new Date(a.endDate) - new Date(b.endDate);
      })
    : [];

    // D-Day가 0일차인 것부터 카드 표출
  const filteredProjects = sortedProjects.filter((project) => {
    const daysDifference = calculateDaysDifference(project.endDate);
    return daysDifference >= 0; // 0일차부터 카드 표출
  });

  return (
    <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', // 카드가 4개를 초과하면 다음 줄로 넘어가도록 설정
        maxHeight: '400px', // 스크롤 영역의 최대 높이 설정
      }}>
      {filteredProjects.map((project) => {
        // 필요한 데이터만 추출하여 ProjectCard에 전달
        const projectData = {
          id: project.projectId,
          name: project.name,
          deadline: calculateDaysDifference(project.endDate), // 현재 날짜와 endDate 간의 일 수 차이 계산
          description: project.description,
          isBookmarked: project.isBookmarked, // 북마크 상태 전달
          // progress: progressMap[project.projectId] || 0, // progressMap에서 개별 진행률 가져오기
          progress: progressMap[project.projectId] !== undefined 
                    ? progressMap[project.projectId]
                    : 'Loading...', // 로딩 중일 때 'Loading...' 텍스트 설정,
          members: [
            { memberName: '홍길동'},
            { memberName: '홍길동'},
            { memberName: '홍길동'},
            { memberName: '홍길동'},
            { memberName: '홍길동'},
            { memberName: '홍길동'},
          ],
        };
        // progress 값 콘솔에 출력
        // console.log(`Project ID: ${project.projectId}, Progress: ${projectData.progress}`);
        
        return <ProjectCard 
        key={project.projectId} 
        projects={[{
            ...projectData, 
            progress: progressMap[project.projectId] === null ? 'Loading...' : (progressMap[project.projectId] || 0).toFixed(1) // 표시할 때 반올림
        }]} 
    />;
      })}
    </div>
  );
};

export default RendarProjectCard;