import React from 'react';
import { Link } from 'react-router-dom';

const AddPlantToListError = (scientificName) => {
  return (
    <div>
      <h1>Failed to add plant to list.</h1>
      <button>
        <Link to={`/plants/${scientificName}`}>Back</Link>
      </button>
    </div>
  );
}

export default AddPlantToListError;