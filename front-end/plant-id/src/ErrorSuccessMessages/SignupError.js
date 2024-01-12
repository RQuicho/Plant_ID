import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const SignupError = () => {
  return (
    <>
      <div className="errorMsg-div">
        <h1>Duplicate username. Please choose another.</h1>
        <button className="errorMsg-btn">
          <Link to='/signup'>Back</Link>
        </button>
      </div>
      <div className="form-btnContainer"></div>
    </>
  );
}

export default SignupError;