import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../api/api";
import LoadingSpinner from "../account-components/loading-spinner/LoadingSpinner";
import BookItem from "./BookItem";

const Table = () => {

   const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  
  const bulkDeleteBooks = async () => {
    try {
      console.log("Book ids", selectedItems)
      const response = await BookService.BulkDeleteBooks(selectedItems);
      console.log("API Response", response);
      console.log(selectedItems)
      fetchBooks();
    } catch (error) {

      console.error("Error deleting book:", error)
    }
  };


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await BookService.ListBooks();
      setBooks(response.data.data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };


// console.log("ID is", books.map((book) => book.id))
  const handleSelectAll = (event) => {
    setSelectedAll(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(books.map((book) => book.id));
    } else {
      setSelectedItems([]);
    }
  };
// console.log("ID is",selectedItems)
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]
        );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  console.log("Books is", books);
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
    <div className="book-tabla">
      {books.length === 0 ? (
        <div>
          <div className="loading">
            <LoadingSpinner></LoadingSpinner>
          </div>
        </div>
      ) : (
        <table className="table">
          <thead className="thead">
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
              <BookItem
                key={book.id}
                item={book}
                selectedItems={selectedItems}
                handleSelectItem={handleSelectItem}
                fetchBooks={fetchBooks}
              />
            ))}
          </tbody>
        </table>
      )}
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
      <button className="submit" onClick={bulkDeleteBooks}>Obrisi</button>
    </div>
  );
};


export default Table;
