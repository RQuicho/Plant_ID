import React, {useState} from "react";
import {Navigate} from "react-router-dom";

const LoginForm = () => {
  const initialState = {
    username: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialState);

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
      // <Navigate to={`/users/${formData.username}`} />
      <Navigate to={`/plants/upload`} />
    } else {
      console.error('form error', result.errors);
      return (<p>{`Error: ${result.errors}`}</p>)
    }
  }

  return (
    <div>
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

