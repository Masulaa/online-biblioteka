import "./EvidentionOfBooks.css";
import Table from "./table";
import NavBar from "../navbars/navbar";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function EvidentionOfBooks() {
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <NavBar />
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="naslov">
          <h1>Knjige</h1>
        </div>
        <div className="line2"></div>
        <div className="new-book">
          <button
            className="nova-knjiga"
            onClick={() => {
              navigate("/EvidentionOfBooks/NewBook/BookDetails");
            }}
          >
            Nova Knjiga
          </button>
          <span className="search-span">
            <HiMagnifyingGlassCircle className="search-bar-icon" />
            <input
              type="text"
              placeholder="  search..."
              className="search"
            ></input>
          </span>
        </div>
        {<Table />}
      </div>
    </React.Fragment>
  );
}

export default EvidentionOfBooks;
