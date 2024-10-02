import React from 'react';
import styled from 'styled-components';
import RendarProjectCard from '../components/projectCard/RendarProjectCard'
import CommonButton from '../components/CommonButton';

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
  return (
    <ProjectContainer>
        <h2 className='project-header'>
            참여 중인 프로젝트 <span className='project-count'>10</span><span>건</span>
        </h2>
        <ButtonContainer>
            <NewProjectButton>프로젝트 추가</NewProjectButton>
        </ButtonContainer>
        <ParentContainer>
            <RendarProjectCard />
        </ParentContainer>
    </ProjectContainer>
  );
};

export default Labelling;
