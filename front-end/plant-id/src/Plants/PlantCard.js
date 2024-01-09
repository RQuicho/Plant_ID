import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PlantCard.css";

const PlantCard = ({plant}) => {
  return (
    <div className="plantCard-container">
      <h1 className="plantCard-title">{`${plant.plantDetails.commonName} (${plant.plantDetails.scientificName})`}</h1>
      <img src={plant.plantDetails.imageUrl} alt={`${plant.plantDetails.commonName}`} className="plantCard-img"/>
    </div>
  );
}

export default PlantCard;