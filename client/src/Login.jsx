


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import './Signup.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      // Make POST request to the backend
      const response = await axios.post('http://localhost:3001/Login', {
        email,
        password,
      });

      // Handle successful login
      if (response.status === 200) {
        setError('');
        navigate('/welcome'); // Redirect to the welcome page
      }
    } catch (err) {
      // Handle errors from the backend
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      <form onSubmit={validateForm}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={error ? 'error-input' : ''}
            required
          />
          {error && <small className="error-message">{error}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={error ? 'error-input' : ''}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
      <div className="login-redirect">
        <p>
          Don't have an account?{' '}
          <button
            className="link-btn"
            onClick={() => navigate('/signup')} // Navigate to the signup page
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
