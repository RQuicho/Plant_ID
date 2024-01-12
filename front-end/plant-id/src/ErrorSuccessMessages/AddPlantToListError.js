import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const AddPlantToListError = (scientificName) => {
  return (
    <>
      <div className="errorMsg-div">
        <h1>Failed to add plant to list.</h1>
        <button className="errorMsg-btn">
          <Link to={`/plants/${scientificName}`}>Back</Link>
        </button>
      </div>
      <div className="form-btnContainer"></div>
    </>
  );
}

export default AddPlantToListError;