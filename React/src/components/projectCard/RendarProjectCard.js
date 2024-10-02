import React from 'react';
import ProjectCard from './ProjectCard';

const RendarProjectCard = () => {
  const projects = [
    {
      name: '프로젝트 이름',
      deadline: 2,
      description: '프로젝트 설명입니다.프로젝트 설명입니다.프로젝트 설명입니다.프로젝트 설명입니다.프로젝트 설명입니다.',
      progress: 95,
      members: [
        {class:'manager', role: '관리자', profileImg: '/images/manager-profile_img.png'},
        {class:'reviewer', role: '검수자', profileImg: '/images/reviewer-profile_img.png'},
        {class:'labeler', role: '멤버', profileImg: '/images/labeler-profile-00_img.png'},
        {class:'labeler', role: '', profileImg: '/images/labeler-profile-01_img.png'},
        {class:'labeler', role: '', profileImg: '/images/labeler-profile-02_img.png'},
        {class:'labeler', role: '', profileImg: '/images/labeler-profile-03_img.png'}
      ],
    },
  ];

  const projects1 = [
    {
      name: '프로젝트 이름',
      deadline: 23,
      description: '프로젝트 설명입니다.프로젝트 설명입니다.프로젝트 설명입니다.프로젝트 설명입니다.프로젝트 설명입니다.',
      progress: 95,
      members: [
        {class:'manager', role: '관리자', profileImg: '/images/manager-profile_img.png'},
        {class:'reviewer', role: '검수자', profileImg: '/images/reviewer-profile_img.png'},
        {class:'labeler', role: '멤버', profileImg: '/images/labeler-profile-00_img.png'},
        {class:'labeler', role: '', profileImg: '/images/labeler-profile-01_img.png'},
        {class:'labeler', role: '', profileImg: '/images/labeler-profile-02_img.png'},
        {class:'labeler', role: '', profileImg: '/images/labeler-profile-03_img.png'}
      ],
    },
  ];

  return (
    <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', // 카드가 4개를 초과하면 다음 줄로 넘어가도록 설정
        maxHeight: '400px', // 스크롤 영역의 최대 높이 설정
      }}>
      <ProjectCard projects={projects}/> <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
      <ProjectCard projects={projects1}/>
    </div>
  );
}

export default RendarProjectCard;
