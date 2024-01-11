import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <h3 className="homepage-text"><FontAwesomeIcon icon={faUserPlus} /> Signup or Login to start!</h3>
      <button className="homepage-btn">
        <Link to='/signup' className="homepage-signupBtn">Signup</Link>
      </button>
      <button className="homepage-btn">
        <Link to='/login' className="homepage-loginBtn">Login</Link>
      </button>
      <br></br>
      <img src="https://static.vecteezy.com/system/resources/previews/000/595/596/original/ecology-logo-illustration-vectors.jpg" alt="green leaves falling" className="homepage-img"/>

    </div>
  )
}

export default Homepage;