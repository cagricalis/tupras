import React, { useState } from "react";
import "./App.css";




const CustomPopup = ({ data, onClose, message }) => {
  
  const[close, setClose] = useState(); 

  function closeModalHandler(){

    setClose(true);
  };


  return (
    

    <div className="custom-popup">
      <div className="popup-content">
        <h1>{message}</h1>
        <p>{data}</p>

        {/* <img 
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" 
          alt="GIF" 
          className="popup-gif" 
        /> */}
        <button onClick = {onClose}>Kapat</button>
      </div>
    </div>
  );
};

export default CustomPopup;
