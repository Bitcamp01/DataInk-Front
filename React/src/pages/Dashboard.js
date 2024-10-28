import React, { useEffect, useState } from 'react'
import RenderProfileCard from '../components/profileCard/RenderProfileCard'
import Chart from '../components/Chart'
import RenderWorkInTodo from '../components/workInTodo/RendarWorkInTodo'
import OwnCalendar from '../components/calendar/OwnCalendar'
import '../css/dashBoard.css'
import RendarProjectCard from '../components/projectCard/RendarProjectCard'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  // const projectCount = useSelector((state) => state.userProjectsSlice.projectCount);
  const projectCount = useSelector((state) => {
    const projects = state.userProjectsSlice.projects || []; // 기본값을 빈 배열로 설정
    const currentDate = new Date(); // 현재 날짜
    return projects.filter(project => new Date(project.endDate) >= currentDate).length; // 종료일이 현재 날짜 이후인 프로젝트만 필터링
  });

  useEffect(() => {
    document.body.classList.add('dashboard');
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, {passive: false});

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.classList.remove('dashboard');
    };
  }, []);

  return (
    <section className='content'>
      <div className='overView'>
        <span id='overView-text'>Overview</span>
        <div className='total'>
          <RenderProfileCard />
          <div className='work'>
            <Chart />
          </div>
          <div className='workIn-todo'>
            <RenderWorkInTodo />
          </div>
          <div className='calendar'>
            <OwnCalendar />
          </div>
        </div>

        <div className='project'>
          <span className='project-header'>
            참여 중인 프로젝트&nbsp;<span className='project-count'>{projectCount}</span><span>건</span>
          </span>
          <div id='card-container'>
            <RendarProjectCard />
          </div>
        </div>
      </div>
    </section>

  );
}

export default Dashboard;
