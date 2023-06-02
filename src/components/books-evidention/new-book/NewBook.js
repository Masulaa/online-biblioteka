import React, { useState } from "react";
import "./NewBook.css";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


function NovaKnjiga() {
  const [sadrzaj, setSadrzaj] = useState("");

  const handleSadrzajChange = (value) => {
    setSadrzaj(value);
  };

  const [activeLink, setActiveLink] = useState("Osnovni Detalji");

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
      <div>
        <div>
        <header className="header">
      <div className="title">Nova Knjiga</div>
      <div className="subtitle">Evidencije Knjige / Nova Knjiga</div>
      <div className="nav-links">
        <div
          className={`nav-link ${activeLink === "Osnovni Detalji" ? "active" : ""}`}
          onClick={() => handleClick("Osnovni Detalji")}
        >
          Osnovni Detalji
        </div>
        <div
          className={`nav-link ${activeLink === "Specifikacije" ? "active" : ""}`}
          onClick={() => handleClick("Specifikacije")}
        >
          Specifikacije
        </div>
        <div
          className={`nav-link ${activeLink === "Multimedija" ? "active" : ""}`}
          onClick={() => handleClick("Multimedija")}
        >
          Multimedija
        </div>
      </div>
    </header>
        <div>
          <div>
            <label>Naziv Knjige</label>
            <input/>
            <label>Kratki sadržaj</label>
            <ReactQuill
              value={sadrzaj}
              onChange={handleSadrzajChange}
            />
            <label>Izaberite kategorije</label>
            <select>Drama</select>
            <label>Izaberite Žanrove</label>
            <select>Akcija</select>
          </div>
          <div>
            <label>Izaberite autore</label>
            <select>Lukijan Musicki</select>
            <label>Izdavač</label>
            <select>
              <option>Nova Knjiga</option>
              <option>Dzoli</option>
              <option>Sarajevo</option>
              <option>Mlada Nik</option>
            </select>
            <label>Godina Izdavanja</label>
            <select>
              <option> </option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
              <option>2014</option>
              <option>2013</option>
              <option>2012</option>
              <option>2011</option>
              <option>2010</option>
            </select>
          </div></div>
          <div></div>
          <div>
            <button>Poništi</button>
            <button>Sačuvaj</button>
          </div>
        </div>
      </div>

  );
}

export default NovaKnjiga;
