import "./StudentTable.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../api/api";
import { AiFillDelete } from  "react-icons/ai";
import { AiFillEdit } from "react-icons/ai"
import { TbListDetails } from "react-icons/tb"

const BookItem = (props) => {

    const user = props.item;
    const navigate = useNavigate();

    const deleteUsers = async () => {
        try {
          const response = await UserService.DeleteUsers(user.id);
          console.log("API Response", response);
          props.fetchUsers();
        } catch (error) {
   
          console.error("Error deleting user:", error)
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
{ <td>
  <div className="usrslk">
    <img src={user.photoPath}></img>
  <div className="u2">
    {user.name}&nbsp;{user.surname}
  </div></div>
   </td> }
<td>{user.email}</td>
<td>{user.role}</td>
<td className="options">
  <div className="dropdown">
    <div className="dots" >&#x2026;</div>
    <div className="dropdown-content">
      <div
        onClick={() => {
          navigate(`/StudentEvidention/StudentDetails/${user.id}`);
        }}
      >
        <TbListDetails className="detail-icons"/>
        Pogledaj detalje
      </div>
      <div onClick={deleteUsers}>
        <AiFillDelete className="detail-icons"/>
        Obriši
        </div>
      <div
        onClick={() => {
          navigate(`/StudentEvidention/EditStudent/${user.id}`);
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

export default BookItem;