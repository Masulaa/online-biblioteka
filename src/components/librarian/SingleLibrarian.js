import "./LibrarianTable.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../api/api";

const BookItem = (props) => {

    const user = props.item;
    const navigate = useNavigate();

    const deleteUsers = async () => {
        try {
          const response = await UserService.DeleteUsers(user.id);
          console.log("API Response", response);
          props.fetchUsers();
        } catch (error) {
   
          console.error("Error deleting book:", error)
        }
      };

   
return (

<tr key={user.id}>
<td>
  <input
    type="checkbox"
    checked={props.selectedItems.includes(props.item.id)}
  onChange={() => props.handleSelectItem(props.item.id)}
  />
</td>
{ <td>{user.name}&nbsp;{user.surname}</td> }
<td>{user.email}</td>
<td>{user.role}</td>
<td className="options">
  <div className="dropdown">
    <div className="dots" >&#x2026;</div>
    <div className="dropdown-content">
      <div
        onClick={() => {
          navigate(`/EvidentionOfBooks/BookDetails/${user.id}`);
        }}
      >
        Pogledaj detalje
      </div>
      <div onClick={deleteUsers}>Obriši</div>
      <div
        onClick={() => {
          navigate(`/EvidentionOfBooks/EditBook/${user.id}`);
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

export default BookItem;