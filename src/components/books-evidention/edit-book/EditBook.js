import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbDashboard } from "react-icons/tb";
import { AiOutlineProfile } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

import "../EvidentionOfBooks.css";
import "../new-book/NewBook.css";
import "./EditBook.css";

function EditBook() {
  const [bookName, setBookName] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const [categories, setCategories] = useState("");
  const [genres, setGenres] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const savedBookName = localStorage.getItem("bookName");
    const savedShortSummary = localStorage.getItem("shortSummary");
    const savedCategories = localStorage.getItem("categories");
    const savedGenres = localStorage.getItem("genres");
    const savedAuthors = localStorage.getItem("authors");
    const savedPublisher = localStorage.getItem("publisher");
    const savedYear = localStorage.getItem("year");
    const savedQuantity = localStorage.getItem("quantity");

    if (savedBookName) setBookName(savedBookName);
    if (savedShortSummary) setShortSummary(savedShortSummary);
    if (savedCategories) setCategories(savedCategories);
    if (savedGenres) setGenres(savedGenres);
    if (savedAuthors) setAuthors(savedAuthors);
    if (savedPublisher) setPublisher(savedPublisher);
    if (savedYear) setYear(savedYear);
    if (savedQuantity) setQuantity(parseInt(savedQuantity));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookName", bookName);
    localStorage.setItem("shortSummary", shortSummary);
    localStorage.setItem("categories", categories);
    localStorage.setItem("genres", genres);
    localStorage.setItem("authors", authors);
    localStorage.setItem("publisher", publisher);
    localStorage.setItem("year", year);
    localStorage.setItem("quantity", quantity.toString());
  }, [
    bookName,
    shortSummary,
    categories,
    genres,
    authors,
    publisher,
    year,
    quantity,
  ]);

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
        <div className="Glavno">
          <h1>Izmjeni Knjigu</h1>
          <p>
            <Link to="/EvidentionOfBooks">Evidencija Knjiga</Link> / Izmjeni
            Knjigu
          </p>
          <div className="line2"></div>
          <div className="Stranica">
              <Link to="/EvidentionOfBooks/EditBook/BasicDetails">
                <p>Osnovne Detalji</p>
              </Link>
              <Link to="/EvidentionOfBooks/EditBook/Specification">
                <p>Specifikacija</p>
              </Link>
              <Link to="/EvidentionOfBooks/EditBook/Multimedia">
                <p>Multimedija</p>
              </Link>
          </div>
          <div className="line2"></div>
          <div className="info">
            <label>Naziv Knjige</label>
            <input
              className="input0"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <label>Kratki sadrzaj</label>
            <input
              className="ks input0"
              value={shortSummary}
              onChange={(e) => setShortSummary(e.target.value)}
            />
            <label>Izaberite kategorije</label>
            <input
              className="input0"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label>Izaberite Zanrove</label>
            <input
              className="input0"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </div>
          <div className="info2">
            <label>Izaberite autore</label>
            <input
              className="input0"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
            <label>Izdavac</label>
            <select
              className="input0"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            >
              <option></option>
              <option>Laguna</option>
              <option>Cid</option>
              <option>Arto</option>
              <option>Nova Knjiga</option>
            </select>
            <label>Godina Izdavanja</label>
            <select
              className="input0"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option> </option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
              <option>2014</option>
              <option>2013</option>
              <option>2012</option>
              <option>2011</option>
              <option>2010</option>
            </select>
            <label>Količina</label>
            <input
              type="number"
              className="input0"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="line2"></div>
        </div>
      </div>

      <aside>
        <nav className="side-nav">
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
              <HiDocumentDuplicate className="icon" />
            </li>
            <li>
              <AiOutlineProfile className="icon" />
            </li>
            <li>
              <TbArrowsLeftRight className="icon" />
            </li>
          </ul>
          <span className="prav"></span>
          <div className="line"></div>
          <FiSettings className="settings" />
        </nav>
      </aside>
    </div>
  );
}

export default EditBook;
