// Import necessary React hooks and routing functionality
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignIn = () => {
  // Initialize navigation function for redirecting after sign in
  const navigate = useNavigate();

  // State for form data (email and password)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for handling error messages
  const [error, setError] = useState('');

  // Handle input changes in the form
  const handleChange = (e) => {
    setFormData({
      ...formData,                    // Spread existing form data
      [e.target.name]: e.target.value // Update the changed field
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    setError('');       // Clear any existing errors

    try {
      // Send sign-in request to backend
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // If sign-in successful
        const data = await response.json(); 
        // Store user information in local storage
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userId', data.id ? data.id.toString() : '');
        
        // Redirect to prediction page
        navigate('/predict');
      } else {
        // Handle sign-in failure
        const errorData = await response.json();
        setError(errorData.detail || 'Sign in failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
      setError('Sign in failed. Please try again.');
    }
  };

  // Render sign-in form
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Welcome Back</h2>
        {/* Display error message if it exists */}
        {error && <div className="error-message">{error}</div>}
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required 
            />
          </div>
          {/* Password input field */}
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required 
            />
          </div>
          {/* Submit button */}
          <button type="submit" className="signup-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;