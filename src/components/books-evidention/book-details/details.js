
import "./details.css";
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { HiOutlineArrowUturnUp, HiOutlineArrowPath } from 'react-icons/hi2';
import { FaRegHandScissors } from 'react-icons/fa';
import { BsThreeDotsVertical, BsCalendarCheck,BsArrowClockwise } from "react-icons/bs";
import {MdDoubleArrow} from "react-icons/md"
import NavBar from "../../navbars/navbar";
import { GiBckwardTime } from "react-icons/gi";


function BookDetails() {
  const navigate = useNavigate();

return (
<div>
<NavBar />
<div className="main-content">
    <div className="Glavno">
      <div className="header2">
        <div>
          <h1>Nova Knjiga</h1>
          <p>
            <a href="/" className="tag">Evidencija Knjiga</a> &#160; / &#160; <a href="/" className="tag">Knjiga-467</a>
          </p>
        </div>
<Link></Link>
        <div className="icons">
          <button className="icon1"><HiOutlineArrowUturnUp />Otpisi knjigu</button>
          <button className="icon1"><FaRegHandScissors />Izdaj knjigu</button>
          <button className="icon1"><HiOutlineArrowPath />Vrati knjigu</button>
          <button className="icon1"><BsCalendarCheck />Rezervisi knjigu</button>
          
          <button className="icon1" id="icon2"> <div className="vertical" /><BsThreeDotsVertical /></button>
        </div>
      </div>

      <div className="options-container">
        <div className="line-above" />
        <div className="options">
          <div className="option1">
            Osnovni Detalji
          </div>
          <div className="option"  onClick={() => {
            navigate("/EvidentionOfBooks/BookDetails/S");
          }}>
            Specifikacije
          </div>
          <div className="option" onClick={() => {
            navigate("/EvidentionOfBooks/BookDetails/E");
          }}>
            Evidencija Iznamljivanja
          </div>
          <div className="option" onClick={() => {
            navigate("/EvidentionOfBooks/BookDetails/M");
          }}>
            Multimedija
          </div>
        </div>
      </div>
      <div className="line-below" />

      <div className="main-details">
        <div className="vertical2">
          <div className="status">
          <div className="row"><p>Na raspolaganju:</p><a>2 primjeraka</a></div>
          <div className="row"><p>Rezervisano:</p><a>2 primjeraka</a></div>
          <div className="row"><p>Izdato:</p><a>2 primjeraka</a></div>
          <div className="row"><p>U prekoracenju:</p><a>2 primjeraka</a></div>
          <div className="row"><p>Ukupna kolicina:</p><a>2 primjeraka</a></div>
          <div className="horizontal2">
          </div>


</div>  

<div className="something">
          <p className="history">IZDAVANJE KNJIGE - 4 days ago</p>
        
            <a className="bibliotekar" href="bibliotekar">Valentina K.</a> je izdala knjigu <a href="risbo">Risbu</a>
            <p className="date">dana 13.10.2023</p>
            <a>Pogledaj Detalje</a><MdDoubleArrow className="icon9"></MdDoubleArrow>
          </div>   
           <div className="something">
          <p className="history">IZDAVANJE KNJIGE - 4 days ago</p>
        
            <a className="bibliotekar" href="bibliotekar">Valentina K.</a> je izdala knjigu <a href="risbo">Risbu</a>
            <p className="date">dana 13.10.2023</p>
            <a>Pogledaj Detalje</a><MdDoubleArrow className="icon9"></MdDoubleArrow>
          </div>   
           <div className="something">
          <p className="history">IZDAVANJE KNJIGE - 4 days ago</p>
        
            <a className="bibliotekar" href="bibliotekar">Valentina K.</a> je izdala knjigu <a href="risbo">Risbu</a>
            <p className="date">dana 13.10.2023</p>
            <a>Pogledaj Detalje</a><MdDoubleArrow className="icon9"></MdDoubleArrow>
          </div>
           <a className="more2"> <BsArrowClockwise/>Prikazi&#160;Sve</a>

</div>
<div className="str">
<div>
  <p className="main-site-detail">Naziv knjige</p>
  <p>Dummy</p>
  <p className="main-site-detail">Kategorija</p>
  <p>Dummy</p>
  <p className="main-site-detail">Zanr</p>
  <p>Dummy</p>
  <p className="main-site-detail">Autor/ri</p>
  <p>Dummy</p>
  <p className="main-site-detail">Izdavac</p>
  <p>Dummy</p>
  <p className="main-site-detail">Godina izdavanja</p>
  <p>Dummy</p>
</div>

<div className="text-limit">Once upon a time in the vibrant city of Rainbowville, there lived a charismatic and openly gay man named Boris. Affectionately known as Risbo, he became an iconic figure in the community, radiating love, acceptance, and pride wherever he went. 
Risbo's journey towards self-discovery and embracing his true identity was not without its challenges. Growing up in a small town where LGBTQ+ acceptance was limited, he knew that he had to find a place where he could truly be himself. With unwavering courage, Risbo made the decision to move to Rainbowville, a city renowned for its inclusivity and diversity.
From the moment he arrived in Rainbowville, Risbo's vibrant personality and infectious laughter captured the hearts of the community. He quickly became a beloved figure, admired by both friends and strangers alike. His quick wit and fabulous sense of style made him a source of inspiration for many, as they saw in him the embodiment of authenticity and self-expression.
Risbo's creativity knew no bounds. He had a knack for organizing extravagant parties that would leave everyone in awe. His energy and enthusiasm were infectious, making every event he planned an unforgettable experience. From rainbow-themed decorations to dazzling performances, Risbo had a way of turning any occasion into a celebration of love and acceptance.
But it wasn't just the parties that made Risbo a cherished member of the community. He was also a mentor and role model for younger LGBTQ+ individuals, offering support and guidance to those still on their journey of self-discovery. He understood the struggles they faced and was always there to lend a helping hand or a listening ear.
Risbo's passion for equality and social justice extended far beyond the borders of Rainbowville. He dedicated his time and efforts to working with local LGBTQ+ organizations, advocating for equal rights and fighting against discrimination. Risbo's voice resonated not only within the city but also throughout the region, as he fearlessly spoke out against injustice and rallied others to join him in the fight for a more inclusive society.
</div>
</div>
      </div>

    </div>

    <main>

    </main>
    
  </div>
  
</div>
);
}
export default BookDetails