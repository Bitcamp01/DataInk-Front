import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Join from './pages/Join';
import Review from './pages/Review';
import Labelling from './pages/Labelling';
import LabellingMain from './pages/LabellingMain';
import Login from './pages/Login';
import MemberManagement from './pages/MemberManagement';
import Mypage from './pages/Mypage';
import Notice from './pages/Notice';
import Notice_write from './pages/Notice_write';
import Notice_detail from './pages/Notice_detail';
<<<<<<< HEAD
import Administrator_item_structure from './pages/Administrator_item_structure';
import Administrator_project_structure from './pages/Administrator_project_structure';
=======
import FindAccount from './pages/FindAccount';
>>>>>>> e3cad2e1839d343ac2361f0deea49b723287c953

function App() {
  return (
    <Routes>
      {/* Layout이 모든 페이지에 공통으로 적용될 구조 */}
      <Route element={<Layout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/label/main' element={<LabellingMain />} />
        <Route path='/label/work' element={<Labelling />} />
        <Route path='/member' element={<MemberManagement />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/notice' element={<Notice />} />
        <Route path='/review' element={<Review />} />
        <Route path="/notice_write" element={<Notice_write />} />
        <Route path="/notice_detail" element={<Notice_detail />} />
        <Route path="/administrator_item_structure" element={<Administrator_item_structure/>}/>
        <Route path="/administrator_project_structure" element={<Administrator_project_structure/>}/>
      </Route>
      <Route>
      <Route path='/join' element={<Join />} />
      <Route path='/login' element={<Login />} />
      <Route path='/findaccount' element={<FindAccount />} />
      </Route>
    </Routes>
  );
}

export default App;
