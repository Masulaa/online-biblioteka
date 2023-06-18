import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../navbars/navbar";
import "./NewAuthor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NewAuthor() {
  const [nameSurname, setNameSurname] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSadrzajChange = (value) => {
    setDescription(value);
  };

  const handleConfirm = () => {
    console.log("Ime i Prezime:", nameSurname);
    console.log("Opis:", description);
  };


  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  return (
    <Fragment>
      <NavBar />
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="main-content">
          <div className="Glavno">
            <h1 className="naslov1">Novi Autor</h1>
            <p>
              <Link to="/AuthorEvidention">
                <span className="paragraf">Evidencija Autora</span>
              </Link>{" "}
              / Novi Autor
            </p>
            <div className="line2"></div>
            <div className="info">
              <label>Ime i Prezime</label>
              <input
                className="input0"
                value={nameSurname}
                onChange={(e) => setNameSurname(e.target.value)}
              />
              <label>Opis</label>
              <ReactQuill
                value={description}
                onChange={handleSadrzajChange}
                className="input0"
              />
              <div className="info2a">
                <div className="buttons1">
                  <button className="submit" onClick={handleConfirm}>
                    Potvrdi
                  </button>
                  <button
                    className="cancel"
                    onClick={() => {
                      navigate("/AuthorEvidention");
                    }}
                  >
                    Poništi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewAuthor;
