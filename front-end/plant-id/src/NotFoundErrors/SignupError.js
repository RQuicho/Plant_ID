import React from 'react';
import { Link } from 'react-router-dom';

const SignupError = () => {
  return (
    <div>
      <h1>Duplicate username. Please choose another.</h1>
      <button>
        <Link to='/signup'>Back</Link>
      </button>
    </div>
  );
}

export default SignupError;