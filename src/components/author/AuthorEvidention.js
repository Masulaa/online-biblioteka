import "./AuthorEvidention.css";
import AuthorTable from "./AuthorTable";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import illustration2 from "../../images/undraw_bibliophile_re_xarc.svg"

import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function AuthorEvidention() {

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();
  return (
    <body>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="naslov"><div className="illustrations">
        <img src={illustration2} className="illustration" /> 
          <h1>Autori</h1></div>
         </div> 
      <div className="line2"></div>
      <div className="table-header">
        <button
          className='default-button'
          onClick={() => {
            navigate("/AuthorEvidention/NewAuthor");
          }}
        >
          Novi Autor
        </button>
      </div>
      <AuthorTable/>
      </div>
    </body>
  );
}

export default AuthorEvidention;
