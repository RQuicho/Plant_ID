import React, {useEffect, useState} from "react";
import PlantIdApi from "./api";
import NotFound from "./ErrorSuccessMessages/NotFound";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UploadPage.css";

const UploadPage = () => {
  const [scientificName, setScientificName] = useState('');
  const [commonName, setCommonName] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const fileInput = e.target.querySelector('input[name="plantImg"]');
      const file = fileInput.files[0];
      console.log('fileInput in front end UploadPage', fileInput);
      console.log('file in front end UploadPage', file);

      if (!file) {
        console.error('Please select an image before submitting');
        return;
      }

      const result = await PlantIdApi.postPlantPhoto(file);
      console.log('result in front end UploadPage handleSubmit: ', result);

      if (result) {
        setImageUploaded(true);
        setScientificName(result.plantData.scientific_name);
        setCommonName(result.plantData.common_name);
        return <Navigate to="/plant/details"/>
      } else {
        console.error('Error uploading image from UploadPage component');
      }
    } catch (err) {
      console.error('Error uploading image from UploadPage component: ', err);
    } finally {
      setIsLoading(false);
    }
  }
  
  const pageIfNotUploaded = () => {
    return (
      <div className="uploadPage-container">
        <h1 className="uploadPage-title">Upload Photo</h1>
        <form onSubmit={handleSubmit} action="http://localhost:3001/plants/upload" encType="multipart/form-data">
          <input type="file" name="plantImg" className="uploadPage-input"/>
          <input type="submit" className="uploadPage-btn"/>
        </form>
      </div>
    );
  }

  const pageIfUploaded = () => {
    return (
      <div className="uploadPage-container">
        <h1 className="uploadPage-title">Your image is: {`${commonName}(${scientificName})`}</h1>
        <button className="uploadPage-btn">
          <Link to={`/plants/${scientificName}`} className="uploadPage-link">Plant Details</Link>
        </button>
      </div>
    );
  }

  if (isLoading) {
    // return <p>Loading &hellip;</p>
    return <h1 className="uploadPage-loading">Loading   <FontAwesomeIcon icon={faSpinner} className="loading-spinner"/></h1>
  }

  return (
    <div>
      {imageUploaded ? pageIfUploaded() : pageIfNotUploaded()}
    </div>
  );

}

export default UploadPage;