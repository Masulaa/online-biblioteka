import "./details.css";
import "./table.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowUturnUp, HiOutlineArrowPath } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import { GiBckwardTime } from "react-icons/gi";
import {
  BsThreeDotsVertical,
  BsCalendarCheck,
  BsArrowClockwise,
} from "react-icons/bs";

const data = [
  {
    id: 1,
    ucenik: "Ime Prezime",
    izdavanje: "01.01.2023",
    vracanje:"01.01.2023",
    prekoracenjeDanima:"60 dana",
    zadrzavanje: "2 mjeseca",
    izdao: "Petar Petrovic",
    primio:"Petar Petrovic",
    rezervacija:"31.04.2023",
    isticajRezervacije:"31.05.2023",
    podnioRezervaciju:"Petar Petrovic",
    status:"Izdato",
    soon:"soon"
  },
  {
    id: 2,
    ucenik: "Ime Prezime",
    izdavanje: "01.01.2023",
    vracanje:"01.01.2023",
    prekoracenjeDanima:"60 dana",
    zadrzavanje: "2 mjeseca",
    izdao: "Petar Petrovic",
    primio:"Petar Petrovic",
    rezervacija:"31.04.2023",
    isticajRezervacije:"31.05.2023",
    podnioRezervaciju:"Petar Petrovic",
    status:"Izdato",
    soon:"soon"

  },
];

function BookEvid() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectAll = (event) => {
    setSelectedAll(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  const handleLinkClick = (step) => {
    setCurrentStep(step);
  };
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
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
    <body>
      <header>
        <section class="header">
          <div class="Title">
            <h1>Nova Knjiga</h1>
            <p>
              <a href="/" className="tag">
                Evidencija Knjiga
              </a>{" "}
              &#160; / &#160;{" "}
              <a href="/" className="tag">
                Knjiga-467
              </a>
            </p>
          </div>
          <section class="Book">
            <button class="icon">
              <i class="fa-solid fa-arrow-turn-up" id="icon"></i>Otpisi knjigu
            </button>
            <button class="icon">
              <i class="fa-solid fa-hand-scissors" id="icon"></i>Izdaj knjigu
            </button>
            <button class="icon">
              <i class="fa-solid fa-arrows-rotate" id="icon"></i>Vrati knjigu
            </button>
            <button class="icon">
              <i class="fa-regular fa-calendar-check" id="icon"></i>Rezervisi
            </button>
            <span class="vertical">
              <button class="v-dots" id="dots">
                <BsThreeDotsVertical className="verical-dot" />
              </button>
            </span>
          </section>
        </section>
      </header>
      <main>
        <div class="column">
          <section class="option-wrapper">
            <ul class="option-container">
              <li
                class="option"
                onClick={() => {
                  navigate("/EvidentionOfBooks/BookDetails/");
                }}
              >
                <a href="#">Osnovni Detalji</a>
              </li>
              <li
                class="option"
                onClick={() => {
                  navigate("/EvidentionOfBooks/BookDetails/Specification");
                }}
              >
                <a href="">Specifikacije</a>
              </li>
              <li class="active">
                <a href="">Evidencija</a>
              </li>
              <li
                class="option"
                onClick={() => {
                  navigate("/EvidentionOfBooks/BookDetails/Multimedia");
                }}
              >
                <a href="">Multimedija</a>
              </li>
            </ul>
          </section>
          <section className="select-table">
          <Link className="table-link">
    <button
      className={`toggle-btn ${
        currentStep === 1 ? "active" : ""
      }`}
      onClick={() => handleLinkClick(1)}
    >
      Izdate Knjige
    </button>
  </Link >
  <Link className="table-link">
    <button
      className={`toggle-btn ${
        currentStep === 2 ? "active" : ""
      }`}
      onClick={() => handleLinkClick(2)}
    >
      Vracanje Knjige
    </button>
  </Link>
  <Link className="table-link">
    <button
      className={`toggle-btn ${
        currentStep === 3 ? "active" : ""
      }`}
      onClick={() => handleLinkClick(3)}
    >
      Knjige u prekoracenju
    </button>
  </Link>
  <Link className="table-link">
    <button
      className={`toggle-btn ${
        currentStep === 4 ? "active" : ""
      }`}
      onClick={() => handleLinkClick(4)}
    >
      Aktivne Rezervacije
    </button>
  </Link>
  <Link className="table-link">
    <button
      className={`toggle-btn ${
        currentStep === 5 ? "active" : ""
      }`}
      onClick={() => handleLinkClick(5)}
    >
      Arhivirane Rezervacije
    </button>
  </Link>
          </section>

             {currentStep === 1 && (
          <div>   <section class="tabela">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Izdato uceniku</th>
                <th>Datum Izdavanja</th>
                <th>Trenutno zadrzavanje knjige </th>
                <th>Knjigu Izdao</th>
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
                  <td className="td">{item.ucenik}</td>
                  <td className="td">{item.izdavanje}</td>
                  <td className="td">{item.zadrzavanje}</td>
                  <td className="td">{item.izdao}</td>
                  <td className="options2 td">
                    <div className="dropdown">
                      <div className="dots">&#x2026;</div>
                      <div className="dropdown-content">
                        <div>Obriši</div>
                        <div
                          onClick={() => {
                            navigate("/EvidentionOfBooks/EditBook/BookDetails");
                          }}
                        >
                          Izmijeni
                        </div>
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
            <select
              className="inputs"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </section>
</div>
          )}
             {currentStep === 2 && (
          <div>   <section class="tabela">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Izdato uceniku</th>
                <th>Datum Izdavanja</th>
                <th>Datum Vracanja</th>
                <th>Zadrzavanje knjige </th>
                <th>Knjigu Primio</th>
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
                  <td className="td">{item.ucenik}</td>
                  <td className="td">{item.izdavanje}</td>
                  <td className="td">{item.vracanje}</td>
                  <td className="td">{item.zadrzavanje}</td>
                  <td className="td">{item.izdao}</td>
                  <td className="options2 td">
                    <div className="dropdown">
                      <div className="dots">&#x2026;</div>
                      <div className="dropdown-content">
                        <div>Obriši</div>
                        <div
                          onClick={() => {
                            navigate("/EvidentionOfBooks/EditBook/BookDetails");
                          }}
                        >
                          Izmijeni
                        </div>
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
            <select
              className="inputs"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </section>
</div>
          )}
             {currentStep === 3 && (
          <div>   <section class="tabela">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Datum Izdavanja</th>
                <th>Izdato uceniku</th>
                <th>Prekoracenje u danima </th>
                <th>Trenutno zadrzavanje knjige</th>
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
                  <td className="td">{item.izdavanje}</td>
                  <td className="td">{item.ucenik}</td>
                  <td className="td">{item.prekoracenjeDanima}</td>
                  <td className="td">{item.zadrzavanje}</td>
                  <td className="options2 td">
                    <div className="dropdown">
                      <div className="dots">&#x2026;</div>
                      <div className="dropdown-content">
                        <div>Obriši</div>
                        <div
                          onClick={() => {
                            navigate("/EvidentionOfBooks/EditBook/BookDetails");
                          }}
                        >
                          Izmijeni
                        </div>
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
            <select
              className="inputs"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </section>
</div>
          )}
             {currentStep === 4 && (
          <div>   <section class="tabela">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Datum Rezervacije</th>
                <th>Rezervacija Istice</th>
                <th>Podnio Rezervaciju</th>
                <th>Status</th>
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
                  <td className="td">{item.rezervacija}</td>
                  <td className="td">{item.isticajRezervacije}</td>
                  <td className="td">{item.podnioRezervaciju}</td>
                  <td className="td">{item.soon}</td>
                  <td className="options2 td">
                    <div className="dropdown">
                      <div className="dots">&#x2026;</div>
                      <div className="dropdown-content">
                        <div>Obriši</div>
                        <div
                          onClick={() => {
                            navigate("/EvidentionOfBooks/EditBook/BookDetails");
                          }}
                        >
                          Izmijeni
                        </div>
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
            <select
              className="inputs"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </section>
</div>
          )}
             {currentStep === 5 && (
          <div>   <section class="tabela">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Datum Rezervacije</th>
                <th>Rezervacija Istice</th>
                <th>Podnio Rezervaciju</th>
                <th>Status</th>
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
                  <td className="td">{item.rezervacija}</td>
                  <td className="td">{item.isticajRezervacije}</td>
                  <td className="td">{item.podnioRezervaciju}</td>
                  <td className="td">{item.status}</td>
                  <td className="options2 td">
                    <div className="dropdown">
                      <div className="dots">&#x2026;</div>
                      <div className="dropdown-content">
                        <div>Obriši</div>
                        <div
                          onClick={() => {
                            navigate("/EvidentionOfBooks/EditBook/BookDetails");
                          }}
                        >
                          Izmijeni
                        </div>
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
            <select
              className="inputs"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </section>
</div>
          )}
        </div>

       














        <aside className="right-side">
          <section class="top-half">
            <div class="row" id="1">
              <p>
                Na raspolaganju: <a>2 primjeraka</a>
              </p>
            </div>
            <div class="row" id="2">
              <p>
                Rezervisano: <a>2 primjeraka</a>
              </p>
            </div>
            <div class="row" id="3">
              <p>
                Izdato: <a>2 primjeraka</a>
              </p>
            </div>
            <div class="row" id="4">
              <p>
                U prekoracenju: <a>2 primjeraka</a>
              </p>
            </div>
            <div class="row" id="5">
              <p>
                Ukupna kolicina: <a>2 primjeraka</a>
              </p>
            </div>
          </section>

          <section class="bot-half">
            <div class="history">
              <p class="history-title">Izdavanje Knjige - 4 days ago</p>
              <p class="history-details">
                <a href="#">Valentina K.</a> je izdala knjigu{" "}
                <a href="#">Petru P.</a> dana 13.10.2023
              </p>
              <a class="history-more">
                Pogledaj Detalje<i class="fa-solid fa-angles-right"></i>
              </a>
            </div>

            <div class="history">
              <p class="history-title">Izdavanje Knjige - 4 days ago</p>
              <p class="history-details">
                <a href="#">Valentina K.</a> je izdala knjigu{" "}
                <a href="#">Petru P.</a> dana 13.10.2023
              </p>
              <a class="history-more">
                Pogledaj Detalje<i class="fa-solid fa-angles-right"></i>
              </a>
            </div>

            <div class="history">
              <p class="history-title">Izdavanje Knjige - 4 days ago</p>
              <p class="history-details">
                <a href="#">Valentina K.</a> je izdala knjigu{" "}
                <a href="#">Petru P.</a> dana 13.10.2023
              </p>
              <a class="history-more">
                Pogledaj Detalje<i class="fa-solid fa-angles-right"></i>
              </a>
            </div>

            <a class="history-show-all">
              Prikazi Sve <i class="fa-solid fa-angles-right"></i>
            </a>
          </section>
        </aside>
      </main>
    </body>
  );
}
export default BookEvid;

