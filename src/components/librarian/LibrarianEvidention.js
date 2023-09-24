import "./LibrarianEvidention.css";
import LibrarianTable from "./LibrarianTable";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ill from "../../images/undraw_education_f8ru.svg"

import { PlusOutlined } from '@ant-design/icons';

import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function LibrarianEvidention() {

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();
  return (
    <body>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="naslov"><div className="illustrations">
        <img src={ill} className="illustration" /> 
          <h1>Bibliotekari</h1></div>
         </div> 
      <div className="line2"></div>
      <div className="table-header">
        <button
          className='default-button'
          onClick={() => {
            navigate("/LibrarianEvidention/NewLibrarian");
          }}
        >
          <PlusOutlined /> Novi Bibliotekar
        </button>
      </div>
      <LibrarianTable/>
      </div>
    </body>
  );
}

export default LibrarianEvidention;
