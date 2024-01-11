import React, {useContext, useState} from 'react';
import { Navigate } from 'react-router-dom';
import PlantIdApi from '../api';
import UserContext from '../UserContext';
import {Form, FormGroup, Col, Label, Input} from 'reactstrap';
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
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for='firtName' sm={2} className="form-label">First Name</Label>
          <Col sm={10}>
            <Input 
              id='firstName'
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='lastName' sm={2} className="form-label">Last Name</Label>
          <Col sm={10}>
            <Input 
              id='lastName'
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='email' sm={2} className="form-label">Email</Label>
          <Col sm={10}>
            <Input 
              id='email'
              type='text'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='password' sm={2} className="form-label">Password</Label>
          <Col sm={10}>
            <Input 
              id='password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              />
          </Col>
        </FormGroup>
        <br></br>
        <button className="form-btn">Save</button>
      </Form>
    </div>
  )
}

export default ProfileForm;