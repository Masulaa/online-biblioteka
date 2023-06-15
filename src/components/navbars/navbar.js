import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./navbar.css";

import { useDispatch } from "react-redux";

import { GiHamburgerMenu } from "react-icons/gi";
import { TbDashboard } from "react-icons/tb";
import { AiOutlineProfile } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

import { menuActions } from "../../store/menuStore";
function NavBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isTouched, setIsTouched] = useState(false);

  const isTouchedHandler = () => {
    setIsTouched(!isTouched);
    if (!isTouched) {
      dispatch(menuActions.openMenu());
    } else {
      dispatch(menuActions.closeMenu());
    }
  };

  return (
    <div>
      <div class="top-nav">
        <div class="logo">Biblioteka</div>
        <button class="create-btn">Kreiraj</button>
        <div class="profile">
          <div class="profile-tab"></div>
        </div>
      </div>

      <div className="main-content">
        <aside className={`aside ${isTouched ? "aside-expanded" : ""}`}>
          <nav className="sidebar">
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
            <div className="all-lists"></div>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default NavBar;
