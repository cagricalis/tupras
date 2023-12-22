import React, { useEffect, useState } from 'react';
//import { Link, useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Numpad from './Numpad.js';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 //const history = useHistory();

 useEffect(() => {
    setIsLoggedIn(false);
}, []);

if (isLoggedIn) {
    return <Navigate to="/generator" />;
} else {
    console.log("ashjdoajs");
}


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    
      console.log("asd");
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
        />

        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
        />

        <br />

        <button
          type="submit"
          style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
        >
          Login
        </button>
      </form>


    </div>
  );
};

export default Login;
