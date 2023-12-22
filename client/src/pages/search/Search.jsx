import React from "react";

import search from "../../data/search.json";

import NavBar from "../components/navbar/NavBar";
import Register from "../components/features/register/Register";
import Footer from "../components/footer/Footer";
import SearchPopup from "../components/features/searchPopup/SearchPopup";
import SearchList from "../components/features/searchList/SearchList";

import "./Search.css";

const Search = () => {
  // Go to Home page Handler
  const homeHandler = () => window.location.replace("/");
  // Go to Detail page Handler
  const detailHandler = () => window.location.replace("/detail");

  return (
    <div>
      <NavBar onHome={homeHandler} />
      <div className="search-container">
        <div className="search-wrapper">
          <SearchPopup />
          <SearchList results={search} onDetail={detailHandler} />
        </div>
      </div>
      <Register />
      <Footer />
    </div>
  );
};

export default Search;
