import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Join from './pages/Join';
import Labelling from './pages/Labelling';
import Login from './pages/Login';
import MemberManagement from './pages/MemberManagement';
import Mypage from './pages/Mypage';
// import Review from './pages/Review';

function App() {
  return (
    <Routes>
      {/* Layout이 모든 페이지에 공통으로 적용될 구조 */}
      <Route element={<Layout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/join' element={<Join />} />
        <Route path='/label' element={<Labelling />} />
        <Route path='/login' element={<Login />} />
        <Route path='/member' element={<MemberManagement />} />
        <Route path='/mypage' element={<Mypage />} />
        {/* <Route path='/review' element={<Review />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
