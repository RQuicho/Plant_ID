import React from 'react';
import { Link } from 'react-router-dom';

const ListsError = () => {
  return (
    <div>
      <h1>Duplicate list name. Please choose another.</h1>
      <button>
        <Link to='/lists/new'>Back</Link>
      </button>
    </div>
  );
}

export default ListsError;