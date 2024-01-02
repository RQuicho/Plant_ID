import React from 'react';
import { Link } from 'react-router-dom';

const LoginError = () => {
  return (
    <div>
      <h1>Invalid username/password</h1>
      <button>
        <Link to='/login'>Back</Link>
      </button>
    </div>
  );
}

export default LoginError;