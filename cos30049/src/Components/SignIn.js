import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Now setError is defined

    try {
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userId', data.id ? data.id.toString() : '');
        if (data.id === 1) {
          localStorage.setItem('isAdmin', 'true');
        }
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