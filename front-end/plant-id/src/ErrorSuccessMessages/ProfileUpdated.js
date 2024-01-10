import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const ProfileUpdated = () => {
  return (
    <div className="successMsg-div">
      <h1>Profile successfully updated!</h1>
      <h1>Use the navbar to navigate through the application.</h1>
    </div>
  );
}

export default ProfileUpdated;