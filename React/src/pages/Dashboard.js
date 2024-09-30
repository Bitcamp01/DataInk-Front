import React from 'react'
import ProfileCard from '../components/profileCard/ProfileCard'
import RenderProfileCard from '../components/profileCard/RenderProfileCard'
import Chart from '../components/Chart'
import RenderWorkInTodo from '../components/workInTodo/RendarWorkInTodo'
import OwnCalendar from '../components/calendar/OwnCalendar'
import '../css/dashBoard.css'
import RendarProjectCard from '../components/projectCard/RendarProjectCard'

const Dashboard = () => {
  return (
    <section className='content'>
      <div className='overView'>
        <h2 id='overView-text'>Overview</h2>
        <div className='total'>
          <RenderProfileCard/>
          <div className='work'>
            <Chart/>
          </div>
          <div className='workIn-todo'>
            <RenderWorkInTodo/>
          </div>
          <div className='calendar'>
            <OwnCalendar/>
          </div>
        </div>

        <div className='project'>
          <h2 className='project-header'>
            참여 중인 프로젝트 <span className='project-count'>10</span><span>건</span>
          </h2>
          <div id='card-container'>
            <RendarProjectCard/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard;