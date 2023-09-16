import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NewAuthor.css";
import "react-quill/dist/quill.snow.css";

import { Tabs, Steps, Input, Select, Space } from "antd";
import { AuthorService } from "../../api/api";

function NewAuthor() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  const [sadrzaj, setSadrzaj] = useState("");

  const { TextArea } = Input;

  const authorData = {
    name: name,
    surname: surname,
    biography: sadrzaj,
  }

  const createAuthors = async () => {
    try {
      const response = await AuthorService.CreateAuthor(authorData);
      console.log("API Response", response);

      // navigate("/EvidentionOfBooks");
    } catch (error) {

      console.error("Error creating an authors", error)
    }
  };


  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);


  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
          <div class="headbar">
            <h2 className="naslov">Novi Autor</h2>
            <p class="breadcrumbs">
              <Link to="/AuthorEvidention">
                <span className="paragraf">Evidencija Autora</span>
              </Link>{" "}
              / Nova Knjiga
            </p>
          </div>

          <div>

            <div className="line2"></div>

              <div className="flex-columns">
                <div className="column">
                  <label>Ime Autora</label>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                  />
                   <label>Prezime Autora</label>
                  <Input
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <label>Biografija</label>
                  <TextArea
                  rows={4}
                    value={sadrzaj}
                    onChange={(e)=>setSadrzaj(e.target.value)}
                  />
                  <div className="buttons">
                    <button
                      className="cancel"
                      onClick={() => {
                        navigate("/AuthorEvidention");
                      }}
                    >
                      Poništi
                    </button>
                    <button
                    onClick={createAuthors}
                      className="submit"
                    >
                      Dalje
                    </button>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewAuthor;
