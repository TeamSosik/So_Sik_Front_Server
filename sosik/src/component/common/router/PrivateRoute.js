import React from 'react';
import { Route,useHistory } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
    const history = useHistory();
  
    return (
      <Route
        {...rest}
        render={(props) => (
          loggedIn ? (
            <Component {...props} />
          ) : (
            (() => {
              alert('로그인이 필요합니다.');
              history.push('/login');
              return null;
            })()
          )
        )}
      />
    );
  };

export default PrivateRoute;