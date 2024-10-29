import React from 'react';
import styled from 'styled-components';
import RendarProjectCard from '../components/projectCard/RendarProjectCard'
import CommonButton from '../components/CommonButton';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';

const ProjectContainer = styled.div`
    margin-left: 3.3rem;
    margin-top: 3.3rem;
`;

const ParentContainer = styled.div`
  & > RendarProjectCard {
    flex-wrap: unset !important;
    max-height: none !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝에 정렬 */
  width: 100%; /* 원하는 너비 설정 */
  margin-bottom: 1.2rem;
`;

const NewProjectButton = styled(CommonButton)`
  position: relative;
  right: 5.5rem; /* 30px 만큼 왼쪽으로 이동 */
`;

const Labelling = () => {
    const navi=useNavigate();
    const authen = useSelector((state) => state.userSlice.authen); // authen 값을 가져옴
    const projectCount = useSelector((state) => {
      const projects = state.userProjectsSlice.projects || []; // 기본값을 빈 배열로 설정
      const currentDate = new Date(); // 현재 날짜
      return projects.filter(project => new Date(project.endDate) >= currentDate).length; // 종료일이 현재 날짜 이후인 프로젝트만 필터링
    });

    const handleNewProject = () => {
        navi('/main_grid');
    };
  return (
    <ProjectContainer>
        <h2 className='project-header'>
          참여 중인 프로젝트&nbsp;<span className='project-count'>{projectCount}</span><span>건</span>
        </h2>
        {authen === 'ROLE_ADMIN' && ( // authen이 ROLE_ADMIN일 때만 렌더링
                <ButtonContainer>
                    <NewProjectButton onClick={handleNewProject}>프로젝트 추가</NewProjectButton>
                </ButtonContainer>
            )}
        <ParentContainer>
            <RendarProjectCard />
        </ParentContainer>
    </ProjectContainer>
  );
};

export default Labelling;
