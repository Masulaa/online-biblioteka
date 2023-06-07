
import "./details.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { HiOutlineArrowUturnUp, HiOutlineArrowPath } from 'react-icons/hi2';
import { FaRegHandScissors } from 'react-icons/fa';
import { BsThreeDotsVertical, BsCalendarCheck,BsArrowClockwise } from "react-icons/bs";
import {MdDoubleArrow} from "react-icons/md"
import NavBar from "../../navbars/navbar";
import { GiBckwardTime } from "react-icons/gi";

const data = [
  { id: 1, naziv: 'Knjiga 1', autor: 'Autor 1', kategorija: 'Kategorija 1', naRaspolaganju: 5, rezervisano: 2, izdate: 3, uPrekoracenju: 0, ukupnaKolicina: 10 },
  { id: 2, naziv: 'Knjiga 2', autor: 'Autor 2', kategorija: 'Kategorija 2', naRaspolaganju: 3, rezervisano: 1, izdate: 2, uPrekoracenju: 1, ukupnaKolicina: 7 },
];

function BookEvid() {
  const navigate = useNavigate();
const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectAll = (event) => {
    setSelectedAll(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(data.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const renderLeftArrow = () => {
    if (currentPage !== 1) {
      return (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          &larr;
        </button>
      );
    }
    return null;
  };
  const renderRightArrow = () => {
    if (currentPage !== totalPages) {
      return (
        <button onClick={() => handlePageChange(currentPage + 1)}>
          &rarr;
        </button>
      );
    }
    return null;
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); 
  };

  
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
          <div className="option1" >
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
<div>
 
</div>
      </div>
      <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectedAll} onChange={handleSelectAll} />
            </th>
            <th>Naziv knjige</th>
            <th>Autor</th>
            <th>Kategorija</th>
            <th>Na raspolaganju</th>
            <th>Rezervisano</th>
            <th>Izdate</th>
            <th>U prekoračenju</th>
            <th>Ukupna količina</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="td">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </td>
              <td className="td">{item.naziv}</td>
              <td className="td">{item.autor}</td>
              <td className="td">{item.kategorija}</td>
              <td className="td">{item.naRaspolaganju}</td>
              <td className="td">{item.rezervisano}</td>
              <td className="td">{item.izdate}</td>
              <td className="td">{item.uPrekoracenju}</td>
              <td className="td">{item.ukupnaKolicina}</td>
              <td className="options2 td">
                <div className="dropdown">
                  <div className="dots">&#x2026;</div>
                  <div className="dropdown-content">
                    <div>Obriši</div>
                    <div onClick={()=>{navigate('/EvidentionOfBooks/EditBook/BookDetails')}}>Izmijeni</div>
                    <div>Izdaj knjigu</div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {renderLeftArrow()}
        {renderPageNumbers()}
        {renderRightArrow()}
      </div>
      <div className="rows-per-page">
        <span>Rows per page:</span>
        <select className='inputs' value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
    </div>

    <main>
    </main>
  </div>
</div>
);
}
export default BookEvid