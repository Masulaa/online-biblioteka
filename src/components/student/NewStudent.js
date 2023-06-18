import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../navbars/navbar";
import "./NewStudent.css";
import "react-quill/dist/quill.snow.css";
import DragDrop from "../dragdropupload/DragDrop";

function NewStudent() {
  const [nameSurname, setNameSurname] = useState("");
  const [userType, setUserType] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const [sadrzaj, setSadrzaj] = useState("");

  const handleSadrzajChange = (value) => {
    setSadrzaj(value);
  };

  const handleConfirm = () => {
    console.log("Ime i prezime:", nameSurname);
    console.log("Tip korisnika:", userType);
    console.log("JMBG:", jmbg);
    console.log("E-mail:", email);
    console.log("Korisničko ime:", username);
    console.log("Lozinka:", password);
    console.log("Potvrda lozinke:", confirmPassword);
    console.log("Slika:", fileName);
  };

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  return (
    <Fragment>
      <NavBar />
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="main-content">
          <div className="Glavno">
            <h1 className="naslov1">Novi Ucenik</h1>
            <p>
              <Link to="/StudentEvidention">
                <span className="paragraf">Svi Ucenici</span>
              </Link>{" "}
              / Novi Ucenik
            </p>
            <div className="line2"></div>
            <div className="info">
              <label>Ime i Prezime</label>
              <input
                className="input0"
                value={nameSurname}
                onChange={(e) => setNameSurname(e.target.value)}
              />
              <label>Tip korisnika</label>
              <select
                className="input0"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option> </option>
                <option>Ucenik</option>
                <option>Nastavnik</option>
                <option>Roditelj</option>
              </select>
              <label>JMBG</label>
              <input
                type="number"
                minLength="13"
                className="input0"
                value={jmbg}
                onChange={(e) => setJmbg(e.target.value)}
              />
              <label>E-mail</label>
              <input
                type="email"
                className="input0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Korisničko ime</label>
              <input
                className="input0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Lozinka</label>
              <input
                type="password"
                className="input0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Potvrdi lozinku</label>
              <input
                type="password"
                className="input0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="info2">
              <DragDrop />
              <div className="buttons">
                <button className="submit" onClick={handleConfirm}>
                  Potvrdi
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    navigate("/StudentEvidention");
                  }}
                >
                  Poništi
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
