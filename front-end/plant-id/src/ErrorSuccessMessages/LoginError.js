import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const LoginError = () => {
  return (
    <div className="errorMsg-div">
      <h1>Invalid username/password</h1>
      <button className="errorMsg-btn">
        <Link to='/login'>Back</Link>
      </button>
    </div>
  );
}

export default LoginError;