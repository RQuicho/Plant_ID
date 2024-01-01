import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import UserContext from '../UserContext';

import Homepage from '../Homepage';
import UploadPage from '../UploadPage';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import ProfileForm from '../Forms/ProfileForm';
import ListsList from '../List/ListsList';
import NotFound from '../NotFoundErrors/NotFound';
import LoginError from '../NotFoundErrors/LoginError';

const RoutePaths = ({login, signup}) => {
  const {currentUser} = useContext(UserContext);
  
  return (
    <Routes>
      <Route path='/' 
             element={<Homepage />} 
      />
      <Route path='/upload' 
             element={<UploadPage />} 
      />
      <Route path='/login' 
             element={<LoginForm login={login}/>} 
      />
      <Route path='/signup' 
             element={<SignupForm signup={signup}/>} 
      />
      <Route path='/profile' 
             element={currentUser ? <ProfileForm /> : <Navigate to='/login' />} 
      />
      <Route path={currentUser ? `/${currentUser.username}/lists` : '/login'} 
             element={currentUser ? <ListsList /> : <Navigate to='/login' />} 
      />
      <Route path='/login/error' 
             element={<LoginError />} 
      />
      <Route path='*' 
             element={<NotFound />} 
      />
    </Routes>
  );
}

export default RoutePaths;