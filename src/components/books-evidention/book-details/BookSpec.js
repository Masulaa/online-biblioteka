import "./details.css";
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { HiOutlineArrowUturnUp, HiOutlineArrowPath } from 'react-icons/hi2';
import { FaRegHandScissors } from 'react-icons/fa';
import { BsThreeDotsVertical, BsCalendarCheck,BsArrowClockwise } from "react-icons/bs";
import {MdDoubleArrow} from "react-icons/md"
import { GiBckwardTime } from "react-icons/gi";

function BookSpec() {

  const navigate = useNavigate();

return (
<body>
      <header>
        <section class="header">
          <div class="Title">
            <h1>Nova Knjiga</h1>
            <p>
              <a href="/" className="tag">Evidencija Knjiga</a> &#160; / &#160; <a href="/" className="tag">Knjiga-467</a>
            </p>
          </div>
          <section class="Book">
            <button class="icon"><i class="fa-solid fa-arrow-turn-up" id="icon"></i>Otpisi knjigu</button>
            <button class="icon"><i class="fa-solid fa-hand-scissors" id="icon"></i>Izdaj knjigu</button>
            <button class="icon"><i class="fa-solid fa-arrows-rotate" id="icon"></i>Vrati knjigu</button>
            <button class="icon"><i class="fa-regular fa-calendar-check" id="icon"></i>Rezervisi</button>
            <span class="vertical">
              <button class="v-dots" id="dots"><BsThreeDotsVertical className="verical-dot"/></button>
            </span>
          </section>
        </section>
      </header>
      <main>
        <div class="column">
          <section class="option-wrapper">
          <ul class="option-container">
              <li class="option" onClick={() => {
                  navigate("/EvidentionOfBooks/BookDetails/");
                }}>
                <a href="#">Osnovni Detalji</a>
              </li>
              <li class="active" >
                <a href="">Specifikacije</a>
              </li>
              <li class="option"onClick={() => {
                  navigate("/EvidentionOfBooks/BookDetails/Evidention");
                }}>
                <a href="">Evidencija</a>
              </li>
              <li class="option" onClick={() => {
                  navigate("/EvidentionOfBooks/BookDetails/Multimedia");
                }}>
                <a href="">Multimedija</a>
              </li>
                </ul>
          </section>

          <section class="main">
            <div class="about-book">
              <div class="about">
                <p class="title">Broj strana </p>
                <p class="dummy">Dummy</p>
              </div>
              <div class="about">
                <p class="title">Pismo </p>
                <p class="dummy">Dummy</p>
              </div>
              <div class="about">
                <p class="title">Jezik</p>
                <p class="dummy">Dummy</p>
              </div>
              <div class="about">
                <p class="title">Povez</p>
                <p class="dummy">Dummy</p>
              </div>
              <div class="about">
                <p class="title">Format</p>
                <p class="dummy">Dummy</p>
              </div>
              <div class="about">
                <p class="title">International Standard Book Number (ISBN)</p>
                <p class="dummy">Dummy</p>
              </div>

            </div>
          </section>
        </div>


        <aside className="right-side">
          <section class="top-half">
            <div class="row" id="1">
              <p>Na raspolaganju: <a>2 primjeraka</a></p>
            </div>
            <div class="row" id="2">
              <p>Rezervisano: <a>2 primjeraka</a></p>
            </div>
            <div class="row" id="3">
              <p>Izdato: <a>2 primjeraka</a></p>
            </div>
            <div class="row" id="4">
              <p>U prekoracenju: <a>2 primjeraka</a></p>
            </div>
            <div class="row" id="5">
              <p>Ukupna kolicina: <a>2 primjeraka</a></p>
            </div>
          </section>

          <section class="bot-half">
            <div class="history">
              <p class="history-title">Izdavanje Knjige - 4 days ago</p>
              <p class="history-details"><a href="#">Valentina K.</a> je izdala knjigu <a href="#">Petru P.</a> dana
                13.10.2023</p>
              <a class="history-more">Pogledaj Detalje<i class="fa-solid fa-angles-right"></i></a>
            </div>

            <div class="history">
              <p class="history-title">Izdavanje Knjige - 4 days ago</p>
              <p class="history-details"><a href="#">Valentina K.</a> je izdala knjigu <a href="#">Petru P.</a> dana
                13.10.2023</p>
              <a class="history-more">Pogledaj Detalje<i class="fa-solid fa-angles-right"></i></a>
            </div>

            <div class="history">
              <p class="history-title">Izdavanje Knjige - 4 days ago</p>
              <p class="history-details"><a href="#">Valentina K.</a> je izdala knjigu <a href="#">Petru P.</a> dana
                13.10.2023</p>
              <a class="history-more">Pogledaj Detalje<i class="fa-solid fa-angles-right"></i></a>
            </div>

            <a class="history-show-all">Prikazi Sve <i class="fa-solid fa-angles-right"></i></a>
          </section>

        </aside>

      </main>
    </body>
);
}
export default BookSpec