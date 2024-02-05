import React, { useContext } from 'react';
import { HeaderContext } from '../header/Header';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {

  const {isAuthenticated} = useContext(HeaderContext);
  const {pathname} = useLocation();

  const data = {
    pathname: pathname
  }

  if(!isAuthenticated) {
    return <Navigate to="/login" state={{data: data}} />
  }

  return children;
};

export default RequireAuth;