import React, {useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from "../UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forms.css";

const SingupForm = ({signup}) => {
  const {currentUser} = useContext(UserContext);
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
    console.log('result in front end SignupForm: ', result);
    if (result.success) {
      setIsSubmitted(true);
      return <Navigate to="/upload" />;
    } else {
      console.error('Signup form error', result.errors);
      setErrorMsg(true);
    }
  }

  return (
    <div className="form-container">
      {errorMsg ? <Navigate to="/signup/error"/> : <Navigate to="/signup"/>}
      {isSubmitted ? <Navigate to="/signup/success"/> : <Navigate to="/signup"/>}
      
      <h3 className="form-title">Signup</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        <br></br>
        <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        <br></br>
        <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="first name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
          />
        <br></br>
        <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-input"
          />
        <br></br>
        <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        <br></br>
        <button className="form-btn">Submit</button>
      </form>
    </div>
  );
}

export default SingupForm;