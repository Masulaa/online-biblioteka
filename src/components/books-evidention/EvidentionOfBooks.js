import "./EvidentionOfBooks.css";
import Table from "./table";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbars/navbar";

import { HiMagnifyingGlassCircle } from "react-icons/hi2";

function EvidentionOfBooks() {
  const navigate = useNavigate();
  return (
    <body>
      <NavBar />

      <div className="naslov">
        <h1>Knjige</h1>
      </div>
      <div className="line2"></div>
      <div className="new-book">
        <button
          className="nova-knjiga"
          onClick={() => {
            navigate("/EvidentionOfBooks/NewBook/BookDetails");
          }}
        >
          Nova Knjiga
        </button>
        <span className="search-span">
          <HiMagnifyingGlassCircle className="search-bar-icon" />
          <input
            type="text"
            placeholder="  search..."
            className="search"
          ></input>
        </span>
      </div>

      <Table/>
    </body>
  );
}

export default EvidentionOfBooks;
