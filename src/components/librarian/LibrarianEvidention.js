import "./LibrarianEvidention.css";
import LibrarianTable from "./LibrarianTable";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../navbars/navbar";

import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function LibrarianEvidention() {

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();
  return (
    <body>
      <NavBar />
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="naslov">
        <h1>Bibliotekari</h1>
      </div>
      <div className="line2"></div>
      <div className="new-student">
        <button
          className='novi-ucenik'
          onClick={() => {
            navigate("/LibrarianEvidention/NewLibrarian");
          }}
        >
          Novi Bibliotekar
        </button>
        <span className="search-span">
          <HiMagnifyingGlassCircle className="search-bar-icon" />
          <input
            type="text"
            placeholder="   search..."
            className="search"
          ></input>
        </span>
      </div>
      <LibrarianTable/>
      </div>
    </body>
  );
}

export default LibrarianEvidention;