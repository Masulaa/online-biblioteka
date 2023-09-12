import "./LibrarianDetails.css";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserService } from "../../../api/api";

function LibrarianDetails() {
  const [librarian, setLibrarian] = useState([]);
  const [userIconMenuOpen, setUserIconMenuOpen] = useState(false);

  const profilRef = useRef(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profilRef.current && !profilRef.current.contains(event.target)) {
        setUserIconMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const deleteLibrarian = async () => {
    try {
      const response = await UserService.DeleteUsers(id);
      console.log("API Response", response);
      navigate("/AuthorEvidention");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const isOpennedUserIconMenu = () => {
    setUserIconMenuOpen(!userIconMenuOpen);
    if (userIconMenuOpen === false) {
      setUserIconMenuOpen(!userIconMenuOpen);
    }
  };

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const response = await UserService.ShowSingleUser(id);
        setLibrarian(response.data.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchLibrarian();
  }, []);

  return (
    <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="wrapper10">
        <div className="book-details">
           <div className="book-image">
          <img src={librarian.photoPath} alt="book img" className="slika" />
        </div> 

          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
               {librarian.name} {librarian.surname}
                <div className="links">
                  <p class="breadcrumbs">
                    <Link to="/LibrarianEvidention">
                      <span className="paragraf">Evidencija Bibliotekara </span>
                    </Link>
                    <Link to="/UserProfile" >/ ID-{librarian.id}</Link>{" "}
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </div>
        <div>
        <Link to="#" className="links2 side-stuff">
            <FaRegHandScissors className="detail-icons"/>
            Resetuj šifru
          </Link>
          <Link to="#" className="links2 side-stuff">
            <HiOutlineArrowPath className="detail-icons" />
            Izmjeni podatke
          </Link>
          <Link to="#" className="links2" ref={profilRef}>
            <BsThreeDotsVertical
              className="more-options"
              onClick={isOpennedUserIconMenu}
            />
          </Link>
          {userIconMenuOpen && (
            <div className="option-menu01">
              <ul>
                <li
                  onClick={() => {
                    isOpennedUserIconMenu();
                    navigate();
                  }}
                >
                  <AiFillDelete className="detail-icons" />
                  Obriši Korisnika
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="line2"></div>
      <div className="details-content">
      
      <div className="columns">
        <div>
          <div className="book-details-01">
            <p className="category-info">Ime i prezime</p>
            <h3 className="detail-info">{librarian.name} {librarian.surname}</h3>
          </div>
          <div className="book-details-01">
            <p className="category-info">Tip korisnika</p>
            <h3 className="detail-info">{librarian.role}</h3>
          </div>
          <div className="book-details-01">
            <p className="category-info">JMBG</p>
            <h3 className="detail-info">{librarian.jmbg}</h3>
          </div>
          <div className="book-details-01">
            <p className="category-info">Email</p>
            <h3 className="detail-info">{librarian.email}</h3>
          </div>
          <div className="book-details-01">
            <p className="category-info">Korisnicko ime</p>
            <h3 className="detail-info">{librarian.username}</h3>
          </div>
        </div>
        <div className="second-column01">     
           <img src={librarian.photoPath} className="slika-user"/>
        </div>
        
      </div>
      
      </div>
    </div>
  );
}

export default LibrarianDetails;
