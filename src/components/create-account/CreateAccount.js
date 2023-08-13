import { Fragment, React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserService } from "../../api/api";
import { useEffect } from "react";
import "./CreateAccount.css";

const CreateAccount = () => {
  const [roleId, setRoleId] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();

  // REQUEST TO API IS NOT WORKING

  const newUserData = {
    role_id: roleId,
    name: name,
    surname: surname,
    jmbg: jmbg,
    email: email,
    username: username,
    password: password,
    password_confirmation: passwordConfirmation,
  }

  useEffect(() => {
    createAccounts();
  }, []);

  const createAccounts = async () => {
    try {
      const response = await UserService.CreateUser(newUserData);
      console.log("API Response", response);
      navigate("/EvidentionOfBooks");
    } catch (error) {
      console.log("Error creating account:", error);
    }
  };

  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="naslov">
          <h1>Kreiraj nalog</h1>
        </div>
        <div className="line2"></div>
        <div className="flex-columns">
          <div className="column">
            <label>Izaberite ROLE ID</label>
            <select
              className="default-input"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <option value={1}>Bibliotekar</option>
              <option value={2}>Ucenik</option>
              <option value={3}>Admin</option>
            </select>
            <label>Ime korisnika</label>
            <input
              className="default-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Prezime korisnika</label>
            <input
              className="default-input"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <label>Unesite JMBG korisnika</label>
            <input
              className="default-input"
              value={jmbg}
              onChange={(e) => setJmbg(e.target.value)}
              maxLength={13}
            />
          </div>
          <div className="column">
            <label>Unesite e-mail koriniska</label>
            <input
              className="default-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Unesite username koriniska</label>
            <input
              className="default-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Unesite sifru koriniska</label>
            <input
              className="default-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
               <label>Potvride sifru koriniska</label>
            <input
              className="default-input"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <div className="buttons">
              <button
                className="cancel"
                onClick={() => {
                  navigate("/EvidentionOfBooks");
                }}
              >
                Poništi
              </button>
              <button className="submit" onClick={createAccounts}>
                Potvrdi
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateAccount;
