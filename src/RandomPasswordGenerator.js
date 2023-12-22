import React, { useState } from 'react';
import { db } from './firebase.js';
import { getDatabase, ref, child, push, update, set } from "firebase/database";
import { getAuth, signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "./onlock_logo.png"; // Replace with your logo file
import CustomPopup from './CustomPopup';

const RandomPasswordGenerator = () => {
    const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const generateRandomPassword = () => {
    const randomPassword = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setPassword(randomPassword);
  };

  const callbackPopup = () =>  {
    setShowPopup(false);
};

  const handleLogout = async () => {
    const auth = getAuth();

    try {
       
      await signOut(auth);
  
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
        setShowPopup(true);
      })
      .catch((error) => {
        // The write failed...
      });
  };

  return (

    
    <div>
    <div style={styles.formContainer} >
    <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Create Password</h2>
      <label htmlFor="password"></label>
      <input
        type="text"
        id="password"
        placeholder='Password'
        value={password}
        readOnly
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />

      <br />

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px'  }}
        onClick={generateRandomPassword}
      >
        Generate Password
      </button>
      {showPopup && <CustomPopup onClose={callbackPopup} message={"Şifreniz Değiştirilmiştir"} />}
      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px' }}
        onClick={emptyFunction}
      >
        Apply Password
      </button>
      <button style={styles.applyBtn} onClick={handleLogout}><p>Logout</p></button>
    </div>

        
    </div>
    
  );
};

const styles = {
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

applyBtn: {
    marginTop: '30px',
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    
    // display: 'fixed',
    // top: '10px',
    // right: '10px'
},
formContainer: {
    marginBottom: '20px',
    width: '400px',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
}

export default RandomPasswordGenerator;
