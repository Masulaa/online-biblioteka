import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserService } from "../../api/api";

import { Input, message } from "antd";

import "./NewLibrarian.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NewLibrarian() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [JMBG, setJMBG] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const CreateLibrarian = async () => {
    try {
      message.destroy();
      if (
        !name ||
        !surname ||
        !JMBG ||
        !email ||
        !username ||
        !password ||
        !confirmPassword
      ) {
        setErrors({ allFieldsRequired: true });
        message.error("Sva polja su obavezna");
        return;
      }
      const response = await UserService.CreateUser(newUserData);
      console.log("API Response", response);
      message.success("Bibliotekar je uspješno kreiran");
      navigate("/LibrarianEvidention");
    } catch (error) {
      console.error("Error creating a librarian", error);
      message.error("Bibliotekar nije kreiran");
      setErrors(error.response.data.data);
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
  };

  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
          <div className="headbar">
            <h2 className="naslov">Novi Bibliotekar</h2>
            <p className="breadcrumbs">
              <Link to="/LibrarianEvidention">
                <span className="paragraf">Evidencija Bibliotekara</span>
              </Link>{" "}
              / Novi Bibliotekar
            </p>
          </div>

          <div>

            <div className="flex-columns">
              <div className="column">
                <label>Ime</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                {errors.allFieldsRequired ? (
                  <p className="error-text">Polje ime je obavezno.</p>
                ) : (
                  errors.name && <p className="error-text">{errors.name}</p>
                )}

                <label>Prezime</label>
                <Input
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                {errors.allFieldsRequired ? (
                  <p className="error-text">Polje prezime je obavezno.</p>
                ) : (
                  errors.surname && (
                    <p className="error-text">{errors.surname}</p>
                  )
                )}

                <label>JMBG</label>
                <Input
                  type="number"
                  min="0"
                  value={JMBG}
                  onChange={(e) => {
                    if (e.target.value.length <= 13) {
                      setJMBG(e.target.value);
                    }
                  }}
                />
                {errors.allFieldsRequired ? (
                  <p className="error-text">Polje JMBG je obavezno.</p>
                ) : (
                  errors.jmbg && <p className="error-text">{errors.jmbg}</p>
                )}

                <label>E-mail</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.allFieldsRequired ? (
                  <p className="error-text">Polje email je obavezno.</p>
                ) : (
                  errors.email && <p className="error-text">{errors.email}</p>
                )}

                <label>Korisničko Ime</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.allFieldsRequired ? (
                  <p className="error-text">Polje username je obavezno.</p>
                ) : (
                  errors.username && (
                    <p className="error-text">{errors.username}</p>
                  )
                )}

                <label>Šifra</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.allFieldsRequired ? (
                  <p className="error-text">Polje password je obavezno.</p>
                ) : (
                  errors.password && (
                    <p className="error-text">{errors.password}</p>
                  )
                )}

                <label>Potvrdi Šifru</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.allFieldsRequired ? (
                  <p className="error-text">
                    Polje password confirmation je obavezno.
                  </p>
                ) : (
                  errors.password_confirmation && (
                    <p className="error-text">{errors.password_confirmation}</p>
                  )
                )}

                <div className="buttons">
                  <button
                    className="cancel"
                    onClick={() => {
                      navigate("/LibrarianEvidention");
                    }}
                  >
                    Poništi
                  </button>
                  <button className="submit" onClick={CreateLibrarian}>
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

export default NewLibrarian;
