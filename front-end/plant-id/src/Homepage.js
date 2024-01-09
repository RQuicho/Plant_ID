import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Homepage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to PlantID <FontAwesomeIcon icon={faLeaf} /></h1>
      <br></br>
      <h3 className="homepage-text"><FontAwesomeIcon icon={faUpload} /> Upload an image to identify your plant</h3>
      <h3 className="homepage-text"><FontAwesomeIcon icon={faRectangleList} /> Create lists to keep track of plants you identified</h3>
      <h3 className="homepage-text"><FontAwesomeIcon icon={faUserPlus} /> Signup or Login to start!</h3>
      <br></br>
      <img src="https://static.vecteezy.com/system/resources/previews/000/595/596/original/ecology-logo-illustration-vectors.jpg" width={400} height={400} alt="green leaves falling"/>

    </div>
  )
}

export default Homepage;