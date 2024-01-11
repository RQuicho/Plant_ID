import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import {Form, FormGroup, Col, Label, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forms.css";

const SingupForm = ({signup}) => {
  const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }
  const [formData, setFormData] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(false);
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
    let result = await signup(formData);
    if (result.success) {
      setIsSubmitted(true);
      return <Navigate to="/upload" />;
    } else {
      console.error('Signup form error', result.errors);
      setErrorMsg(true);
    }
  }

  return (
    <div>
      {errorMsg ? <Navigate to="/signup/error"/> : <Navigate to="/signup"/>}
      {isSubmitted ? <Navigate to="/signup/success"/> : <Navigate to="/signup"/>}
      
      <h3 className="form-title">Signup</h3>
      <Form onSubmit={handleSubmit} className="form-container">
        <FormGroup row>
          <Label for="username" sm={2} className="form-label">Username</Label>
          <Col sm={10}>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={2} className="form-label">Password</Label>
          <Col sm={10}>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="firstName" sm={2} className="form-label">First Name</Label>
          <Col sm={10}>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="first name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lastName" sm={2} className="form-label">Last Name</Label>
          <Col sm={10}>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" sm={2} className="form-label">Email</Label>
          <Col sm={10}>
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </Col>
        </FormGroup>
        <br></br>
        <button className="form-btn">Submit</button>
      </Form>
      <button className="form-btn">
        <Link to='/' className="form-backBtn">Back</Link>
      </button>
    </div>
  );
}

export default SingupForm;