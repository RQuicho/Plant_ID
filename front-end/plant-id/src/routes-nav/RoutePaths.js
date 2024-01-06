import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import UserContext from '../UserContext';

import Homepage from '../Homepage';
import UploadPage from '../UploadPage';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import ProfileForm from '../Forms/ProfileForm';
import NotFound from '../ErrorSuccessMessages/NotFound';
import LoginError from '../ErrorSuccessMessages/LoginError';
import SignupError from '../ErrorSuccessMessages/SignupError';
import SignupSuccess from '../ErrorSuccessMessages/SignupSuccess';
import ProfileUpdated from '../ErrorSuccessMessages/ProfileUpdated';
import PlantDetails from '../Plants/PlantDetails';
import ListsList from '../List/ListsList';
import ListDetails from '../List/ListDetails';
import ListForm from '../Forms/ListForm';
import ListsError from '../ErrorSuccessMessages/ListsError';
import AddPlantToListSuccess from '../ErrorSuccessMessages/AddPlantToListSuccess';
import AddPlantToListError from '../ErrorSuccessMessages/AddPlantToListError';

const RoutePaths = ({login, signup}) => {
  const {currentUser} = useContext(UserContext);
  // console.log('currentUser in front end RoutePaths: ', currentUser);
  
  return (
    <Routes>
      <Route path='/' 
             element={<Homepage />} 
      />
      {/* Users */}
      <Route path='/login' 
             element={<LoginForm login={login}/>} 
      />
      <Route path='/signup' 
             element={<SignupForm signup={signup}/>} 
      />
      <Route path='/signup/success' 
             element={<SignupSuccess />} 
      />
      <Route path={currentUser ? `/${currentUser.username}/profile` : '/login'}
             element={currentUser ? <ProfileForm /> : <LoginForm login={login}/>} 
      />
      <Route path='/profile/updated' 
             element={<ProfileUpdated />} 
      />
      <Route path={currentUser ? `/${currentUser.username}/lists` : '/login'} 
             element={currentUser ? <ListsList /> : <LoginForm login={login}/>} 
      />
      <Route path='/login/error' 
             element={<LoginError />} 
      />
      <Route path='/signup/error' 
             element={<SignupError />} 
      />

      {/* Plants */}
      <Route path={currentUser ? '/upload' : '/login'} 
             element={currentUser ? <UploadPage /> : <LoginForm login={login} />} 
      />
      <Route path={currentUser ? '/plants/:scientificName' : '/login'} 
             element={currentUser ? <PlantDetails /> : <LoginForm login={login} />} 
      />
      <Route path={currentUser ? '/plants/:scientificName/success' : '/login'} 
             element={currentUser ? <AddPlantToListSuccess /> : <LoginForm login={login} />} 
      />
      <Route path={currentUser ? '/plants/:scientificName/error' : '/login'} 
             element={currentUser ? <AddPlantToListError /> : <LoginForm login={login} />} 
      />

      {/* Lists */}
      <Route path={currentUser ? '/lists/new' : '/login'} 
             element={currentUser ? <ListForm /> : <LoginForm login={login} />} 
      />
      <Route path={currentUser ? '/lists' : '/login'} 
             element={currentUser ? <ListsList /> : <LoginForm login={login} />} 
      />
      <Route path={currentUser ? '/lists/:name' : '/login'} 
             element={currentUser ? <ListDetails /> : <LoginForm login={login} />} 
      />
      <Route path='/lists/error' 
             element={<ListsError />} 
      />
      <Route path='*' 
             element={<NotFound />} 
      />
    </Routes>
  );
}

export default RoutePaths;