import React, {useContext, useState} from 'react';
import { Navigate } from 'react-router-dom';
import PlantIdApi from '../api';
import UserContext from '../UserContext';

const ProfileForm = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };
    let username = currentUser.username;
    if (formData.password.trim() !== '') {
      profileData.password = formData.password;
    }
    let updatedUser;
    try {
      updatedUser = await PlantIdApi.updateUserProfile(username, profileData);
      console.log('updatedUser in front end for ProfileForm: ', updatedUser);
      if (updatedUser) {
        setIsSubmitted(true);
      } else {
        console.log('No updated user');
      }
    } catch (err) {
      console.error('Error updating profile', err);
      return;
    }
    setIsSubmitted(true);
    console.log('isSubmitted in front end for ProfileForm: ', isSubmitted);

    setFormData(data => ({
      ...data,
      password: ''
    }));
    setCurrentUser(updatedUser);
  }

  return (
    <div>
      {isSubmitted ? <Navigate to="/profile/updated"/> : <Navigate to={`/${currentUser.username}/profile`}/>}
      <h3>{`${currentUser.username}'s Profile`}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firtName'>First Name</label>
          <input 
            id='firstName'
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        <label htmlFor='lastName'>Last Name</label>
          <input 
            id='lastName'
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        <label htmlFor='email'>Email</label>
          <input 
            id='email'
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        <label htmlFor='password'>Password</label>
          <input 
            id='password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        <button>Save</button>
      </form>
    </div>
  )
}

export default ProfileForm;