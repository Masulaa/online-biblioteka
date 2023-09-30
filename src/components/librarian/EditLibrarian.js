import React, { useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, message } from "antd";
import { UserService } from "../../api/api";
import "./EditLibrarian.css";

function EditLibrarian() {
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

  const { id } = useParams();

  const UpdateLibrarian = async () => {
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
      message.success("Bibliotekar je uspješno izmijenjen");
      navigate("/LibrarianEvidention");
    } catch (error) {
      console.error("Greška pri ažuriranju bibliotekara", error);
      message.error("Bibliotekar nije izmijenjen");

      if (error.response && error.response.data) {
        const responseErrors = error.response.data;
        setErrors(responseErrors);
      } else {
        console.error("Nemoguće pristupiti podacima o grešci.");
      }
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
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  <button className="submit" onClick={UpdateLibrarian}>
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

export default EditLibrarian;
