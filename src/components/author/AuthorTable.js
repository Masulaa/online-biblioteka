import React, { useState, useEffect } from "react";
import "./AuthorTable.css";
import { useNavigate } from "react-router-dom";
import { AuthorService } from "../../api/api";
import LoadingSpinner from "../account-components/loading-spinner/LoadingSpinner";
import AuthorSingle from "./AuthorSingle";

const AuthorTable = () => {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await AuthorService.ListAuthors();
      setAuthors(response.data.data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = (event) => {
    setSelectedAll(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(authors.map((author) => author.id));
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

  console.log("Books is", authors);
  const currentItems = authors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(authors.length / itemsPerPage);

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
      {authors.length === 0 ? (
        <div>
          <div className="loading">
            <LoadingSpinner></LoadingSpinner>
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectedAll} onChange={handleSelectAll} />
            </th>
            <th>Ime Autora</th>
            <th>Prezime Autora</th>
            <th></th>
          </tr>
        </thead>
          <tbody>
          {currentItems.map((author) => (
              <AuthorSingle
                key={author.id}
                item={author}
                selectedItems={selectedItems}
                handleSelectItem={handleSelectItem}
                fetchAuthors={fetchAuthors}
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
    </div>
  );
};

export default AuthorTable;