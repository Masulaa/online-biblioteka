import React from "react";
import "../EvidentionOfBooks.css";
import "../new-book/NewBook.css";
import "./EditBook.css";

import { GiHamburgerMenu} from 'react-icons/gi';
import { TbDashboard} from 'react-icons/tb';
import { AiOutlineProfile} from 'react-icons/ai';
import { MdPeopleAlt} from 'react-icons/md';
import { HiDocumentDuplicate} from 'react-icons/hi';
import { TbArrowsLeftRight} from 'react-icons/tb';
import { FiSettings} from 'react-icons/fi';
import { Link } from "react-router-dom";

function Specification(){
    return (
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
          <h1>Izmjeni Knjigu</h1>
          <p><Link to="/EvidentionOfBooks">Evidencija Knjiga</Link> / Izmjeni Knjigu</p>
            <div className="line2"></div>
             <div className="Stranica">
              <Link to="/EvidentionOfBooks/EditBook/BasicDetails"><p>Osnovne Detalji</p></Link>
              <Link to="/EvidentionOfBooks/EditBook/Specification"><p>Specifikacija</p></Link>
              <Link to="/EvidentionOfBooks/EditBook/Multimedia"><p>Multimedija</p></Link>
             </div>
             <div className="line2"></div>
             <div>
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
         <span className='prav'>       </span>
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
};

export default Specification;