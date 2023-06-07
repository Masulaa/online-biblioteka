import React, { Fragment, useState, useEffect } from "react";

import { useSelector } from "react-redux";


import "./MultimediaBook.css";
import "./NewBook.js";
import DragDrop from "../../dragdropupload/DragDrop";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../navbars/navbar";

function MultimediaBook() {
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedFileName = localStorage.getItem("fileName");
    if (savedFileName) setFileName(savedFileName);
  }, []);

  const handleConfirm = () => {
    console.log("Ime fajla:", fileName);
  };

  useEffect(() => {
    localStorage.setItem("fileName", fileName);
  }, [fileName]);

  const handleFileNameChange = (name) => {
    setFileName(name);
  };

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

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
        </div>
      </div>
      <div className="Upload">
        <DragDrop onFileUpload={(file) => handleFileNameChange(file.name)} />
      </div>
      <div className="buttons-multi">
        <button className="submit-multi" onClick={handleConfirm}>
          Potvrdi
        </button>
        <button className="cancel-multi" onClick={() => navigate("/EvidentionOfBooks")}>
          Poništi
        </button>
      </div>
      </div>
    </Fragment>
  );
}

export default MultimediaBook;