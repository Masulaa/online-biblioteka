import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NewAuthor.css";
import "react-quill/dist/quill.snow.css";

import { Input, message} from "antd";
import { AuthorService } from "../../api/api";

function NewAuthor() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");  
  const [biography, setBiography] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { TextArea } = Input;

  const authorData = {
    name: name,
    surname: surname,
    biography: biography
  }

  const createAuthors = async () => {
    try {
      message.destroy();
      const response = await AuthorService.CreateAuthor(authorData);
      console.log("API Response", response);
      message.success('Autor uspješno kreiran');
      navigate("/AuthorEvidention");
    } catch (error) {
      console.error("Error creating an authors", error)
      setErrors(error.response.data.data)
      message.error('Autor nije kreiran');
    }
  };



  return (
    <Fragment>
        <div className="">
          <div class="headbar">
            <h2 className="naslov">Novi Autor</h2>
            <p class="breadcrumbs">
              <Link to="/AuthorEvidention">
                <span className="paragraf">Evidencija Autora</span>
              </Link>{" "}
              / Novi Autor
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
                  {errors.name ? <p className="error-text">{errors.name[0]}</p> : ''}
                   <label>Prezime Autora</label>
                  <Input
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  {errors.surname ? <p className="error-text">{errors.surname[0]}</p> : ''}
                  <label>Biografija</label>
                  <TextArea
                  rows={4}
                    value={biography}
                    onChange={(e)=>setBiography(e.target.value)}
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
                      Potvrdi
                    </button>
                  </div>
                </div>
              </div>

          </div>
        </div>
    </Fragment>
  );
}

export default NewAuthor;