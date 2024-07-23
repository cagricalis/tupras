import React, { useEffect, useState } from 'react';
//import { Link, useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Numpad from './Numpad.js';
import logo from "./onlock_logo.png"; // Replace with your logo file
import CustomPopup from './CustomPopup';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [selectedPage, setSelectedPage] = useState('generator'); 
 //const history = useHistory();

 useEffect(() => {
    setIsLoggedIn(false);
}, []);

const callbackPopup = () =>  {
    setShowPopup(false);
};

if (isLoggedIn) {
   // return <Navigate to="/generator" />;
   if (isLoggedIn && selectedPage) {
    return <Navigate to={`/${selectedPage}`} />;
  }
} else {

}


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    
   
    } catch (error) {
     setShowPopup(true);
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div style={styles.container}>
    
    <div style={styles.formContainer}>

    <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* <div style={styles.pageButtons}>
          <button onClick={() => setSelectedPage('generator')} style={styles.pageButton}>Odalar</button>
          <button onClick={() => setSelectedPage('dolap')} style={styles.pageButton}>Dolap</button>
        </div> */}
        <div style={styles.pageSelection}>
          <label htmlFor="page" style={styles.label}>
            Giriş Tipini Seçiniz:
          </label>
          <select
            id="page"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            style={styles.select}
          >
            <option value="generator">Odalar</option>
            <option value="dashboard">Dolap</option>
          </select>
        </div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email" style={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label htmlFor="password" style={styles.label}>
          Şifre:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {showPopup && <CustomPopup onClose={callbackPopup} message={"Email adresi veya şifreniz hatalı"} />}
        <button type="submit" style={styles.button}>
          Giriş
        </button>
      </form>

    </div>
  </div>

  );


};

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '20px',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    formContainer: {
      width: '400px',
      padding: '50px',
      borderRadius: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
    },
    header: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginTop:'10px',
      marginBottom: '8px',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      height: '30px',
      marginBottom: '16px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#4caf50',
      color: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    signupLink: {
      marginTop: '16px',
      fontSize: '14px',
    },
    pageSelection: {
      marginTop: '16px',
    },
    select: {
      width: '100%',
      height: '40px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      padding: '5px',
    },
  };


export default Login;
