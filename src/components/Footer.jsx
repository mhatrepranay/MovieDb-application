import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";  // Import the CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 MovieDB. All Rights Reserved.</p>
                <div className="footer-links">
                    <Link to="movies/popular/1">Popular</Link>
                    <Link to="movies/top_rated/1">Top Rated</Link>
                    <Link to="movies/upcoming/1">Upcoming</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
