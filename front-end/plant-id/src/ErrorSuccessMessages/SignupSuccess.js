import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const SignupSuccess = () => {
  return (
    <>
      <div className="successMsg-div">
        <h1>Successfully signed up!</h1>
        <h1>Please login to use application.</h1>
      </div>
      <div className="form-btnContainer">
        <button className="form-btn">
          <Link to='/login' className="form-backBtn">Login</Link>
        </button>
      </div>
    </>

  );
}

export default SignupSuccess;