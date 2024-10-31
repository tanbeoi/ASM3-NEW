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
      </div>
    </div>
  );
};

export default Predict;