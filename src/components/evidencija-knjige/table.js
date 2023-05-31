import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
const Table = () => {
  const data = [
    {
      title: "Book 1",
      author: "Author 1",
      category: "Category 1",
      dummy1: "Dummy 1",
      dummy2: "Dummy 2",
      dummy3: "Dummy 3",
      dummy4: "Dummy 4",
      dummy5: "Dummy 5",
    },
    {
      title: "Book 1",
      author: "Author 1",
      category: "Category 1",
      dummy1: "Dummy 1",
      dummy2: "Dummy 2",
      dummy3: "Dummy 3",
      dummy4: "Dummy 4",
      dummy5: "Dummy 5",
    },
    {
      title: "Book 1",
      author: "Author 1",
      category: "Category 1",
      dummy1: "Dummy 1",
      dummy2: "Dummy 2",
      dummy3: "Dummy 3",
      dummy4: "Dummy 4",
      dummy5: "Dummy 5",
    },
    // Add more data rows here
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Naziv knjige</th>
          <th>Autor</th>
          <th>Kategorija</th>
          <th>Na raspolaganju</th>
          <th>Rezervisano</th>
          <th>Izdato</th>
          <th>U prekoracenju</th>
          <th>Ukupna Kolicina</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <input type="checkbox" />

            </td>
            <td>
           {item.title} <img src="path/to/picture.jpg" alt=""/>
            </td>
            <td>{item.author}</td>
            <td>{item.category}</td>
            <td>{item.dummy1}</td>
            <td>{item.dummy2}</td>
            <td>{item.dummy3}</td>
            <td>{item.dummy4}</td>
            <td>{item.dummy5}</td>
            <td>
            <BiDotsVerticalRounded className="dots"/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
