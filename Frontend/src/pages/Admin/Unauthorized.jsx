import React from 'react'
import { Link } from 'react-router-dom';

const Unauthorized = () => (
    <div className="p-6 text-center text-red-500">
      <h2 className="text-2xl font-bold">403 - Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
      <p className="mt-4">
        Please contact your administrator if you believe this is an error.
      </p>
      <div>
        <p className="mt-4">You can also:</p>
        <p>Visit the Home</p>
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      </div>
    </div>
  );  
export default Unauthorized;
