import React from 'react';
import '../App.css';  // Don't forget to create this CSS file

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form className="signup-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password"
              required 
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;