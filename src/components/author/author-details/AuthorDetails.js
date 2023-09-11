import "./AuthorDetails.css";
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
import { AuthorService } from "../../../api/api";

function AuthorDetails() {
  const [author, setAuthor] = useState([]);
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

  const deleteAuthor = async () => {
    try {
      const response = await AuthorService.DeleteAuthors(author.id);
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
    const fetchAuthor = async () => {
      try {
        const response = await AuthorService.ShowAuthor(id);
        setAuthor(response.data.data);
      } catch (error) {
        console.log("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, []);

  return (
    <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="wrapper10">
        <div className="book-details">
          {/* <div className="book-image">
          <img src={me.photoPath} alt="book img" className="slika" />
        </div> */}

          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
                {author.name} {author.surname}
                <div className="links">
                  <p class="breadcrumbs">
                    <Link to="/AuthorEvidention">
                      <span className="paragraf">Evidencija Autora </span>
                    </Link>
                    <Link to="/UserProfile">/ ID-{author.id}</Link>{" "}
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </div>
        <div>
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
                  <FaRegHandScissors className="detail-icons" />
                  Izmjeni Autora
                </li>
                <li
                  onClick={() => {
                    isOpennedUserIconMenu();
                    navigate();
                  }}
                >
                  <AiFillDelete className="detail-icons" />
                  Obriši Autora
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
              <h3 className="detail-info">{author.name} {author.surname}</h3>
            </div>
            <div className="book-details-01 opis-short">
              <p className="category-info">Opis</p>
              <h3 className="detail-info">{author.bio}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetails;
