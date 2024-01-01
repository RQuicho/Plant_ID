import React, {useState, useContext} from "react";
import {Navigate, redirect} from "react-router-dom";
import UserContext from "../UserContext";


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
    console.log('result in front end LoginForm: ', result);
    // console.log('result.success in front end LoginForm: ', result.success);
    if (result.success) {
      return <Navigate to="/upload" />;
      // return redirect("/upload");
      // return result.success
    } else {
      console.error('form error', result.errors);
      setErrorMsg(true);
    }
  }

  return (
    <div>
      {errorMsg ? <Navigate to="/login/error"/> : <Navigate to="/login"/>}
      {currentUser ? <Navigate to="/upload"/> : <Navigate to="/login"/>}
      <h3>Log In</h3>
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
        <button>Submit</button>
      </form>
    </div>
  )
}

export default LoginForm;

