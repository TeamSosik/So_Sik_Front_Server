import React, { useContext } from 'react';
import { HeaderContext } from '../header/Header';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {

  const {pathname} = useLocation();

  const data = {
    pathname: pathname
  }

  const access = window.sessionStorage.getItem("accesstoken");

  if(!access) {
    return <Navigate to="/login" state={{data: data}} />
  }

  return children;
};

export default RequireAuth;