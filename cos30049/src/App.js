import React from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import About from './Components/About';
import DataVis from './Components/DataVis';
import Contacts from './Components/Contacts';
import SignIn from './Components/SignIn';
import Predict from './Components/Predict';
import SignUp from './Components/SignUp';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/predict');
  };

  return (
    <div className="home-container">
      <h1>The destination for Flight Prediction</h1>
      <p>Accurate, Real-Time Insights into Flight Delays at your fingertips.</p>
      <button className="getStartedBtn" onClick={handleGetStarted}>
        Get Started
      </button>
      <img src="/airplane.png" alt="Airplane" className="airplane" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dataVis" element={<DataVis />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;