import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>The page you are looking for does not exist</h1>
      <button>
        <Link to='/'>Back</Link>
      </button>
    </div>
  );
}

export default NotFound;