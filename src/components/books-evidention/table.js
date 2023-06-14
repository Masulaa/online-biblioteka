import React, { useState, useEffect } from 'react';
import './table.css';
import { useNavigate } from 'react-router-dom';
import { BookService } from '../../api/api';

const Table = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await BookService.ListBooks();
      setBooks(response.data.data);
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  };

  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = (event) => {
    setSelectedAll(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(books.map((book) => book.id));
    } else {
      setSelectedItems([]);
    }
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

  console.log("Books is", books) 
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(books.length / itemsPerPage);

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
          className={currentPage === i ? 'active' : ''}
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
        <button onClick={() => handlePageChange(currentPage - 1)}>&larr;</button>
      );
    }
    return null;
  };

  const renderRightArrow = () => {
    if (currentPage !== totalPages) {
      return (
        <button onClick={() => handlePageChange(currentPage + 1)}>&rarr;</button>
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
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={handleSelectAll}
              />
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
          {currentItems.map((book) => (
            <tr key={book.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(book.id)}
                  onChange={() => handleSelectItem(book.id)}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.authors.map(a => `${a.name} ${a.surname}`).join(', ')}</td>
              <td>{book.categories.map(c => c.name).join(', ')}</td>
              <td>{book.ableToBorrow ? 'Da' : 'Ne'}</td>
              <td>{book.rezervisano}</td>
              <td>{book.rSamples}</td>
              <td>{book.uPrekoracenju}</td>
              <td>{book.samples}</td>
              <td className="options">
                <div className="dropdown">
                  <div className="dots">&#x2026;</div>
                  <div className="dropdown-content">
                    <div onClick={() => { navigate('/EvidentionOfBooks/BookDetails') }}>
                      Pogledaj detalje
                    </div>
                    <div>Obriši</div>
                    <div onClick={() => { navigate('/EvidentionOfBooks/EditBook/BookDetails') }}>
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
    </div>
  );
};

export default Table;
