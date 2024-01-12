import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faCopyright} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <div>
      <section className="footer-container">
        <div>
          <h5>
            <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} Raymond Quicho
            <a href="https://www.linkedin.com/in/raymond-quicho/" target="_blank" className="footer-text">
              <FontAwesomeIcon icon={faLinkedin} />  LinkedIn
            </a>
            <a href="https://github.com/RQuicho" target="_blank" className="footer-text">
              <FontAwesomeIcon icon={faGithub} />  GitHub
            </a>
            <a href="mailto:raymondquicho@gmail.com" target="_blank" className="footer-text">
              <FontAwesomeIcon icon={faEnvelope} />  Email
            </a>
          </h5>
        </div>
      </section>
    </div>
  );
}

export default Footer;