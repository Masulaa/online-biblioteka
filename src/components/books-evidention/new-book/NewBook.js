import React from "react";
import "./NewBook.css"
import "../EvidentionOfBooks.css";

import { GiHamburgerMenu} from 'react-icons/gi';
import { TbDashboard} from 'react-icons/tb';
import { AiOutlineProfile} from 'react-icons/ai';
import { MdPeopleAlt} from 'react-icons/md';
import { HiDocumentDuplicate} from 'react-icons/hi';
import { TbArrowsLeftRight} from 'react-icons/tb';
import { FiSettings} from 'react-icons/fi';

function NovaKnjiga(){

return(
    <html>
<head>
  <title>My Site</title>
  <link rel="stylesheet" type="text/css" href="main.css" />
</head>
<body>
  <header  className="header">
    <nav class="top-nav">
      <div class="logo">Biblioteka</div>
      <div class="profile">
        <button class="create-btn">Kreiraj</button>
        <div class="profile1"> 
        <div class="profile-tab"></div>
    </div>
      </div>
    </nav>
  </header>
  
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
            <input className="ks input0"></input>
            <label>Izaberite kategorije</label>
            <p>-Ovdje input-</p>
            <label>Izaberite Zanrove</label>
            <p>-Ovdje input-</p>
         </div>
         <div className="info2">
            <label>Izaberite autore</label>
            <p>-Ovdje input-</p>
            <label>Izdavac</label>
            <select>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
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
        <div className="line2"></div>
    </div>
    <aside>
   
   <nav class="side-nav">
     <ul className='lista'>
       <li><GiHamburgerMenu className="icon"/></li>
       <li><TbDashboard className="icon"/></li>
       <li><AiOutlineProfile className="icon"/></li>
       <li><MdPeopleAlt className="icon"/></li>
       <li><HiDocumentDuplicate className="icon"/></li>
       <li><AiOutlineProfile className="icon"/></li>
       <li><TbArrowsLeftRight className="icon"/></li>
     </ul>
     <span className='prav'>        </span>
       <div className='line'></div>
     <FiSettings className="settings"/>
   </nav>
 </aside>
 <main>
 </main>
</div>
</body>
</html>
)
}

export default NovaKnjiga;