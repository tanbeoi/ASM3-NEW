import React from 'react';
import '../App.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Project</h1>
      <p>
        We’re a group of 3 Swinburne University students who aim to develop a machine learning model about factors which impact Civil Aviation’s flight delays as well as a website to showcase its results. We communicate online through Messenger, hold meetings through Google Meet and offline through our scheduled weekly workshop.
      </p>
      <h2>Architecture</h2>
      <p>
        The architecture for the Flight Delays Prediction and Visualization Web Application is designed to facilitate a seamless interaction between the front-end user interface, back-end server, and machine learning model. The architecture includes three main components:
      </p>
      <ul className="no-dots">
        <li>
          <strong>Front-End (React.js):</strong> The client-side application is responsible for collecting user inputs, sending requests to the server, and presenting data visualizations and predictions in a user-friendly format.
        </li>
        <li>
          <strong>Back-End (FastAPI):</strong> The server processes user requests, handles data communication between the front-end and the AI model, and provides endpoints for predictions and visualizations.
        </li>
        <li>
          <strong>AI Model:</strong> A pre-trained machine learning model that predicts flight delays based on user inputs, integrated into the back end.
        </li>
      </ul>
    </div>
  );
};

export default Home;