import React, {useContext} from 'react';
import {Route, Navigate} from 'react-router-dom';
import UserContext from '../UserContext';

const ProtectedRoute = ({path, children}) => {
  const {currentUser} = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <Route path={path}>
      {children}
    </Route>
  );
}

export default ProtectedRoute;