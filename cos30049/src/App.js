import React from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Components/About';
import DataVis from './Components/DataVis';
import Contacts from './Components/Contacts';
import SignIn from './Components/SignIn';
import Predict from './Components/Predict';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/dataVis" element={<DataVis />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;