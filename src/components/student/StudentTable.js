import React, { useState } from 'react';
import './StudentTable.css';
import { useNavigate } from 'react-router-dom';

const data = [
  { id: 1, imeprezime: 'Pero Perovic', email: 'pero.perovic@domain.net', tipKorisnika: 'Ucenik', zadnjiPristup: 'Prije 10 sati' },
  { id: 2, imeprezime: 'Nikola Nikolic', email: 'nikola.nikolic@domain.net', tipKorisnika: 'Ucenik', zadnjiPristup: 'Prije 2 dana' },
];

const StudentTable = () => {

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
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectedAll} onChange={handleSelectAll} />
            </th>
            <th>Ime i Prezime</th>
            <th>E mail</th>
            <th>Tip korisnika</th>
            <th>Zadnji pristup sistemu</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </td>
              <td>{item.imeprezime}</td>
              <td>{item.email}</td>
              <td>{item.tipKorisnika}</td>
              <td>{item.zadnjiPristup}</td>
              <td className="options">
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
  );
};

export default StudentTable;