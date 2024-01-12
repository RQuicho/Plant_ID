import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const NotFound = () => {
  return (
    <>
      <div className="errorMsg-div">
        <h1>The page you are looking for does not exist</h1>
        <button className="errorMsg-btn">
          <Link to='/'>Back</Link>
        </button>
      </div>
      <div className="form-btnContainer"></div>
    </>
  );
}

export default NotFound;