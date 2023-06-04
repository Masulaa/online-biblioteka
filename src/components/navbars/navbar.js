import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbDashboard } from "react-icons/tb";
import { AiOutlineProfile } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <nav className="top-nav">
          <div className="logo">Biblioteka</div>
          <div className="profile">
            <button className="create-btn">Kreiraj</button>
            <div className="profile1">
              <div className="profile-tab"></div>
            </div>
          </div>
        </nav>
      </header>

      <div className="main-content">
        <aside>
          <nav className="sidebar">
            <ul className="lista">
              <li>
                <GiHamburgerMenu className="icon" />
              </li>
              <li>
                <TbDashboard className="icon" />
              </li>
              <li>
                <AiOutlineProfile className="icon" />
              </li>
              <li>
                <MdPeopleAlt className="icon" />
              </li>
              <li>
                <HiDocumentDuplicate className="icon" onClick={()=>{
                  navigate('/EvidentionOfBooks')
                }} />
              </li>
              <li>
                <AiOutlineProfile className="icon" />
              </li>
              <li>
                <TbArrowsLeftRight className="icon" />
              </li>
              <div className="bottomicons">
                <span className="line"></span>
                <FiSettings className="icon" />
              </div>
            </ul>
            <div className="all-lists"></div>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default NavBar;
