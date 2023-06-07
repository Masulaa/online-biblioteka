import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../../navbars/navbar";
import "./NewBook.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditBook() {
  const [bookName, setBookName] = useState("");
  const [categories, setCategories] = useState("");
  const [genres, setGenres] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const [sadrzaj, setSadrzaj] = useState("");

  const handleSadrzajChange = (value) => {
    setSadrzaj(value);}


  return (
    <Fragment>
      <NavBar/>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
      <div className="main-content">
        <div className="Glavno">
          <h1 className="naslov1">Nova Knjiga</h1>
          <p className="text-text">
            <Link to="/EvidentionOfBooks"><span className="paragraf">Evidencija Knjiga</span></Link> / Izmjeni
            Knjigu
          </p>
          <div className="line2"></div>
          <div className="Stranica">
              <Link to="/EvidentionOfBooks/NewBook/BookDetails">
                <p>Osnovne Detalji</p>
              </Link>
              <Link to="/EvidentionOfBooks/NewBook/Specification">
                <p>Specifikacija</p>
              </Link>
              <Link to="/EvidentionOfBooks/NewBook/Multimedia">
                <p>Multimedija</p>
              </Link>
          </div>
          <div className="line2"></div>


          <div className="container">

          <div className="info">
            <label>Naziv Knjige</label>
            <input
              className="input0"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <label>Kratki sadrzaj</label>
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
            <label>Izaberite Zanrove</label>
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
                <option>Ivo Andric</option>
                <option>Petar II Petrovic Njegos</option>
                <option>Mesa Selimovic</option>
                <option>Ivan Mazuranic</option>
            </select>
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
            <div className="buttons">
            <button
          className="submit">Potvrdi</button>
                      <button
          className="cancel"
          onClick={()=>{
            navigate("/EvidentionOfBooks")
          }}>Poništi</button>
          </div>
         </div>
          </div>
          </div>
          </div>
          </div>  
    </Fragment>
  );
}

export default EditBook;