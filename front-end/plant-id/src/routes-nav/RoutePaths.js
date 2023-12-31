import React from 'react';
import {Routes, Route} from 'react-router-dom';

import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';

const RoutePahts = ({login, signup}) => {
  return (
    <Routes>
      <Route path='/login' element={<LoginForm login={login}/>} />
      <Route path='/signup' element={<SignupForm signup={signup}/>} />
    </Routes>
  )
}

export default RoutePahts;