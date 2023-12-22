import React from "react";
import "./App.css";

const CustomPopup = ({ data, onClose }) => {
  return (
    <div className="custom-popup">
      <div className="popup-content">
        <h2>Data</h2>
        <p>{data}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomPopup;
