import React from 'react';
import './Signup'; // Using the same CSS for consistency

const WelcomePage = () => {
  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>You have successfully logged in.</p>
      <a href="/Login" className="link">Logout</a>
    </div>
  );
};

export default WelcomePage;
