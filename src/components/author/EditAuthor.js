import React, { useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthorService } from "../../api/api";

import { Input, message } from "antd";

import "./EditAuthor.css";

function EditAuthor() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [biography, setBiography] = useState("");
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  const EditAuthor = async () => {
    try {
      message.destroy();
      const response = await AuthorService.EditAuthor(authorData, id);
      console.log("API Response", response);
      message.success("Autor uspješno izmjenjen");
      navigate("/AuthorEvidention")
    } catch (error) {
      console.error("Error editing an authors", error);
      setErrors(error.response.data.data);
      message.error("Autor nije izmjenjen");
    }
  };

  const navigate = useNavigate();

  const { TextArea } = Input;

  const authorData = {
    name: name,
    surname: surname,
    biography: biography,
  };

  return (
    <Fragment>
      <div class="headbar">
        <h2 className="naslov">Izmjeni Autora</h2>
        <p class="breadcrumbs">
          <Link to="/AuthorEvidention">
            <span className="paragraf">Evidencija Autora</span>
          </Link>{" "}
          / Izmjeni Autora
        </p>
      </div>

      <div>
        <div className="line2"></div>

        <div className="flex-columns">
          <div className="column">
            <label>Ime Autora</label>
            <Input onChange={(e) => setName(e.target.value)}
            value={name} />
            {errors.name ? <p className="error-text">{errors.name[0]}</p> : ""}
            <label>Prezime Autora</label>
            <Input onChange={(e) => setSurname(e.target.value)} />
            {errors.surname ? (
              <p className="error-text">{errors.surname[0]}</p>
            ) : (
              ""
            )}
            <label>Kratki sadržaj</label>
            <TextArea
              onChange={(e) => setBiography(e.target.value)}
              rows={4}
              value={biography}
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
              <button className="submit" onClick={()=>{EditAuthor();}}>
                Potvrdi
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditAuthor;