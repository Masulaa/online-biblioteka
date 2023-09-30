import React, { useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserService } from "../../api/api";

import { Input, message } from "antd";

import "./EditStudent.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditStudent() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [JMBG, setJMBG] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  const UpdateStudent = async () => {
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
      const response = await UserService.UpdateUser(newUserData, id);
      console.log("API Response", response);
      message.success("Učenik je uspješno izmijenjen");
      navigate("/StudentEvidention");
    } catch (error) {
      console.error("Greška pri ažuriranju učenika", error);
      message.error("Učenik nije izmijenjen");

      if (error.response && error.response.data) {
        const responseErrors = error.response.data;
        setErrors(responseErrors);
      } else {
        console.error("Nemoguće pristupiti podacima o grešci.");
      }
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
  };

  const navigate = useNavigate();

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
          <div className="headbar">
            <h2 className="naslov">Izmijeni Učenika</h2>
            <p className="breadcrumbs">
              <Link to="/StudentEvidention">
                <span className="paragraf">Evidencija Učenika</span>
              </Link>{" "}
              / Nova Knjiga
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
                      navigate("/StudentEvidention");
                    }}
                  >
                    Poništi
                  </button>
                  <button className="submit" onClick={UpdateStudent}>
                    Potvrdi
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

export default EditStudent;
