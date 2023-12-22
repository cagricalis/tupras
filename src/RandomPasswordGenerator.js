import React, { useEffect, useState } from 'react';
import { db } from './firebase.js';
import { getDatabase, ref, child, push, update, set,onValue } from "firebase/database";
import { getAuth, signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "./onlock_logo.png"; // Replace with your logo file
import CustomPopup from './CustomPopup';


const RandomPasswordGenerator = () => {
    const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState(null);

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


useEffect(() => {
    // Function to fetch data from Firebase
    const fetchData = async () => {
      const db = getDatabase();
      const dataRef = ref(db, 'passwords/');
     // const dataRef2 = ref(db, 'utils/'); // Replace 'your_data_path' with the actual path in your database

      // Set up a listener for real-time updates
      onValue(dataRef, (snapshot) => {
        const fetchedData = snapshot.val();
        setData(fetchedData[1]);
     
      });

    };

    // Call the fetchData function
    fetchData();

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      // This is important to avoid memory leaks
      // It ensures that the listener is removed when the component is unmounted
    };
  }, []); // Empty dependency array means the effect runs once when the component mounts



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
      <h3>Current Password: {data}</h3>
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
