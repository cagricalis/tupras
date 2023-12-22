import React, { useState } from 'react';
import { db } from './firebase.js';
import { getDatabase, ref, child, push, update, set } from "firebase/database";
import { getAuth, signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const RandomPasswordGenerator = () => {
    const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const generateRandomPassword = () => {
    const randomPassword = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setPassword(randomPassword);
  };

  const handleLogout = async () => {
    const auth = getAuth();

    try {
       
      await signOut(auth);
      console.log("logout");
      navigate('/login')
      // return <Navigate to="/Login" />;
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
}    


  const emptyFunction = () => {
    set(ref(db, 'passwords/'), {
        1: password,

      })
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Password Generator</h1>
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        id="password"
        value={password}
        readOnly
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />

      <br />

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
        onClick={generateRandomPassword}
      >
        Generate Password
      </button>

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
        onClick={emptyFunction}
      >
        Empty Function
      </button>
      <button className="apply-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RandomPasswordGenerator;
