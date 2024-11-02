import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignIn = () => {
  // State variables to manage form data and errors
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      // Check status of response
      if (response.ok) {
        const data = await response.json(); 
        //store user email and id in local storage
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userId', data.id ? data.id.toString() : '');
        
        navigate('/predict');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Sign in failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Sign in failed. Please try again.');
    }
  };
  // Render the sign in form
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Welcome Back</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="signup-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;