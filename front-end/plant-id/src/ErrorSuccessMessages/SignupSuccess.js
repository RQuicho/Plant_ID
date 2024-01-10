import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const SignupSuccess = () => {
  return (
    <div className="successMsg-div">
      <h1>Successfully signed up!</h1>
      <h1>Use the navbar to navigate through the application.</h1>
    </div>
  );
}

export default SignupSuccess;