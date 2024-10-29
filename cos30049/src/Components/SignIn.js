import React from 'react';
import '../App.css';

const SignIn = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Welcome Back</h2>
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
          <button type="submit" className="signup-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;