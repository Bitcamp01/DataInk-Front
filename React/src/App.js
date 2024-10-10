import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import FindAccount from './pages/FindAccount';
import LabellingDetail from './pages/LabellingDetail';
import MainGrid from './pages/MainGrid';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const persiststore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiststore}>
        <Routes>
          {/* 기본 경로에서 로그인 페이지로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/label/main" element={<LabellingMain />} />
            <Route path="/label/work" element={<Labelling />} />
            <Route path="/label/detail" element={<LabellingDetail />} />
            <Route path="/member" element={<MemberManagement />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/review" element={<Review />} />
            <Route path="/notice_write" element={<Notice_write />} />
            <Route path="/notice_detail" element={<Notice_detail />} />
            <Route path="/main_grid" element={<MainGrid />} />
          </Route>

          {/* Public Routes */}
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findaccount" element={<FindAccount />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
