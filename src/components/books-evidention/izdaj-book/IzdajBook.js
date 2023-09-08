import {react, useState,useEffect, useRef} from "react"
import { BookService } from "../../../api/api";
import { UserService } from "../../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AiFillDelete } from "react-icons/ai"
import { AiFillEdit } from "react-icons/ai"
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./IzdajBook.css"

const IzdajBook= () => {

    const navigate = useNavigate();

    const[book, setBook] = useState([]);
    const[user, setUsers] = useState([]);

    const [userIconMenuOpen, setUserIconMenuOpen] = useState(false);

  const profilRef = useRef(null);

    const { id } = useParams();

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

    useEffect(() => {
        const fetchBook = async () => {
          try {
            const response = await BookService.GetBook(id);
            setBook(response.data.data);
          } catch (error) {
            console.log("Error fetching book:", error);
          }
        };
    
        fetchBook();
      }, []);

      useEffect(() => {
        fetchUsers();
      }, []);
    
      const fetchUsers = async () => {
        try {
          const response = await UserService.ListUsers();
          setUsers(response.data.data);
        } catch (error) {
          console.log("Error fetching users:", error);
        }
      };

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

      const isOpennedUserIconMenu = () => {
        setUserIconMenuOpen(!userIconMenuOpen);
        if (userIconMenuOpen === false) {
          setUserIconMenuOpen(!userIconMenuOpen);
        }
      };


    return(
        <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
            <div className="wrapper10">
        <div className="book-details">
          <div className="book-image">
            <img src={book.photo} alt="book img" className="slika" />
          </div>

          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
                {book.title}
                <div className="links">
                  <Link className="evidention" to="/EvidentionOfBooks">
                    Evidencija Knjiga&nbsp;
                  </Link>
                  /
                  <Link
                    className="book"
                    to={`/EvidentionOfBooks/BookDetails/${id}`}
                  >
                    &nbsp;{book.isbn}
                  </Link>
                </div>
              </h1>
            </div>
          </div>
        </div>
        <div>
        <Link to="#" className="links2 side-stuff">
          <HiOutlineArrowUturnUp className="detail-icons" />
          Otpisi Knjigu
        </Link>
        <Link to="#" className="links2 side-stuff">
          <FaRegHandScissors className="detail-icons" />
          Izdaj Knjigu
        </Link>
        <Link to="#" className="links2 side-stuff">
          <HiOutlineArrowPath className="detail-icons" />
          Vrati Knjigu
        </Link>
        <Link to="#" className="links2" ref={profilRef}>
          <BsThreeDotsVertical
            className="more-options"
            onClick={isOpennedUserIconMenu}
          /></Link>
          {userIconMenuOpen && (
            <div className="option-menu01">
              <ul>
                <li
                  onClick={() => {
                    isOpennedUserIconMenu();
                    navigate(`/EvidentionOfBooks/EditBook/${book.id}`);
                  }}
                >
                  <AiFillEdit className="detail-icons"/>
                  Izmjeni Knjigu
                </li>
                <li
                  onClick={() => {
                  }}
                >
                  <AiFillDelete className="detail-icons"/>
                  Vrati Knjigu
                </li>
              </ul>
            </div>
          )}
        
      </div>
      </div>
      </div>
    );
}

export default IzdajBook;