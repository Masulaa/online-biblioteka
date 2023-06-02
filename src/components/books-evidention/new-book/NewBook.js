import React, { Fragment, useState } from "react";
import "./NewBook.css"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import NavBar from "../../navbars/navbar";

function NovaKnjiga(){

  const [sadrzaj, setSadrzaj] = useState("");

  const handleSadrzajChange = (value) => {
    setSadrzaj(value);}

return(

  <Fragment>
 <NavBar/>
  
  <div class="main-content">
    <div className="Glavno">
      <h1>Nova Knjiga</h1>
        <p><a href="/">Evidencija Knjiga</a> / Nova knjiga</p>
        <div className="line2"></div>
         <div className="Stranica">
          <p>Osnovne Detalji</p>
          <p>Specifikacija</p>
          <p>Multimedija</p>
         </div>
        <div className="line2"></div>
         <div className="info">
            <label>Naziv Knjige</label>
            <input className="input0"></input>
            <label>Kratki sadrzaj</label>
            <ReactQuill
              value={sadrzaj}
              onChange={handleSadrzajChange}
              className="input0"
            />
            <label>Izaberite kategorije</label>
            <input className="input0"></input>
            <label>Izaberite Zanrove</label>
            <input className="input0"></input>
         </div>
         <div className="info2">
            <label>Izaberite autore</label>
            <select>
                <option>Ivo Andric</option>
                <option>Petar II Petrovic Njegos</option>
                <option>Mesa Selimovic</option>
                <option>Ivan Mazuranic</option>
            </select>
            <label>Izdavac</label>
            <select>
                <option>Dzoli</option>
                <option>Nova Knjiga</option>
                <option>Stara Knjiga</option>
                <option>Gradska Knjizara</option>
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
         </div>
    </div>
 <main>
 </main>
</div>
</Fragment>
)
}

export default NovaKnjiga;