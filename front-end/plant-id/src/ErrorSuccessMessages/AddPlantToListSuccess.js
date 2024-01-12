import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const AddPlantToListSuccess = () => {
  return (
    <>
      <div className="successMsg-div">
        <h1>Successfully added plant to list!</h1>
        <h1>Use the navbar to navigate through the application.</h1>
      </div>
      <div className="form-btnContainer"></div>
    </>
  );
}

export default AddPlantToListSuccess;