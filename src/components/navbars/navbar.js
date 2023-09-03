import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { UserService } from "../../api/api";

import "./navbar.css";

import { useDispatch } from "react-redux";

import { GiHamburgerMenu } from "react-icons/gi";
import { TbDashboard } from "react-icons/tb";
import { AiOutlineProfile } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { BsFillXCircleFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import {MdLocalLibrary} from "react-icons/md";

import { menuActions } from "../../store/menuStore";
function NavBar({ children }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isTouched, setIsTouched] = useState(false);
  const [userIconMenuOpen, setUserIconMenuOpen] = useState(false);

  const LogOut = async () => {
    try {
      const response = await UserService.LogOut(true);
      console.log("API Response", response);

      // navigate("/EvidentionOfBooks");
    } catch (error) {

      console.error("Couldn't logout", error)
    }
  };

  const isTouchedHandler = () => {
    setIsTouched(!isTouched);
    if (!isTouched) {
      dispatch(menuActions.openMenu());
    } else {
      dispatch(menuActions.closeMenu());
    }
  };

 const isOpennedUserIconMenu = () =>{
  setUserIconMenuOpen(!userIconMenuOpen);
  if(userIconMenuOpen === false){
    setUserIconMenuOpen(!userIconMenuOpen)
  }
 }

  return (
    <div className="page-wrapper">
      <div className="top-nav">
        <div className="logo"><MdLocalLibrary className="logo-icon"/>Biblioteka</div>
        <button
          className="create-btn"
          onClick={() => {
            navigate("/CreateAccount");
          }}
        >
          Kreiraj
        </button>
        <div className="profile">
          <div className="profile-tab">
            <BiUserCircle className="user-icon" onClick={isOpennedUserIconMenu} />
          </div>
          {userIconMenuOpen && (
            <div className="user-menu">
              <ul>
                <li onClick={isOpennedUserIconMenu}>Profile</li>
                <li onClick={()=>{isOpennedUserIconMenu();
                LogOut();
                navigate("LogIn")}}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="main-content">
        <aside className={`aside ${isTouched ? "aside-expanded" : ""}`}>
          <nav className="">
            <ul className="lista">
              <li className="celija an">
                <GiHamburgerMenu className="icon2" onClick={isTouchedHandler} />
              </li>
              <li className="celija">
                <TbDashboard className="icon2" />
                <p className={`par ${isTouched ? "par-expanded" : ""}`}>
                  Dashboard
                </p>
              </li>
              <li className="celija">
                <AiOutlineProfile
                  className="icon2"
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/LibrarianEvidention");
                  }}
                />
                <p
                  className={`par ${isTouched ? "par-expanded" : ""}`}
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/LibrarianEvidention");
                  }}
                >
                  Bibliotekari
                </p>
              </li>
              <li className="celija">
                <MdPeopleAlt
                  className="icon2"
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/StudentEvidention");
                  }}
                />
                <p
                  className={`par ${isTouched ? "par-expanded" : ""}`}
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/StudentEvidention");
                  }}
                >
                  Učenici
                </p>
              </li>
              <li className="celija">
                <HiDocumentDuplicate
                  className="icon2"
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/EvidentionOfBooks");
                  }}
                />
                <p
                  className={`par ${isTouched ? "par-expanded" : ""}`}
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/EvidentionOfBooks");
                  }}
                >
                  Knjige
                </p>
              </li>
              <li className="celija">
                <AiOutlineProfile
                  className="icon2"
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/AuthorEvidention");
                  }}
                />
                <p
                  className={`par ${isTouched ? "par-expanded" : ""}`}
                  onClick={() => {
                    if (isTouched) {
                      isTouchedHandler();
                    }
                    navigate("/AuthorEvidention");
                  }}
                >
                  Autori
                </p>
              </li>
              <li className="celija">
                <TbArrowsLeftRight
                  className="icon2"
                  onClick={isTouchedHandler}
                />
                <p className={`par ${isTouched ? "par-expanded" : ""}`}>
                  Izdavanje Knjiga
                </p>
              </li>
              <div className="bottomicons">
                <li className="celija">
                  <span
                    className={`line ${isTouched ? "line-expanded" : ""}`}
                  ></span>
                  <FiSettings className="icon2" onClick={isTouchedHandler} />
                  <p className={`par ${isTouched ? "par-expanded" : ""}`}>
                    Settings
                  </p>
                </li>
              </div>
            </ul>
          </nav>
        </aside>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
      <div className={`cancel10 ${isTouched ? "cancel11" : ""}`}>
        <BsFillXCircleFill
          className={`iconx ${isTouched ? "iconx1" : ""}`}
          onClick={isTouchedHandler}
        ></BsFillXCircleFill>
      </div>
    </div>
  );
}

export default NavBar;
