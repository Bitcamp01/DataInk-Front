import React, { useEffect } from 'react'
import RenderProfileCard from '../components/profileCard/RenderProfileCard'
import Chart from '../components/Chart'
import RenderWorkInTodo from '../components/workInTodo/RendarWorkInTodo'
import OwnCalendar from '../components/calendar/OwnCalendar'
import '../css/dashBoard.css'
import RendarProjectCard from '../components/projectCard/RendarProjectCard'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const projectCount = useSelector((state) => state.userProjectsSlice.projectCount);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, {passive: false});

    return () => {
      window.removeEventListener('wheel', handleWheel);
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
