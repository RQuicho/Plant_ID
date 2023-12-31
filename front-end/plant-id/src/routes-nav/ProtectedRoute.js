import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import UserContext from '../UserContext';

const ProtectedRoute = ({path, children}) => {
  const {currentUser} = useContext(UserContext);

  if (!currentUser) {
    return <Redirect to='/login' />
  }

  return (
    <Route path={path}>
      {children}
    </Route>
  );
}

export default ProtectedRoute;