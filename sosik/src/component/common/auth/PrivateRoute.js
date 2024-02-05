import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { HeaderContext } from '../header/Header';
import Login from '../../member/loginform/Login';

const PrivateRoute = ({path, element}) => {

  // 필드
  const {isAuthenticated} = useContext(HeaderContext);
  console.log(isAuthenticated);

  // 상태

  // 메서드

  // view

  return <Route path={path} element={isAuthenticated ? element : <Login />} />
  
};

export default PrivateRoute;