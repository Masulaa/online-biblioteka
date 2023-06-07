
import "./BookDetails.css";
import "./table1.css"
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { HiOutlineArrowUturnUp, HiOutlineArrowPath } from 'react-icons/hi2';
import { FaRegHandScissors } from 'react-icons/fa';
import { BsThreeDotsVertical, BsCalendarCheck,BsArrowClockwise } from "react-icons/bs";
import {MdDoubleArrow} from "react-icons/md"
import NavBar from "../../navbars/navbar";
import { GiBckwardTime } from "react-icons/gi";

function BookMulti() {
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
          <div className="option" onClick={() => {
            navigate("/EvidentionOfBooks/BookDetails/");
          }}>
            Osnovni Detalji
          </div>
          <div className="option" onClick={() => {
            navigate("/EvidentionOfBooks/BookDetails/S");
      }}>
            Specifikacije
          </div>
          <div className="option" onClick={() => {
            navigate("/EvidentionOfBooks/BookDetails/E");
          }}>
            Evidencija Iznamljivanja
          </div>
          <div className="option1">
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
<div>
 
</div>
      </div>
    </div>

    <main>
    </main>
  </div>
</div>
);
}
export default BookMulti