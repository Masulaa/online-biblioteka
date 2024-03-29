import "./EvidentionOfBooks.css";
import Table from "./table";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import illustration1 from "../../images/undraw_bookshelves_re_lxoy.svg"


import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function EvidentionOfBooks() {
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();

  const ill1 = illustration1;

  return (
    <React.Fragment>
         <div className="naslov"><div className="illustrations">
        <img src={ill1} className="illustration" /> 
          <h1>Knjige</h1></div>
         </div> 
        <div className="line2"></div>
        <div className="table-header">
        <button
          className='default-button'
          onClick={() => {
            navigate("/EvidentionOfBooks/NewBook");
          }}
        >
          Nova Knjiga
        </button>
      </div>
      <Table/>
    </React.Fragment>
  );
}

export default EvidentionOfBooks;
