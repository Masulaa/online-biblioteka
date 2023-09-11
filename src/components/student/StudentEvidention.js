import "./StudentEvidention.css";
import StudentTable from "./StudentTable";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ill3 from "../../images/undraw_typewriter_re_u9i2.svg"

import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function StudentEvidention() {

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();
  return (
    <body>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="naslov"><div className="illustrations">
        <img src={ill3} className="illustration" /> 
          <h1>Ucenici</h1></div>
         </div> 
      <div className="line2"></div>
      <div className="new-student">
        <button
          className='novi-ucenik'
          onClick={() => {
            navigate("/StudentEvidention/NewStudent");
          }}
        >
          Novi Ucenik
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
      <StudentTable/>
      </div>
    </body>
  );
}

export default StudentEvidention;