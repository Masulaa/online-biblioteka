import React, { Fragment } from "react";
import NavBar from "../../navbars/navbar";
import { Link } from "react-router-dom";
import "../EvidentionOfBooks.css";
import "../new-book/NewBook.css";
import "./EditBook.css";

function Specification(){
    return (
      <Fragment>
        <NavBar />
      
      <div class="main-content">
        <div className="Glavno">
          <h1>Izmjeni Knjigu</h1>
          <p><Link to="/EvidentionOfBooks"><span className="paragraf">Evidencija Knjiga</span></Link> / Izmjeni Knjigu</p>
            <div className="line2"></div>
             <div className="Stranica">
              <Link to="/EvidentionOfBooks/EditBook/BasicDetails"><p>Osnovne Detalji</p></Link>
              <Link to="/EvidentionOfBooks/EditBook/Specification"><p>Specifikacija</p></Link>
              <Link to="/EvidentionOfBooks/EditBook/Multimedia"><p>Multimedija</p></Link>
             </div>
             <div className="line2"></div>
             <div className="info">
                <label>Broj strana</label>
                <input type="number" className="input0"></input>
                <label>Pismo</label>
                <select className="input0">
                    <option></option>
                    <option>Ćirilica</option>
                    <option>Latinica</option>
                </select>
                <label>Povez</label> 
                <select className="input0">
                    <option></option>
                    <option>Tvrdi</option>
                    <option>Meki</option>
                </select>
                <label>Format</label>
                <select className="input0">
                    <option></option>
                    <option>A4</option>
                    <option>A5</option>
                    <option>A6</option>
                </select>
                <label>International Standard Book Num</label>
                <input type="number" minLength="13" min="1" className="input0"></input>
             </div>
            </div>

    </div>
    </Fragment>
    )
};

export default Specification;