import "./table.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../api/api";

const BookItem = (props) => {

    const book = props.item;
    const navigate = useNavigate();

    const deleteBooks = async () => {
        try {
          const response = await BookService.DeleteBooks(book.id);
          console.log("API Response", response);
          props.fetchBooks();
        } catch (error) {
   
          console.error("Error deleting book:", error)
        }
      };
   
   


return (
<div>
<tr key={book.id}>
<td>
  <input
    type="checkbox"
    checked={props.selectedItems.includes(props.item.id)}
  onChange={() => props.handleSelectItem(props.item.id)}
  />
</td>
<td>{book.title}</td>
<td>
  {book.authors.map((a) => `${a.name} ${a.surname}`).join(", ")}
</td>
<td>{book.categories.map((c) => c.name).join(", ")}</td>
<td>{book.ableToBorrow ? "Da" : "Ne"}</td>
<td>{book.rezervisano}</td>
<td>{book.rSamples}</td>
<td>{book.uPrekoracenju}</td>
<td>{book.samples}</td>
<td className="options">
  <div className="dropdown">
    <div className="dots" >&#x2026;</div>
    <div className="dropdown-content">
      <div
        onClick={() => {
          navigate(`/EvidentionOfBooks/BookDetails/${book.id}`);
        }}
      >
        Pogledaj detalje
      </div>
      <div onClick={deleteBooks}>Obriši</div>
      <div
        onClick={() => {
          navigate("/EvidentionOfBooks/EditBook");
        }}
      >
        Izmijeni
      </div>
      <div>Izdaj knjigu</div>
    </div>
  </div>
</td>
</tr>  
</div>);

}

export default BookItem;