import React from 'react';

const PlantCard = ({plant}) => {
  return (
    <div>
      <p>{`${plant.plantDetails.commonName}(${plant.plantDetails.scientificName})`}</p>
      <img src={plant.plantDetails.imageUrl} alt={`${plant.plantDetails.commonName}`} />
    </div>
  );
}

export default PlantCard;