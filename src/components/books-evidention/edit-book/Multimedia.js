import React, { Fragment } from "react";
import "../EvidentionOfBooks.css";
import "../new-book/NewBook.css";
import "./EditBook.css";
import "../Drop-image/UploadDocument.css";
import { Link } from "react-router-dom";
import NavBar from "../../navbars/navbar";
// import UploadDocument from "../Drop-image/UploadDocument";
// import DropUpload from "../Drop-image/DropUpload";
import DragDrop from "../Drop-image/DragDrop";

function Multimedia() {
  return (
    <Fragment>
      <NavBar />
      <div class="main-content">
        <div className="Glavno">
          <h1>Izmjeni Knjigu</h1>
          <p>
            <Link to="/EvidentionOfBooks">Evidencija Knjiga</Link> / Izmjeni
            Knjigu
          </p>
          <div className="line2"></div>
          <div className="Stranica">
            <Link to="/EvidentionOfBooks/EditBook/BasicDetails">
              <p>Osnovne Detalji</p>
            </Link>
            <Link to="/EvidentionOfBooks/EditBook/Specification">
              <p>Specifikacija</p>
            </Link>
            <Link to="/EvidentionOfBooks/EditBook/Multimedia">
              <p>Multimedija</p>
            </Link>
          </div>
          <div className="line2"></div>
        </div>
      </div>
      <div className="Upload">
      <DragDrop/>
      </div>
    </Fragment>
  );
}

export default Multimedia;
