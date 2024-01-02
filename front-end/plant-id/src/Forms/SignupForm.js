import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

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
    console.log('result in front end SignupForm: ', result);
    if (result.success) {
      setIsSubmitted(true);
      return <Navigate to='/signup/success' />;
    } else {
      console.error('form error', result.errors);
      setErrorMsg(true);
    }
  }

  return (
    <div>
      {errorMsg ? <Navigate to="/signup/error"/> : <Navigate to="/signup"/>}
      {isSubmitted ? <Navigate to="/upload"/> : <Navigate to="/signup"/>}
      
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SingupForm;