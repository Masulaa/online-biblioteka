import "./AuthorTable.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorService } from "../../api/api";
import { AiFillDelete } from  "react-icons/ai";
import { AiFillEdit } from "react-icons/ai"
import { TbListDetails } from "react-icons/tb"

const AuthorSingle = (props) => {

    const author = props.item;
    const navigate = useNavigate();

    const deleteAuthors = async () => {
        try {
          const response = await AuthorService.DeleteAuthors(author.id);
          console.log("API Response", response);
          props.fetchAuthors();
        } catch (error) {
   
          console.error("Error deleting book:", error)
        }
      };
   
return (

<tr key={author.id}>
<td>
  <input
    type="checkbox"
    checked={props.selectedItems.includes(props.item.id)}
  onChange={() => props.handleSelectItem(props.item.id)}
  />
</td>
<td>{author.name}</td>
<td>{author.surname}</td>
<td className="options">
  <div className="dropdown">
    <div className="dots" >&#x2026;</div>
    <div className="dropdown-content">
      <div
        onClick={() => {
          navigate(`/AuthorEvidention/AuthorDetails/${author.id}`);
        }}
      >
        <TbListDetails className="detail-icons"/>
        Pogledaj detalje
      </div>
      <div onClick={deleteAuthors}>
        <AiFillDelete className="detail-icons"/>
        Obriši
        </div>
      <div
        onClick={() => {
          navigate();
        }}
      >
        <AiFillEdit className="detail-icons"/>
        Izmijeni
      </div>
    </div>
  </div>
</td>
</tr>  
);

}

export default AuthorSingle;