import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DragDrop from "../dragdropupload/DragDrop";
import "./NewAuthor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NewAuthor() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  const [sadrzaj, setSadrzaj] = useState("");

  const handleSadrzajChange = (value) => {
    setSadrzaj(value);
  };


  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);


  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
          <div class="headbar">
            <h2 className="naslov">Novi Autor</h2>
            <p class="breadcrumbs">
              <Link to="/AuthorEvidention">
                <span className="paragraf">Evidencija Autora</span>
              </Link>{" "}
              / Nova Knjiga
            </p>
          </div>

          <div>

            <div className="line2"></div>

              <div className="flex-columns">
                <div className="column">
                  <label>Ime Autora</label>
                  <input
                    className="default-input"
                    onChange={(e) => setName(e.target.value)}
                  />
                   <label>Prezime Autora</label>
                  <input
                    className="default-input"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <label>Kratki sadržaj</label>
                  <ReactQuill
                    value={sadrzaj}
                    onChange={handleSadrzajChange}
                    className="quill-default-input"
                  />
                  <div className="buttons">
                    <button
                      className="cancel"
                      onClick={() => {
                        navigate("/AuthorEvidention");
                      }}
                    >
                      Poništi
                    </button>
                    <button
                      className="submit"
                    >
                      Dalje
                    </button>
                  </div>
                </div>
                <div className="column">
                  <DragDrop></DragDrop>
                </div>
              </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewAuthor;
