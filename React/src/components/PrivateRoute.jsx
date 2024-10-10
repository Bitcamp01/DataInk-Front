import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('ACCESS_TOKEN');

  if (!token) {
    alert("로그인 후 이용할 수 있는 서비스입니다.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
