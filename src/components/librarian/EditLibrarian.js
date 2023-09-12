import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DragDrop from "../dragdropupload/DragDrop";
import "./NewLibrarian.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditLibrarian() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [JMBG, setJMBG] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();


  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);


  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
          <div class="headbar">
            <h2 className="naslov">Izmjeni Bibliotekar</h2>
            <p class="breadcrumbs">
              <Link to="/LibrarianEvidention">
                <span className="paragraf">Evidencija Bibliotekara</span>
              </Link>{" "}
              / Novi Bibliotekar
            </p>
          </div>

          <div>

            <div className="line2"></div>

              <div className="flex-columns">
                <div className="column">
                  <label>Ime</label>
                  <input
                    className="default-input"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Prezime</label>
                  <input
                    className="default-input"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <label>JMBG</label>
                  <input
                    className="default-input"
                    onChange={(e) => setJMBG(e.target.value)}
                  />
                  <label>E-mail</label>
                  <input
                    className="default-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                   <label>Korisničko Ime</label>
                  <input
                    className="default-input"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Šifra</label>
                  <input
                    className="default-input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Potvrdi Šifru</label>
                  <input
                    className="default-input"
                    onChange={(e) => setPassword(e.target.value)}
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

export default EditLibrarian;
