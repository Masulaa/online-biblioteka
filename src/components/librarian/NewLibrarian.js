import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Input} from "antd";

import DragDrop from "../dragdropupload/DragDrop";
import "./NewLibrarian.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserService } from "../../api/api";

function NewLibrarian() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [JMBG, setJMBG] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const CreateLibrarian = async () => {
    try {
      const response = await UserService.CreateUser(newUserData);
      console.log("API Response", response);
      navigate("/LibrarianEvidention")
    } catch (error) {
      console.error("Error creating an librarian", error);
    }
  };

  const newUserData = {
    role_id: 1,
    name: name,
    surname: surname,
    jmbg: JMBG,
    email: email,
    username: username,
    password: password,
    password_confirmation: confirmPassword,
  }

  return (
    <Fragment>
        <div className="">
          <div class="headbar">
            <h2 className="naslov">Novi Bibliotekar</h2>
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
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                   <label>Korisničko Ime</label>
                  <Input
                    
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Šifra</label>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Potvrdi Šifru</label>
                  <Input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="buttons">
                    <button
                      className="cancel"
                      onClick={() => {
                        navigate("/LibrarianEvidention");
                      }}
                    >
                      Poništi
                    </button>
                    <button
                      className="submit"
                      onClick={CreateLibrarian}
                    >
                      Dalje
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </Fragment>
  );
}

export default NewLibrarian;