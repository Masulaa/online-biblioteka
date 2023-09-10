import "./table.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../api/api";
import { AiFillDelete } from  "react-icons/ai";
import { AiFillEdit } from "react-icons/ai"
import { TbListDetails } from "react-icons/tb"
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowUturnUp } from "react-icons/hi2"
import { IoIosRefresh } from "react-icons/io"
import { FaNotesMedical } from "react-icons/fa"

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
<td>{book.rSamples}</td>
<td>{book.bSamples}</td>
<td>{book.fSamples}</td>
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
        <TbListDetails className="detail-icons"/>
        Pogledaj detalje
      </div>
      <div onClick={deleteBooks}>
        <AiFillDelete className="detail-icons"/>
        Obriši
        </div>
      <div
        onClick={() => {
          navigate(`/EvidentionOfBooks/EditBook/${book.id}`);
        }}
      >
        <AiFillEdit className="detail-icons"/>
        Izmijeni
      </div>
      <div onClick={() => {
          navigate(`/IzdajKnjigu/${book.id}`);
        }}>
        <FaRegHandScissors className="detail-icons"/>
        Izdaj knjigu</div>
        <div>
        <HiOutlineArrowUturnUp className="detail-icons"/>
        Otpisi Knjigu
      </div>
      <div>
        <IoIosRefresh className="detail-icons"/>
        Vrati Knjigu
      </div>
      <div onClick={() => {
          navigate(`/ReserveBook/${book.id}`);
        }}>
        <FaNotesMedical className="detail-icons"/>
        Rezervisi Knjigu
      </div>
    </div>
  </div>
</td>
</tr>  
);

}

export default BookItem;