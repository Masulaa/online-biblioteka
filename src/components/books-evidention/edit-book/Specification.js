import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../../navbars/navbar";
import "./EditBook.css";
import "./Specification.css"
import "react-quill/dist/quill.snow.css";

function Specification() {
  const [numOfPages, setNumOfPages] = useState(0);
  const [script, setScript] = useState("");
  const [binding, setBinding] = useState("");
  const [format, setFormat] = useState("");
  const [isbn, setIsbn] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedNumOfPages = localStorage.getItem("numOfPages");
    const savedScript = localStorage.getItem("script");
    const savedBinding = localStorage.getItem("binding");
    const savedFormat = localStorage.getItem("format");
    const savedIsbn = localStorage.getItem("isbn");

    if (savedNumOfPages) setNumOfPages(parseInt(savedNumOfPages));
    if (savedScript) setScript(savedScript);
    if (savedBinding) setBinding(savedBinding);
    if (savedFormat) setFormat(savedFormat);
    if (savedIsbn) setIsbn(savedIsbn);
  }, []);

  useEffect(() => {
    localStorage.setItem("numOfPages", numOfPages.toString());
    localStorage.setItem("script", script);
    localStorage.setItem("binding", binding);
    localStorage.setItem("format", format);
    localStorage.setItem("isbn", isbn);
  }, [numOfPages, script, binding, format, isbn]);

  const handleConfirm = () => {
    console.log("Broj stranica:", numOfPages);
    console.log("Pismo:", script);
    console.log("Povez:", binding);
    console.log("Format:", format);
    console.log("ISBN:", isbn);
  };

  return (
    <Fragment>
      <NavBar />

      <div className="main-content">
        <div className="Glavno">
          <h1 className="naslov1">Izmjeni Knjigu</h1>
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
            <label>Broj stranica</label>
            <input
              type="number"
              className="input0"
              value={numOfPages}
              onChange={(e) => setNumOfPages(parseInt(e.target.value))}
            />
            <label>Pismo</label>
            <select
              className="input0"
              value={script}
              onChange={(e) => setScript(e.target.value)}
            >
              <option></option>
              <option>Ćirilica</option>
              <option>Latinica</option>
            </select>
            <label>Povez</label>
            <select
              className="input0"
              value={binding}
              onChange={(e) => setBinding(e.target.value)}
            >
              <option></option>
              <option>Tvrdi</option>
              <option>Meki</option>
            </select>
            <label>Format</label>
            <select
              className="input0"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option></option>
              <option>A4</option>
              <option>A5</option>
              <option>A6</option>
            </select>
            <label>International Standard Book Num</label>
            <input
              type="number"
              minLength="13"
              min="1"
              className="input0"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>
          <div className="buttons-spec">
            <button className="submit" onClick={handleConfirm}>
              Potvrdi
            </button>
            <button className="cancel" onClick={() => navigate("/EvidentionOfBooks")}>
              Poništi
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Specification;
