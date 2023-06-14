import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../navbars/navbar";
import "./NewLibrarian.css";
import "react-quill/dist/quill.snow.css";
import DragDrop from "../dragdropupload/DragDrop";

function NewLibrarian() {
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

  useEffect(() => {
    const savedNameSurname = localStorage.getItem("nameSurname");
    const savedUserType = localStorage.getItem("userType");
    const savedJmbg = localStorage.getItem("jmbg");
    const savedEmail = localStorage.getItem("email");
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    const savedConfirmPassword = localStorage.getItem("confirmPassword");
    const savedFileName = localStorage.getItem("fileName");

    if (savedNameSurname) setNameSurname(savedNameSurname);
    if (savedUserType) setUserType(savedUserType);
    if (savedJmbg) setJmbg(savedJmbg);
    if (savedEmail) setEmail(savedEmail);
    if (savedUsername) setUsername(savedUsername);
    if (savedPassword) setPassword(savedPassword);
    if (savedConfirmPassword) setConfirmPassword(savedConfirmPassword);
    if (savedFileName) setFileName(savedFileName);
  }, []);

  useEffect(() => {
    localStorage.setItem("nameSurname", nameSurname);
    localStorage.setItem("userType", userType);
    localStorage.setItem("jmbg", jmbg);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("confirmPassword", confirmPassword);
    localStorage.setItem("fileName", fileName);
  }, [
    nameSurname,
    userType,
    jmbg,
    email,
    username,
    password,
    confirmPassword,
    fileName,
  ]);

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  return (
    <Fragment>
      <NavBar />
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="main-content">
          <div className="Glavno">
            <h1 className="naslov1">Novi Bibliotekar</h1>
            <p>
              <Link to="/LibrarianEvidention">
                <span className="paragraf">Svi Bibliotekari</span>
              </Link>{" "}
              / Novi Bibliotekar
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
                <option>Bibliotekar</option>
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
                    navigate("/LibrarianEvidention");
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

export default NewLibrarian;
