import "./BookDetails.css";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai"
import { AiFillEdit } from "react-icons/ai"
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookService } from "../../../api/api";

function BookDetails() {
  const [book, setBook] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
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

  const deleteBooks = async () => {
    try {
      const response = await BookService.DeleteBooks(book.id);
      console.log("API Response", response);
      navigate("/StudentEvidention")
    } catch (error) {

      console.error("Error deleting book:", error)
    }
  };

  const isOpennedUserIconMenu = () => {
    setUserIconMenuOpen(!userIconMenuOpen);
    if (userIconMenuOpen === false) {
      setUserIconMenuOpen(!userIconMenuOpen);
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

  const handleLinkClick = (step) => {
    setCurrentStep(step);
  };


  return (
    <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="wrapper30">
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
              / ID-{book.id}
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
            <FaRegHandScissors className="detail-icons"/>
            Izdaj Knjigu
          </Link>
          <Link to={`/ReserveBook/${book.id}`} className="links2 side-stuff">
            <FaRegHandScissors className="detail-icons"/>
            Rezerviši Knjigu
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
                      isOpennedUserIconMenu();
                      deleteBooks();
                      navigate("/EvidentionOfBooks")
                    }}
                  >
                    <AiFillDelete className="detail-icons"/>
                    Obriši Knjigu
                  </li>
                </ul>
              </div>
            )}
          
        </div>
      </div>

      <div>
        <Link>
          <button
            className={`toggle-button ${currentStep === 1 ? "active" : ""}`}
            onClick={() => handleLinkClick(1)}
          >
            Osnovni Detalji
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 2 ? "active" : ""}`}
            onClick={() => handleLinkClick(2)}
          >
            Specifikacija
          </button>
        </Link>
        <Link className="link-p">
          <button
            className={`toggle-button ${currentStep === 3 ? "active" : ""}`}
            onClick={() => handleLinkClick(3)}
          >
            Multimedija
          </button>
        </Link>

        <div className="line2"></div>
      </div>

      {currentStep === 1 && (
      <div className="details-content">
        <div className="columns">
          <div>
            <div className="book-details-01">
              <p className="category-info">Naziv Knjige</p>
              <h3 className="detail-info">{book.title}</h3>
            </div>
            <div className="book-details-01">
              <p className="category-info">Kategorija/e</p>
              <h3 className="detail-info">
                {book.categories &&
                  book.categories.map((kategorija) => (
                    <li className="li" key={kategorija.id}>{kategorija.name}</li>
                  ))}
              </h3>
            </div>
            <div className="book-details-01">
              <p className="category-info">Žanr/ovi</p>
              <h3 className="detail-info">
                {book.genres &&
                  book.genres.map((zanr) => <li className="li" key={zanr.id}>{zanr.name}</li>)}
              </h3>
            </div>
            <div className="book-details-01">
              <p className="category-info">Autor/ri</p>
              <h3 className="detail-info">
                {book.authors &&
                  book.authors.map((autor) => (
                    <li className="li" key={autor.id}>{autor.name}</li>
                  ))}
              </h3>
            </div>
            <div className="book-details-01">
              <p className="category-info">Izdavač/či</p>
              <h3 className="detail-info">
                {book.publisher && book.publisher.name}
              </h3>
            </div>
            <div className="book-details-01">
              <p className="category-info">Godina Izdavanja</p>
              <h3 className="detail-info">{book.pDate}</h3>
            </div>
          </div>
          <div className="second-column01">
            <div className="book-details-01">
              <p className="category-info">Storyline (Kratki sadrzaj)</p>
              <h3 className="detail-info">{book.description}</h3>
            </div>
          </div>
        </div>

        <div className="side-info-book-details">
         <div className="category-info">
          <div className="side-category00">
            <span className="side-category01">Na raspolaganju:</span>
            <span className="side-category01">Rezervisano:</span>
            <span className="side-category01">Izdato:</span>
            <span className="side-category01">U prekoračenju:</span>
            <span className="side-category01">Ukupna količina:</span>
          </div>
          <div className="side-info00">
            <span className="side-info01">{book.samples - book.rSamples - book.bSamples - book.fSamples} primjeraka</span>
            <span className="side-info01">{book.rSamples} primjeraka</span>
            <span className="side-info01">{book.bSamples} primjeraka</span>
            <span className="side-info01">{book.fSamples} primjeraka</span>
            <span className="side-info01">{book.samples} primjeraka</span>
           </div>
          </div>
          <div className="side-evidention-info00">
            <span>Izdavanje Knjiga - 4days ago</span>
            <span>Valentina.K je izdala knjigu Borisu Bojicicu dana 21.09.2023.</span>
            <span>Pogledaj detaljnije</span>
          </div>
        </div>
      </div>)}
      {currentStep === 2 && (
             <div className="details-content">
             <div className="columns">
               <div>
                 <div className="book-details-01">
                   <p className="category-info">Broj strana</p>
                   <h3 className="detail-info">{book.pages}</h3>
                 </div>
                 <div className="book-details-01">
                   <p className="category-info">Pismo</p>
                   <h3 className="detail-info">
                   {book.script && book.script.name}
                   </h3>
                 </div>
                 <div className="book-details-01">
                   <p className="category-info">Jezik</p>
                   <h3 className="detail-info">
                   {book.language && book.language.name}
                   </h3>
                 </div>
                 <div className="book-details-01">
                   <p className="category-info">Povez</p>
                   <h3 className="detail-info">
                   {book.bookbind && book.bookbind.name}
                   </h3>
                 </div>
                 <div className="book-details-01">
                   <p className="category-info">Format</p>
                   <h3 className="detail-info">
                   {book.format && book.format.name}
                   </h3>
                 </div>
                 <div className="book-details-01">
                   <p className="category-info">International Standard Book Number (ISBN)</p>
                   <h3 className="detail-info">{book.isbn}</h3>
                 </div>
               </div>
             </div>
     
             <div className="side-info-book-details">
              <div className="category-info">
               <div className="side-category00">
                 <span className="side-category01">Na raspolaganju:</span>
                 <span className="side-category01">Rezervisano:</span>
                 <span className="side-category01">Izdato:</span>
                 <span className="side-category01">U prekoračenju:</span>
                 <span className="side-category01">Ukupna količina:</span>
               </div>
               <div className="side-info00">
                 <span className="side-info01">{book.samples - book.rSamples - book.bSamples - book.fSamples} primjeraka</span>
                 <span className="side-info01">{book.rSamples} primjeraka</span>
                 <span className="side-info01">{book.bSamples} primjeraka</span>
                 <span className="side-info01">{book.fSamples} primjeraka</span>
                 <span className="side-info01">{book.samples} primjeraka</span>
                </div>
               </div>
               <div className="side-evidention-info00">
                 <span>Izdavanje Knjiga - 4days ago</span>
                 <span>Valentina.K je izdala knjigu Borisu Bojicicu dana 21.09.2023.</span>
                 <span>Pogledaj detaljnije</span>
               </div>
             </div>
           </div>
      )}
            {currentStep === 3 && (
             <div className="details-content">
             <div className="columns">
               <div>
                 <div className="book-details-01">
                   <p className="category-info">Multimedija</p>
                   <h3 className="detail-info"><img className="slika-user" src={book.photo}/></h3>
                 </div>
               </div>
             </div>
     
             <div className="side-info-book-details">
              <div className="category-info">
               <div className="side-category00">
                 <span className="side-category01">Na raspolaganju:</span>
                 <span className="side-category01">Rezervisano:</span>
                 <span className="side-category01">Izdato:</span>
                 <span className="side-category01">U prekoračenju:</span>
                 <span className="side-category01">Ukupna količina:</span>
               </div>
               <div className="side-info00">
                 <span className="side-info01">{book.samples - book.rSamples - book.bSamples - book.fSamples} primjeraka</span>
                 <span className="side-info01">{book.rSamples} primjeraka</span>
                 <span className="side-info01">{book.bSamples} primjeraka</span>
                 <span className="side-info01">{book.fSamples} primjeraka</span>
                 <span className="side-info01">{book.samples} primjeraka</span>
                </div>
               </div>
               <div className="side-evidention-info00">
                 <span>Izdavanje Knjiga - 4days ago</span>
                 <span>Valentina.K je izdala knjigu Borisu Bojicicu dana 21.09.2023.</span>
                 <span>Pogledaj detaljnije</span>
               </div>
             </div>
           </div>
      )}
    </div>
  );
}

export default BookDetails;
