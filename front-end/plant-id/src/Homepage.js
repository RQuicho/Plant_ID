import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div style={{backgroundImage: "url('https://eskipaper.com/images/leaves-background-2.jpg')"}}>
      <Card style={{width: "30rem"}} className="homepage-cardContainer">
        <CardBody>
          <CardTitle tag="h3" className="homepage-title">
            Welcome to PlantID!
          </CardTitle>
        </CardBody>
        <img
          alt="Card cap"
          src="https://image.freepik.com/free-photo/composition-with-camera-plant_23-2147982596.jpg"
          width="100%"
        />
        <CardBody>
          <CardText tag="h5" className="homepage-text">
            <FontAwesomeIcon icon={faUserPlus} /> Signup or Login to start!
          </CardText>
          <button className="homepage-btn">
            <Link to='/signup' className="homepage-signupBtn">Signup</Link>
          </button>
          <button className="homepage-btn">
            <Link to='/login' className="homepage-loginBtn">Login</Link>
          </button>
        </CardBody>
      </Card>
    </div>
  );
}

export default Homepage;