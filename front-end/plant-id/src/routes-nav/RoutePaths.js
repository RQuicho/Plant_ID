import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import UserContext from '../UserContext';

import Homepage from '../Homepage';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import ProfileForm from '../Forms/ProfileForm';
import ProtectedRoute from './ProtectedRoute';

const RoutePaths = ({login, signup}) => {
  const {currentUser} = useContext(UserContext);
  
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<LoginForm login={login}/>} />
      <Route path='/signup' element={<SignupForm signup={signup}/>} />
      {/* <ProtectedRoute path='/profile' element={<ProfileForm />} /> */}
      {/* <ProtectedRoute path='/profile'>
        <Route index element={<ProfileForm />} />
      </ProtectedRoute> */}
      <Route path='/profile' element={currentUser ? <ProfileForm /> : <Navigate to='/login' />} />
    </Routes>
  );
}

export default RoutePaths;