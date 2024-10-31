import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Predict = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    reference_year: '',
    predict_year: ''
  });

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert('Not a legit user, please sign in first');
      navigate('/signin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that predict year is after reference year
    if (parseInt(formData.predict_year) <= parseInt(formData.reference_year)) {
      alert('Prediction year must be after reference year');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/predict_delay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
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

  // Historical years (2014-2023)
  const historicalYears = Array.from(
    {length: 10}, 
    (_, i) => 2014 + i
  );

  // Future years (2024-2033)
  const futureYears = Array.from(
    {length: 10}, 
    (_, i) => 2024 + i
  );

  return (
    <div className="predict-container">
      <div className="predict-box">
        <h2>Flight Delay Prediction</h2>
        <form className="predict-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reference Year (Historical Data)</label>
            <select
              name="reference_year"
              value={formData.reference_year}
              onChange={handleChange}
              required
            >
              <option value="">Select reference year</option>
              {historicalYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

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
            <p>Based on {formData.reference_year} data</p>
            <p>Predicted delays for {formData.predict_year}:</p>
            <p className="prediction-number">{prediction.toLocaleString()} flights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;