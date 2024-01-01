import React from 'react';

const PlantCard = ({plant}) => {
  return (
    <div>
      <p>{`${plant.commonName}(${plant.scientificName})`}</p>
      <img src={plant.imageUrl} alt={`${plant.commonName}`} />
    </div>
  );
}

export default PlantCard;