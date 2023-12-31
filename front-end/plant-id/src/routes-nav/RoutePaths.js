import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Homepage from '../Homepage';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import ProfileForm from '../Forms/ProfileForm';
import ProtectedRoute from './ProtectedRoute';

const RoutePahts = ({login, signup}) => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<LoginForm login={login}/>} />
      <Route path='/signup' element={<SignupForm signup={signup}/>} />
      <ProtectedRoute path='/profile' element={<ProfileForm />} />
    </Routes>
  )
}

export default RoutePahts;