import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../../navbars/navbar";
import "./EditBook.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditBook() {
  const [bookName, setBookName] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const [categories, setCategories] = useState("");
  const [genres, setGenres] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  const [sadrzaj, setSadrzaj] = useState("");

  const handleSadrzajChange = (value) => {
    setSadrzaj(value);
  };

  const handleConfirm = () => {
    console.log("Naziv knjige:", bookName);
    console.log("Kratki sadržaj:", sadrzaj);
    console.log("Kategorije:", categories);
    console.log("Žanrovi:", genres);
    console.log("Autori:", authors);
    console.log("Izdavač:", publisher);
    console.log("Godina izdavanja:", year);
    console.log("Količina:", quantity);
  };

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
    <Fragment>
      <NavBar />
      <div className="main-content">
        <div className="Glavno">
          <h1>Izmjeni Knjigu</h1>
          <p>
            <Link to="/EvidentionOfBooks">
              <span className="paragraf">Evidencija Knjiga</span>
            </Link>{" "}
            / Izmjeni Knjigu
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
            <label>Kratki sadržaj</label>
            <ReactQuill
              value={sadrzaj}
              onChange={handleSadrzajChange}
              className="input0"
            />
            <label>Izaberite kategorije</label>
            <input
              className="input0"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label>Izaberite Žanrove</label>
            <input
              className="input0"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </div>
          <div className="info2">
            <label>Izaberite autore</label>
            <select
              className="input0"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            >
              <option> </option>
              <option>Ivo Andrić</option>
              <option>Petar II Petrović Njegoš</option>
              <option>Meša Selimović</option>
              <option>Ivan Mažuranić</option>
            </select>
            <label>Izdavač</label>
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
            <div className="buttons">
              <button className="submit" onClick={handleConfirm}>
                Potvrdi
              </button>
              <button
                className="cancel"
                onClick={() => {
                  navigate("/EvidentionOfBooks");
                }}
              >
                Poništi
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditBook;
