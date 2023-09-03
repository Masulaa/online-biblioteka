import "./BookDetails.css";
import { Link } from "react-router-dom";
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookService } from "../../../api/api";

function BookDetails() {
  const [book, setBook] = useState([]);
  const { id } = useParams();
  console.log("bookId:", id);
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

  return (
    <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="book-details">
        <div className="book-image">
          <img src={book.photo} alt="book img" className="slika" />
        </div>
        <div className="wrapper30">
        <div className="book-info">
          <div className="naslov">
            <h1 className="h1">
              {book.title}
              <div className="links">
                <Link className="evidention" to="/EvidentionOfBooks">
                  Evidencija Knjiga
                </Link>
                /
                <Link className="book" to="/#~~">
                  KNJIGA-404
                </Link>
              </div>
            </h1>
          </div>
        </div>
        <div className="links2">
          <Link to="#">
            <HiOutlineArrowUturnUp />
            Otpisi Knjigu
          </Link>
          <Link to="#">
            <FaRegHandScissors />
            Izdaj Knjigu
          </Link>
          <Link to="#">
            <HiOutlineArrowPath />
            Vrati Knjigu
          </Link>
          <BsThreeDotsVertical />
        </div>
      </div></div>
      <div className="line2"></div>
    </div>
  );
}

export default BookDetails;
