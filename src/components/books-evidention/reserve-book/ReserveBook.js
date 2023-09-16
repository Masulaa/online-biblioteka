import { react, useState, useEffect, useRef } from "react";
import { BookService } from "../../../api/api";
import { UserService } from "../../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./ReserveBook.css";

const ReserveBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [datumRezervisanja, setDatumRezervisanja] = useState(null);

  const [userIconMenuOpen, setUserIconMenuOpen] = useState(false);

  const profilRef = useRef(null);

  const { id } = useParams();

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const rezervisiKnjiguData = {
    student_id: userId,
    datumRezervisanja: datumRezervisanja,
  };

  const rezervisiKnjigu = async () => {
    try {
      const response = await BookService.ReserveBook(rezervisiKnjiguData, id);
      console.log("API Response", response);

      // navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error izdaj a book", error);
    }
  };

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

  return (
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
                  <p class="breadcrumbs">
                    <Link to="/EvidentionOfBooks">
                      <span className="paragraf">Evidencija Knjiga</span>
                    </Link>{" "}
                    / Izdaj Knjigu
                  </p>
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
          <Link to={`/IzdajKnjigu/${book.id}`} className="links2 side-stuff">
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
            />
          </Link>
          {userIconMenuOpen && (
            <div className="option-menu01">
              <ul>
                <li
                  onClick={() => {
                    isOpennedUserIconMenu();
                    navigate(`/EvidentionOfBooks/EditBook/${book.id}`);
                  }}
                >
                  <AiFillEdit className="detail-icons" />
                  Izmjeni Knjigu
                </li>
                <li onClick={() => {}}>
                  <AiFillDelete className="detail-icons" />
                  Vrati Knjigu
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="raspored-izdaj-knjige">
        <div className="i10">
          <div className="i2">
            <h2 className="naslov-mini-ispod">Rezerviši Knjigu</h2>
            <label>Izaberite učenika koji rezerviše knjigu</label>
            <select
              type="text"
              className="default-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              {users.map((user) => {
                if (user.role === "Učenik") {
                  return (
                    <option value={user.id}>
                      {user.name}&nbsp;{user.surname}
                    </option>
                  );
                }
                return null;
              })}
            </select>
          </div>{" "}
          <div className="i0">
            <div className="i3">
              <div className="form123">
                <label>Datum Izdavanja</label>
                <input
                  type="date"
                  className="default-input"
                  onChange={(e) => {
                    setDatumRezervisanja(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="buttons">
            <button
              className="cancel"
              onClick={() => {
                navigate("/EvidentionOfBooks");
              }}
            >
              Poništi
            </button>
            <button
              className="submit"
              onClick={() => {
                rezervisiKnjigu();
                navigate("/EvidentionOfBooks")
              }}
            >
              Potvrdi
            </button>
          </div>
        </div>
        <div className="i4">
          <div className="category-info22">
            <div className="side-category00">
              <span className="side-category01">Na raspolaganju:</span>
              <span className="side-category01">Rezervisano:</span>
              <span className="side-category01">Izdato:</span>
              <span className="side-category01">U prekoračenju:</span>
              <span className="side-category01">Ukupna količina:</span>
            </div>
            <div>
              <div className="side-info00">
                <span className="side-info01">
                  {book.samples - book.rSamples - book.bSamples - book.fSamples}
                  primjeraka
                </span>
                <span className="side-info01">{book.rSamples} primjeraka</span>
                <span className="side-info01">{book.bSamples} primjeraka</span>
                <span className="side-info01">{book.fSamples} primjeraka</span>
                <span className="side-info01">
                  {book.samples}
                  primjeraka
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveBook;
