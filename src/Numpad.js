import React, { useEffect, useState } from 'react';
import './Numpad.css'; // Import the CSS file for styling
import * as utils from './HttpPostComponent.js'; 
import { db } from './firebase.js';
import { getDatabase, ref, child, push, update, set, onValue } from "firebase/database";
import { Navigate, useLocation } from 'react-router-dom';
import Login from "./Login.js";

const Numpad = () => {
   
    const [response1, setResponse1] = useState(null);
    const [lockType1, setLockType1] = useState("multi");
    const [IP1, setIP1] = useState("85.104.109.102");
    const [port1, setPort1] = useState("5001");
    const [currentNumber, setCurrentNumber] = useState(0);


    const [data, setData] = useState(null);
    const [isEqual, setIsEqual] = useState(false);

    useEffect(() => {
      // Function to fetch data from Firebase
      const fetchData = async () => {
        const db = getDatabase();
        const dataRef = ref(db, 'passwords/'); // Replace 'your_data_path' with the actual path in your database
  
        // Set up a listener for real-time updates
        onValue(dataRef, (snapshot) => {
          const fetchedData = snapshot.val();
          setData(fetchedData[1]);
          console.log(fetchedData[1]);
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
    
 



    const handlePostRequest1 = async () => {
        console.log(currentNumber);
        console.log(data);

        if(currentNumber == data) {
          
      

        try {
          const response = await fetch(
            "https://ismer.onbox.space/api/cu48",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization":
                  "81551fa4-zwzn-6931-kdtk-6f209d635f5d", // Replace with your token
              },
              body: JSON.stringify({
                lockNo: 1,
                IP: "85.104.109.102",
                port: "5001",
                timeStamp: "2022-02-15T12:00:02.202Z",
              }),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            setResponse1(data);
            if (data.isSuccess) {
               
     
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
    <div className="numpad-container">
         <div className="result">{currentNumber}</div>
      <div className="numpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ,0].map((number) => (
          <button key={number} onClick={() => appendNumber(number)}>
            {number}
          </button>
        ))}
        <button onClick={deleteDigit}>Delete</button>
      </div>



      <button className="apply-btn" onClick={handlePostRequest1}>
        Apply
      </button>
    </div>
  );
};

export default Numpad;
