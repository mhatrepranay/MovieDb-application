import React from "react";
import "./Loader.css"; // Import the CSS file for styling

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p style={{ color: "white" }} className=".p11">Loading...</p>
        </div>
    );
};

export default Loader;
