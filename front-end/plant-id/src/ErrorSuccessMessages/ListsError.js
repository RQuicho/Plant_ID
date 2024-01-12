import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ErrorSuccessMsg.css";

const ListsError = () => {
  return (
    <>
      <div className="errorMsg-div">
        <h1>Duplicate list name. Please choose another.</h1>
        <button className="errorMsg-btn">
          <Link to='/lists/new'>Back</Link>
        </button>
      </div>
      <div className="form-btnContainer"></div>
    </>
  );
}

export default ListsError;