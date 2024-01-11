import React, {useState, useContext} from "react";
import {Link, Navigate} from "react-router-dom";
import UserContext from "../UserContext";
import {Form, FormGroup, Col, Label, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forms.css";

const LoginForm = ({login}) => {
  const {currentUser} = useContext(UserContext);
  const initialState = {
    username: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      return <Navigate to="/upload" />;
    } else {
      console.error('form error', result.errors);
      setErrorMsg(true);
    }
  }

  return (
    <div>
      {errorMsg ? <Navigate to="/login/error"/> : <Navigate to="/login"/>}
      {currentUser ? <Navigate to="/upload"/> : <Navigate to="/login"/>}

      <h3 className="form-title">Log In</h3>
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
        <br></br>
        <button className="form-btn">Submit</button>
      </Form>
      <button className="form-btn">
        <Link to='/' className="form-backBtn">Back</Link>
      </button>
    </div>
  )
}

export default LoginForm;

