import React, {useContext, useState} from 'react';
import { Navigate } from 'react-router-dom';
import PlantIdApi from '../api';
import UserContext from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forms.css";

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
    setFormData(data => ({
      ...data,
      password: ''
    }));
    setCurrentUser(updatedUser);
  }

  return (
    <div className="form-container">
      {isSubmitted ? <Navigate to="/profile/updated"/> : <Navigate to={`/${currentUser.username}/profile`}/>}
      <h3 className="form-title">{`${currentUser.username}'s Profile`}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firtName' className="form-label">First Name</label>
          <input 
            id='firstName'
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />
        <br></br>
        <label htmlFor='lastName' className="form-label">Last Name</label>
          <input 
            id='lastName'
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
          />
        <br></br>
        <label htmlFor='email' className="form-label">Email</label>
          <input 
            id='email'
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        <br></br>
        <label htmlFor='password' className="form-label">Password</label>
          <input 
            id='password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        <br></br>
        <button className="form-btn">Save</button>
      </form>
    </div>
  )
}

export default ProfileForm;