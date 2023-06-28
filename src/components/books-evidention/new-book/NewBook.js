import React from "react";
import { useState, Fragment } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavBar from "../../navbars/navbar";
import DragDrop from "../../dragdropupload/DragDrop";
import "./NewBook.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const validationSchema = Yup.object().shape({
  bookName: Yup.string().required("Naziv knjige je obavezan"),
  shortSummary: Yup.string().required("Kratki sadržaj je obavezan"),
  categories: Yup.string().required("Kategorije su obavezne"),
  genres: Yup.string().required("Žanrovi su obavezni"),
  authors: Yup.string().required("Autori su obavezni"),
  publisher: Yup.string().required("Izdavač je obavezan"),
  year: Yup.string().required("Godina izdavanja je obavezna"),
  quantity: Yup.number()
    .typeError("Količina mora biti broj")
    .min(1, "Količina mora biti veća od 0")
    .required("Količina je obavezna"),
  numOfPages: Yup.number()
    .typeError("Broj stranica mora biti broj")
    .min(1, "Broj stranica mora biti veći od 0")
    .required("Broj stranica je obavezan"),
  script: Yup.string().required("Pismo je obavezno"),
  binding: Yup.string().required("Povez je obavezan"),
  format: Yup.string().required("Format je obavezan"),
  isbn: Yup.string().required("ISBN je obavezan"),
  fileName: Yup.string().required("Naziv fajla je obavezan"),
});

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
    console.log("Ime fajla:", fileName);
  };

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const handleLinkClick = (step) => {
    setCurrentStep(step);
  };

  return (
    <Fragment>
      <NavBar />
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="main-content">
          <div className="Glavno">
            <h1 className="naslov1">Nova Knjiga</h1>
            <p>
              <Link to="/EvidentionOfBooks">
                <span className="paragraf">Evidencija Knjiga</span>
              </Link>{" "}
              / Nova Knjiga
            </p>
            <div className="line2"></div>
            <div className="Stranica">
              <Link className="link-p">
                <button
                  className={currentStep === 1 ? "active" : ""}
                  onClick={() => handleLinkClick(1)}
                >
                  Osnovni Detalji
                </button>
              </Link>
              <Link className="link-p">
                <button
                  className={currentStep === 2 ? "active" : ""}
                  onClick={() => handleLinkClick(2)}
                >
                  Specifikacija
                </button>
              </Link>
              <Link className="link-p">
                <button
                  className={currentStep === 3 ? "active" : ""}
                  onClick={() => handleLinkClick(3)}
                >
                  Multimedija
                </button>
              </Link>
            </div>
            <div className="line2"></div>
            {currentStep === 1 && (
              <div className="container1">
                <div className="info">
                  <Formik
                    initialValues={{
                      bookName: "",
                      shortSummary: "",
                      categories: "",
                      genres: "",
                      authors: "",
                      publisher: "",
                      year: "",
                      quantity: 0,
                      numOfPages: 0,
                      script: "",
                      binding: "",
                      format: "",
                      isbn: "",
                      fileName: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleConfirm}
                  >
                    <Form>
                      <label htmlFor="bookName">Naziv Knjige</label>
                      <Field
                        type="text"
                        id="bookName"
                        name="bookName"
                        className="input0"
                      />
                      <ErrorMessage
                        name="bookName"
                        component="div"
                        className="error"
                      />

                      <label htmlFor="categories">Kategorije</label>
                      <Field
                        type="text"
                        id="categories"
                        name="categories"
                        className="input0"
                      />
                      <ErrorMessage
                        name="categories"
                        component="div"
                        className="error"
                      />

                      <label htmlFor="genres">Žanrovi</label>
                      <Field
                        type="text"
                        id="genres"
                        name="genres"
                        className="input0"
                      />
                      <ErrorMessage
                        name="genres"
                        component="div"
                        className="error"
                      />
                      <div className="info2">
                        <label htmlFor="authors">Autori</label>
                        <Field
                          type="text"
                          id="authors"
                          name="authors"
                          className="input0"
                        />
                        <ErrorMessage
                          name="authors"
                          component="div"
                          className="error"
                        />

                        <label htmlFor="publisher">Izdavač</label>
                        <Field
                          type="text"
                          id="publisher"
                          name="publisher"
                          className="input0"
                        />
                        <ErrorMessage
                          name="publisher"
                          component="div"
                          className="error"
                        />

                        <label htmlFor="year">Godina Izdavanja</label>
                        <Field
                          type="text"
                          id="year"
                          name="year"
                          className="input0"
                        />
                        <ErrorMessage
                          name="year"
                          component="div"
                          className="error"
                        />

                        <label htmlFor="quantity">Količina</label>
                        <Field
                          type="number"
                          id="quantity"
                          name="quantity"
                          className="input0"
                        />
                        <ErrorMessage
                          name="quantity"
                          component="div"
                          className="error"
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
                    </Form>
                  </Formik>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="container2">
                <div className="info">
                  <label>Broj Stranica</label>
                  <input
                    type="number"
                    className="input0"
                    min="1"
                    value={numOfPages}
                    onChange={(e) => setNumOfPages(parseInt(e.target.value))}
                  />
                  <label>Pismo</label>
                  <select
                    className="input0"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                  >
                    <option> </option>
                    <option>Ćirilica</option>
                    <option>Latinica</option>
                  </select>
                  <label>Povez</label>
                  <select
                    className="input0"
                    value={binding}
                    onChange={(e) => setBinding(e.target.value)}
                  >
                    <option> </option>
                    <option>Meki</option>
                    <option>Tvrdi</option>
                  </select>
                  <label>Format</label>
                  <select
                    className="input0"
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
                    className="input0"
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
