import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DragDrop from "../../dragdropupload/DragDrop";
import "./NewBook.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BookService } from "../../../api/api";

function NewBook() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookName, setBookName] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const [categories, setCategories] = useState("");
  const [genres, setGenres] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [script, setScript] = useState("");
  const [binding, setBinding] = useState("");
  const [format, setFormat] = useState("");
  const [isbn, setIsbn] = useState("");
  const [fileName, setFileName] = useState("");

  const createBook = () => {
    BookService.CreateBook({
      nazivKnjiga: bookName,
    });
  };

  const navigate = useNavigate();

  const [sadrzaj, setSadrzaj] = useState("");

  const handleSadrzajChange = (value) => {
    setSadrzaj(value);
  };

  const handleFileNameChange = (name) => {
    setFileName(name);
  };

  const handleConfirm = () => {
    
    console.log("Naziv knjige:", bookName);
    console.log("Kratki sadržaj:", sadrzaj);
    console.log("Kategorija:", categories);
    console.log("Žanr:", genres);
    console.log("Autor:", authors);
    console.log("Izdavač:", publisher);
    console.log("Godina izdavanja:", year);
    console.log("Količina:", quantity);
    console.log("Broj stranica:", numOfPages);
    console.log("Pismo:", script);
    console.log("Povez:", binding);
    console.log("Format:", format);
    console.log("ISBN:", isbn);
    console.log("Ime fajla - :", fileName);

    createBook();
  };

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const handleLinkClick = (step) => {
    setCurrentStep(step);
  };

  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
        {/* <Headbar naslov="Nova Knjiga"> */}
          <div class="headbar">
            <h2 className="naslov">Nova Knjiga</h2>
            <p class="breadcrumbs">
              <Link to="/EvidentionOfBooks">
                <span className="paragraf">Evidencija Knjiga</span>
              </Link>{" "}
              / Nova Knjiga
            </p>
          </div>

          <div>
            <div>
              <Link>
                <button
                  className={`toggle-button ${
                    currentStep === 1 ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick(1)}
                >
                  Osnovni Detalji
                </button>
              </Link>
              <Link className="link-p">
                <button
                  className={`toggle-button ${
                    currentStep === 2 ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick(2)}
                >
                  Specifikacija
                </button>
              </Link>
              <Link className="link-p">
                <button
                  className={`toggle-button ${
                    currentStep === 3 ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick(3)}
                >
                  Multimedija
                </button>
              </Link>
            </div>

            <div className="line2"></div>

            {currentStep === 1 && (
              <div className="flex-columns">
                <div className="column">
                  <label>Naziv Knjige</label>
                  <input
                    className="default-input"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                  <label>Kratki sadržaj</label>
                  <ReactQuill
                    value={sadrzaj}
                    onChange={handleSadrzajChange}
                    className="default-input"
                  />
                  <label>Izaberite kategorije</label>
                  <input
                    className="default-input"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                  />
                  <label>Izaberite Žanrove</label>
                  <input
                    className="default-input"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                  />
                </div>
                <div className="column">
                  <label>Izaberite autore</label>
                  <select
                    className="default-input"
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
                    className="default-input"
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
                    className="default-input"
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
                    className="default-input"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
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
                      onClick={() => handleLinkClick(2)}
                    >
                      Dalje
                    </button>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="container2">
                <div className="info">
                  <label>Broj Stranica</label>
                  <input
                    type="number"
                    className="default-input"
                    min="1"
                    value={numOfPages}
                    onChange={(e) => setNumOfPages(parseInt(e.target.value))}
                  />
                  <label>Pismo</label>
                  <select
                    className="default-input"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                  >
                    <option> </option>
                    <option>Ćirilica</option>
                    <option>Latinica</option>
                  </select>
                  <label>Povez</label>
                  <select
                    className="default-input"
                    value={binding}
                    onChange={(e) => setBinding(e.target.value)}
                  >
                    <option> </option>
                    <option>Meki</option>
                    <option>Tvrdi</option>
                  </select>
                  <label>Format</label>
                  <select
                    className="default-input"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                  >
                    <option> </option>
                    <option>A4</option>
                    <option>A5</option>
                    <option>16:9</option>
                    <option>4:3</option>
                  </select>

                  <label>ISBN</label>
                  <input
                    className="default-input"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                  <div className="buttons-spec">
                    <button
                      className="cancel"
                      onClick={() => {
                        setCurrentStep(1);
                      }}
                    >
                      Nazad
                    </button>
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
                      onClick={() => handleLinkClick(3)}
                    >
                      Dalje
                    </button>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="container3">
                <DragDrop
                  handleFileNameChange={handleFileNameChange}
                  fileName={fileName}
                />
                <div className="buttons">
                  <button
                    className="cancel"
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                  >
                    Nazad
                  </button>
                  <button
                    className="cancel"
                    onClick={() => {
                      navigate("/EvidentionOfBooks");
                    }}
                  >
                    Poništi
                  </button>
                  <button className="submit" onClick={handleConfirm}>
                    Potvrdi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewBook;
