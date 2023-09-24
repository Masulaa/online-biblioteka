import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserService
 } from "../../api/api";

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

  const CreateStudent = async () => {
    try {
      const response = await UserService.CreateUser(newUserData);
      console.log("API Response", response);
      navigate("/StudentEvidention")
    } catch (error) {
      console.error("Error creating an student", error);
    }
  };

  const newUserData = {
    role_id: 2,
    name: name,
    surname: surname,
    jmbg: JMBG,
    email: email,
    username: username,
    password: password,
    password_confirmation: confirmPassword,
  }

  const navigate = useNavigate();


  return (
    <Fragment>
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
                        navigate("/StudentEvidention");
                      }}
                    >
                      Poništi
                    </button>
                    <button
                      className="submit"
                      onClick={CreateStudent}
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

export default NewStudent;