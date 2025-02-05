import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Details from "./components/Details";
import AllMovies from "./components/AllMovies";
import SearchMovies from "./components/SearchMovies";
import Footer from "./components/Footer";
import "./App.css";  // Import global styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">  {/* Wrapper for content to push footer down */}
          <Routes>
            <Route path="/" element={<AllMovies />} />
            <Route path="/movies/:pagename/:page" element={<AllMovies />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route path="/search" element={<SearchMovies />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
