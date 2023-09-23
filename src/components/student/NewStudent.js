import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import {Input} from "antd";

import DragDrop from "../dragdropupload/DragDrop";
import "./NewStudent.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NewStudent() {
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
            <h2 className="naslov">Novi Učenik</h2>
            <p class="breadcrumbs">
              <Link to="/StudentEvidention">
                <span className="paragraf">Evidencija Učenika</span>
              </Link>{" "}
              / Nova Knjiga
            </p>
          </div>

          <div>

            <div className="line2"></div>

              <div className="flex-columns">
                <div className="column">
                  <label>Ime</label>
                  <Input
                    
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Prezime</label>
                  <Input
                    
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <label>JMBG</label>
                  <Input
                    
                    onChange={(e) => setJMBG(e.target.value)}
                  />
                  <label>E-mail</label>
                  <Input
                    
                    onChange={(e) => setEmail(e.target.value)}
                  />
                   <label>Korisničko Ime</label>
                  <Input
                    
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Šifra</label>
                  <Input
                    
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Potvrdi Šifru</label>
                  <Input
                    
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
              </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewStudent;
