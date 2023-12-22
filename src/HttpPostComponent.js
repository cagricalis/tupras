import React, { useState } from "react";
import CustomPopup from "./CustomPopup";
import logoImage from "./onlock_logo.png";
import ReactDOM from 'react-dom';
import Numpad from './Numpad';



function App() {

    const [showPopup, setShowPopup] = useState(false);
    //const [dataToShow, setDataToShow] = useState("This is the data to display.");
  
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };

  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [response3, setResponse3] = useState(null);
  const [response4, setResponse4] = useState(null);
  

  // State and handlers for the first POST request
  const [lockType1, setLockType1] = useState("multi");
  const [IP1, setIP1] = useState("31.145.37.122");
  const [port1, setPort1] = useState("9001");

  // State and handlers for the second POST request
  const [lockType2, setLockType2] = useState("single");
  const [IP2, setIP2] = useState("31.145.37.122");
  const [port2, setPort2] = useState("9002");

   // State and handlers for the second POST request
  const [lockType3, setLockType3] = useState("1");
  const [IP3, setIP3] = useState("31.145.37.122");
  const [port3, setPort3] = useState("9001");

      // State and handlers for the second POST request
  const [lockType4, setLockType4] = useState("1");
  const [IP4, setIP4] = useState("31.145.37.122");
  const [port4, setPort4] = useState("9002");

  const handlePostRequest1 = async () => {
    try {
      const response = await fetch(
        "https://kolektif.onbox.space/api/v1/kolektif-house/checkStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmxvY2sta29sZWt0aWYiLCJuYW1lIjoib25sb2NrLWtvbGVrdGlmIiwiaWF0IjoxNjQ4NjI2MzU4fQ.QXElmFu8RRFChxKZ7eAKcBWDYqpVxKCMLHpS5MqIsco", // Replace with your token
          },
          body: JSON.stringify({
            lockType: lockType1,
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
 
          } 

      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostRequest2 = async () => {
    try {
      const response = await fetch(
        "https://kolektif.onbox.space/api/v1/kolektif-house/checkStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmxvY2sta29sZWt0aWYiLCJuYW1lIjoib25sb2NrLWtvbGVrdGlmIiwiaWF0IjoxNjQ4NjI2MzU4fQ.QXElmFu8RRFChxKZ7eAKcBWDYqpVxKCMLHpS5MqIsco", // Replace with your second token
          },
          body: JSON.stringify({
            lockType: lockType2,
            IP: IP2,
            port: port2,
            timeStamp: "2022-02-15T12:00:02.202Z",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponse2(data);
        if (data.isSuccess) {

          } 
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostRequest3 = async () => {
    try {
      const response = await fetch(
        "https://kolektif.onbox.space/api/v1/kolektif-house/multiLock", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmxvY2sta29sZWt0aWYiLCJuYW1lIjoib25sb2NrLWtvbGVrdGlmIiwiaWF0IjoxNjQ4NjI2MzU4fQ.QXElmFu8RRFChxKZ7eAKcBWDYqpVxKCMLHpS5MqIsco", // Replace with your second token
          },
          body: JSON.stringify({
            cellNo: lockType3,
            IP: IP3,
            port: port3,
            timeStamp: "2022-02-15T12:00:02.202Z",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponse3(data);
        if (data.isSuccess) {

          } 
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostRequest4 = async () => {
    try {
      const response = await fetch(
        "https://kolektif.onbox.space/api/v1/kolektif-house/singleLock", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmxvY2sta29sZWt0aWYiLCJuYW1lIjoib25sb2NrLWtvbGVrdGlmIiwiaWF0IjoxNjQ4NjI2MzU4fQ.QXElmFu8RRFChxKZ7eAKcBWDYqpVxKCMLHpS5MqIsco", // Replace with your second token
          },
          body: JSON.stringify({
            lockNo: lockType4,
            IP: IP4,
            port: port4,
            timeStamp: "2022-02-15T12:00:02.202Z",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponse4(data);
        if (data.isSuccess) {

          } 
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (


    
    <div className="App">
    <div>
      <h1>React Numpad Example</h1>
      <Numpad />
    </div>
    
    <header className="header">
    <img src={logoImage} alt="Your Logo" className="logo" />
    </header>

    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root')); // Adjust the root element as needed

export default App;
