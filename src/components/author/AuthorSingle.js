import "./AuthorTable.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorService } from "../../api/api";

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
          navigate();
        }}
      >
        Pogledaj detalje
      </div>
      <div onClick={deleteAuthors}>Obriši</div>
      <div
        onClick={() => {
          navigate();
        }}
      >
        Izmijeni
      </div>
      <div>Izdaj knjigu</div>
    </div>
  </div>
</td>
</tr>  
);

}

export default AuthorSingle;