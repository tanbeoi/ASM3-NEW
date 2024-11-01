import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Predict = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userEmail = localStorage.getItem('userEmail');
    return !!userEmail;
  });
  const [formData, setFormData] = useState({
    predict_year: ''
  });

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setIsAuthenticated(false);
      alert('Please sign in first');
      navigate('/signin');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setIsAuthenticated(false);
      alert('Please sign in to use the prediction feature');
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/predict_delay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: userEmail
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setPrediction(data.prediction);
      } else {
        const error = await response.json();
        alert(error.detail || 'Prediction failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Prediction failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const futureYears = Array.from(
    {length: 10}, 
    (_, i) => 2024 + i
  );

  return (
    <div className="predict-container">
      {isAuthenticated ? (
        <div className="predict-box">
          <h2>Flight Delay Prediction</h2>
          <form className="predict-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Year to Predict</label>
              <select
                name="predict_year"
                value={formData.predict_year}
                onChange={handleChange}
                required
              >
                <option value="">Select prediction year</option>
                {futureYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="predict-button">
              Predict Number of Delayed Flights
            </button>
          </form>

          {prediction && (
            <div className="prediction-result">
              <h3>Flight Delay Prediction</h3>
              <p>Based on the data from 2014 to 2023</p>
              <p>Predicted delays for {formData.predict_year}:</p>
              <p className="prediction-number">{prediction.toLocaleString()} flights</p>
            </div>
          )}

          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="predict-box">
          <h2>Please Sign In</h2>
          <p>You need to be signed in to use the prediction feature.</p>
        </div>
      )}
    </div>
  );
};

export default Predict;