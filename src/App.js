import React, { useState } from 'react';
import './App.css';
import HttpPostComponent from "./HttpPostComponent";
import ReactDOM from 'react-dom';
import RandomPasswordGenerator from './RandomPasswordGenerator'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Numpad from './Numpad.js';
import NumpadLocks from './NumpadLocks.js';
import Dashboard from './Dashboard.js';
import PrivateRoute from './PrivateRoute';




//import Header from "./Header"; // Import the Header component

function App() {

  return (
    <div className="App">
  

    <Router>
      <Routes>
        <Route path="/login"  element={<Login />} />
        <Route path="/lockscreen" element={<Numpad />} />
        
        <Route 
          path="/generator" 
          element={<PrivateRoute element={<RandomPasswordGenerator />} />} 
        />
        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<Dashboard />} />} 
        />
        <Route path="/dolap" element={<NumpadLocks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>

   {/* <RandomPasswordGenerator /> */}
    {/* <HttpPostComponent /> */}
   
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root')); 

export default App;
