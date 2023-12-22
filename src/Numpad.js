import React, { useEffect, useState } from 'react';
import './Numpad.css'; // Import the CSS file for styling
import * as utils from './HttpPostComponent.js'; 
import { db } from './firebase.js';
import { getDatabase, ref, child, push, update, set, onValue } from "firebase/database";
import { Navigate, useLocation } from 'react-router-dom';
import Login from "./Login.js";
import CustomPopup from './CustomPopup';
import logo from "./onlock_logo.png"; // Replace with your logo file

const Numpad = () => {
   
    const [response1, setResponse1] = useState(null);
    const [lockType1, setLockType1] = useState("multi");
    const [IP1, setIP1] = useState("85.104.109.102");
    const [port1, setPort1] = useState("5001");
    const [url, setUrl] = useState("https://ismer.onbox.space/api/cu1");
    const [currentNumber, setCurrentNumber] = useState(0);
    const [showPopup, setShowPopup] = useState(false);


    const [data, setData] = useState(null);
    const [isEqual, setIsEqual] = useState(false);

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
          console.log(fetchedData[1]);
        });
        // onValue(dataRef2, (snapshot2) => {
        //     const fetchedData2 = snapshot2.val();
        //     setData(fetchedData2[1]);
        //     console.log(fetchedData2["ip"]);
        //     console.log(fetchedData2["port"]);
        //     setIP1(fetchedData2["ip"]);
        //     setPort1(fetchedData2["port"]);
        //   });
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
  


    useEffect(() => {
        // Function to fetch data from Firebase
        const fetchData = async () => {
          const db = getDatabase();
          const dataRef2 = ref(db, 'utils/'); 
    
          onValue(dataRef2, (snapshot2) => {
              const fetchedData2 = snapshot2.val();
              console.log(fetchedData2["ip"]);
              console.log(fetchedData2["port"]);
              console.log(fetchedData2["url"]);
              setIP1(fetchedData2["ip"]);
              setPort1(fetchedData2["port"]);
              setUrl(fetchedData2["url"]);
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
    



    useEffect(() => {

    }, [currentNumber, data]);
    
 

    const callbackPopup = () =>  {
        setShowPopup(false);
    };



    const handlePostRequest1 = async () => {
        console.log(currentNumber);
        console.log("cc " + data);

        if(currentNumber == data) {
          
      

        try {
          const response = await fetch(
            url,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization":
                  "81551fa4-zwzn-6931-kdtk-6f209d635f5d",
              },
              body: JSON.stringify({
                lockNo: 1,
                IP: IP1,
                port: port1,
                timeStamp: "2022-02-15T12:00:02.202Z",
              }),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            setResponse1(data);
            if (data.isSuccess) {
               
                setShowPopup(true);
                setCurrentNumber(0);
     
              } 
    
          } else {
            
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
    };
      };

    
  

  const appendNumber = (number) => {
    setCurrentNumber(currentNumber * 10 + number);
  };

  const deleteDigit = () => {
    setCurrentNumber(Math.floor(currentNumber / 10));
  };

  const applyNumbers = () => {
    alert(`You applied the number: ${currentNumber}`);
    // You can perform additional actions with the currentNumber here
    // For now, let's reset the currentNumber to 0
    setCurrentNumber(0);
  };

  return (
    <div style={styles.formContainer} >
       <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="result" style={{border: '1px solid black', borderRadius: '5px', width: '300px' }}>{currentNumber}</div>
      </div>
         
      <div className="numpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0].map((number) =>{  
            return number != "C" ?
          <button key={number} onClick={() => appendNumber(number)}>
            {number}
          </button> : <button disabled style={{ background:"white", border: "none" }}></button>
        })}
        <button style={{ background:"#ee5f55", border: "none"   }} onClick={deleteDigit}>Delete</button>
      </div>

        {showPopup && <CustomPopup onClose={callbackPopup} message={"Şifreniz Geçerlidir"} />}

      <button style={{ background: 'linear-gradient(90deg, #004050, #004050)', border: "none", width:"100%"  }} onClick={handlePostRequest1}>
        Apply
      </button>
    </div>
  );
};

const styles = {
    applyBtn: {
        backgroundColor: '#123123',
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

export default Numpad;
