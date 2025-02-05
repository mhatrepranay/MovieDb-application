import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname.includes(path) ? "active-link" : "";

  return (
    <header className="header">
      {/* Left - Logo */}
      <div className="logo">
        <Link to="/">MovieDB</Link>
      </div>

      {/* Navigation Links */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link onClick={() => { setMenuOpen(false); setSearchQuery(""); }}
          to="/movies/popular/1" className={isActive("popular")}>
          Popular
        </Link>
        <Link onClick={() => { setMenuOpen(false); setSearchQuery(""); }}
          to="/movies/top_rated/1" className={isActive("top_rated")}>
          Top Rated
        </Link>
        <Link onClick={() => { setMenuOpen(false); setSearchQuery(""); }}
          to="/movies/upcoming/1" className={isActive("upcoming")}>
          Upcoming
        </Link>
      </nav>

      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" type="submit">🔍</button>
      </form>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
};

export default Header;
