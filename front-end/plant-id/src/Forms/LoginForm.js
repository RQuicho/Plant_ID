import React, {useState, useContext} from "react";
import {Navigate} from "react-router-dom";
import UserContext from "../UserContext";
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
    <div className="form-container">
      {errorMsg ? <Navigate to="/login/error"/> : <Navigate to="/login"/>}
      {currentUser ? <Navigate to="/upload"/> : <Navigate to="/login"/>}
      <h3 className="form-title">Log In</h3>
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
        <button className="form-btn">Submit</button>
      </form>
    </div>
  )
}

export default LoginForm;

