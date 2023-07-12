import "./AuthorEvidention.css";
import AuthorTable from "./AuthorTable";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function AuthorEvidention() {

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();
  return (
    <body>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="naslov">
        <h1>Autori</h1>
      </div>
      <div className="line2"></div>
      <div className="new-student">
        <button
          className='novi-ucenik'
          onClick={() => {
            navigate("/AuthorEvidention/NewAuthor");
          }}
        >
          Novi Autor
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
      <AuthorTable/>
      </div>
    </body>
  );
}

export default AuthorEvidention;