// Header.js
import React from "react";
import logo from "./onlock_logo.png"; // Replace with your logo file

function Header() {
  return (
    <header className="page-header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1>HTTP POST Request Example</h1>
    </header>
  );
}

export default Header;
