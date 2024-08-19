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
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');
  const [password4, setPassword4] = useState('');
  const [passwordMulti, setPasswordMulti] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMulti, setShowPopupMulti] = useState(false);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [dataMulti, setDataMulti] = useState(null);

  const generateRandomPassword = () => {
    const randomPassword = Math.floor(Math.random() * 1000000).toString().padStart(6, '1');
    setPassword(randomPassword);
  };
  const generateRandomPassword2 = () => {
    const randomPassword2 = Math.floor(Math.random() * 1000000).toString().padStart(6, '1');
    setPassword2(randomPassword2);
  };
  const generateRandomPassword3 = () => {
    const randomPassword3 = Math.floor(Math.random() * 1000000).toString().padStart(6, '1');
    setPassword3(randomPassword3);
  };
  const generateRandomPassword4 = () => {
    const randomPassword4 = Math.floor(Math.random() * 1000000).toString().padStart(6, '1');
    setPassword4(randomPassword4);
  };
  const generateRandomPasswordMulti = () => {
    const randomPassword = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setPasswordMulti(randomPassword);
  };

  const callbackPopup = () =>  {
    setShowPopup(false);
};
const callbackPopupMulti = () =>  {
    setShowPopupMulti(false);
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
      const dataRef = ref(db, 'passwordsHotel/');
      const dataRefMulti = ref(db, 'passwordsMulti/');
     // const dataRef2 = ref(db, 'utils/'); // Replace 'your_data_path' with the actual path in your database

      // Set up a listener for real-time updates
      onValue(dataRef, (snapshot) => {
        const fetchedData = snapshot.val();
        setData(fetchedData[1]);
        setData2(fetchedData[2]);
        setData3(fetchedData[3]);
        setData4(fetchedData[4]);
        
     
      });
      onValue(dataRefMulti, (snapshot) => {
        const fetchedData = snapshot.val();
        
        setDataMulti(fetchedData[1]);
     
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
    set(ref(db, 'passwordsHotel/'), {
        1:password,
        2:data2,
        3:data3,
        4:data4

      })
      .then(() => {
        // Data saved successfully!
        setShowPopup(true);
      })
      .catch((error) => {
        // The write failed...
      });
  };
  const emptyFunction2 = () => {
    set(ref(db, 'passwordsHotel/'), {
      1:data,
      2:password2,
      3:data3,
      4:data4

      })
      .then(() => {
        // Data saved successfully!
        setShowPopup(true);
      })
      .catch((error) => {
        // The write failed...
      });
  };
  const emptyFunction3 = () => {
    set(ref(db, 'passwordsHotel/'), {
      1:data,
      2:data2,
      3:password3,
      4:data4

      })
      .then(() => {
        // Data saved successfully!
        setShowPopup(true);
      })
      .catch((error) => {
        // The write failed...
      });
  };
  const emptyFunction4 = () => {
    set(ref(db, 'passwordsHotel/'), {
      1:data,
      2:data2,
      3:data3,
      4:password4

      })
      .then(() => {
        // Data saved successfully!
        setShowPopup(true);
      })
      .catch((error) => {
        // The write failed...
      });
  };

  const emptyFunctionMulti = () => {
    set(ref(db, 'passwordsMulti/'), {
         1:passwordMulti,

      })
      .then(() => {
        // Data saved successfully!
        setShowPopupMulti(true);
      })
      .catch((error) => {
        // The write failed...
      });
  };

  return (

    
    
    <div style={styles.container}>
   
    
    <div style={styles.formContainer} >
    <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>ODA 4005</h2>
      <label htmlFor="password"></label>
      <input
        type="text"
        id="password"
        placeholder='Şifre'
        value={password}
        readOnly
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />

      <br />

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px'  }}
        onClick={generateRandomPassword}
      >
        Şifre Oluştur
      </button>
      {showPopup && <CustomPopup onClose={callbackPopup} message={"Şifreniz Değiştirilmiştir"} />}
      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px' }}
        onClick={emptyFunction}
      >
        Şifreyi Kaydet
      </button>
      <h3>Mevcut Şifre: {data}</h3>
      <button style={styles.applyBtn} onClick={handleLogout}><p>Çıkış</p></button>
    </div>
    <div style={styles.formContainer} >
    <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>ODA 4007</h2>
      <label htmlFor="password2"></label>
      <input
        type="text"
        id="password2"
        placeholder='Şifre'
        value={password2}
        readOnly
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />

      <br />

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px'  }}
        onClick={generateRandomPassword2}
      >
        Şifre Oluştur
      </button>
      {showPopup && <CustomPopup onClose={callbackPopup} message={"Şifreniz Değiştirilmiştir"} />}
      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px' }}
        onClick={emptyFunction2}
      >
        Şifreyi Kaydet
      </button>
      <h3>Mevcut Şifre: {data2}</h3>
      <button style={styles.applyBtn} onClick={handleLogout}><p>Çıkış</p></button>
    </div>
   
  
    <div style={styles.formContainer} >
    <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>ODA 4009</h2>
      <label htmlFor="password3"></label>
      <input
        type="text"
        id="password3"
        placeholder='Şifre'
        value={password3}
        readOnly
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />

      <br />

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px'  }}
        onClick={generateRandomPassword3}
      >
        Şifre Oluştur
      </button>
      {showPopup && <CustomPopup onClose={callbackPopup} message={"Şifreniz Değiştirilmiştir"} />}
      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px' }}
        onClick={emptyFunction3}
      >
        Şifreyi Kaydet
      </button>
      <h3>Mevcut Şifre: {data3}</h3>
      <button style={styles.applyBtn} onClick={handleLogout}><p>Çıkış</p></button>
    </div>
    <div style={styles.formContainer} >
    <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>ODA 4011</h2>
      <label htmlFor="password4"></label>
      <input
        type="text"
        id="password4"
        placeholder='Şifre'
        value={password4}
        readOnly
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />

      <br />

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px'  }}
        onClick={generateRandomPassword4}
      >
        Şifre Oluştur
      </button>
      {showPopup && <CustomPopup onClose={callbackPopup} message={"Şifreniz Değiştirilmiştir"} />}
      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px' }}
        onClick={emptyFunction4}
      >
        Şifreyi Kaydet
      </button>
      <h3>Mevcut Şifre: {data4}</h3>
      <button style={styles.applyBtn} onClick={handleLogout}><p>Çıkış</p></button>
    </div>
    



    </div>


 
 

    /* <div style={styles.formContainer} >
    <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Create Password For Multi Lock</h2>
      <label htmlFor="passwordMulti"></label>
      <input
        type="text"
        id="passwordMulti"
        placeholder='Password'
        value={passwordMulti}
        readOnly
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />

      <br />

      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px'  }}
        onClick={generateRandomPasswordMulti}
      >
        Generate Password
      </button>
      {showPopupMulti && <CustomPopup onClose={callbackPopupMulti} message={"Şifreniz Değiştirilmiştir"} />}
      <button
        style={{ margin: '10px', padding: '10px', fontSize: '16px', cursor: 'pointer',width: '100px' }}
        onClick={emptyFunctionMulti}
      >
        Apply Password
      </button>
      <h3>Current Password: {dataMulti}</h3>
      <button style={styles.applyBtn} onClick={handleLogout}><p>Logout</p></button>
    </div> */


    
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
    width: '500px',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    margin: 'auto',
},

}

export default RandomPasswordGenerator;
