import "./StudentEvidention.css";
import StudentTable from "./StudentTable";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ill3 from "../../images/undraw_typewriter_re_u9i2.svg"

import { PlusOutlined } from '@ant-design/icons';

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
      <div className="table-header">
        <button
          className='default-button'
          onClick={() => {
            navigate("/StudentEvidention/NewStudent");
          }}
        >
         <PlusOutlined/> Novi Ucenik
        </button>
      </div>
      <StudentTable/>
      </div>
    </body>
  );
}

export default StudentEvidention;
