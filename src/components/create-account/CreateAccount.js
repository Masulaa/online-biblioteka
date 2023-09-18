import { Fragment, React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserService } from "../../api/api";
import { Input, Select, message, Button, Space } from "antd";
import "./CreateAccount.css";

const CreateAccount = () => {
  const [roleId, setRoleId] = useState(1);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const navigate = useNavigate();

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

  const createAccounts = async () => {
    try {
      const response = await UserService.CreateUser(newUserData);
      console.log("API Response", response);
      navigate("/StudentEvidention");
      success();

      // navigate("/EvidentionOfBooks");
    } catch (error) {

      console.error("Error creating an account", error)
      setErrors(error.response.data.data)
      error();
    }
  };

  const { Option } = Select;

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'Uspješno',
      content: 'Uspješno ste kreirali nalog',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'Neuspješno',
      content: 'Nalog nije kreiran',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
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
            <label>Izaberite ulogu korisnika u sistemu</label>
            <Select
              className="default-input"
              onChange={(SelectedRole) => setRoleId(SelectedRole)}
              style={{
                width: "100%",
              }}
              placeholder="Odaberite ulogu korisnika"
              optionLabelProp="label"
              value={roleId}
            >
              <Option value={1} label="Bibliotekar">Bibliotekar</Option>
              <Option value={2} label="Ucenik">Ucenik</Option>
              <Option value={3} label="Admin">Admin</Option>
            </Select>
            {errors.role_id ? <p className="error-text">{errors.role_id[0]}</p>  : ''}
            <label>Ime korisnika</label>
            <Input
              className="default-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name ? <p className="error-text">{errors.name[0]}</p> : ''}
            <label>Prezime korisnika</label>
            <Input
              className="default-input"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {errors.surname ? <p className="error-text">{errors.surname[0]}</p> : ''}
            <label>Unesite JMBG korisnika</label>
            <Input
              className="default-input"
              value={jmbg}
              onChange={(e) => setJmbg(e.target.value)}
              maxLength={13}
            />
            {errors.jmbg ? <p className="error-text">{errors.jmbg[0]}</p> : ''}
          </div>
          <div className="column">
            <label>Unesite e-mail koriniska</label>
            <Input
              className="default-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email ? <p className="error-text">{errors.email[0]}</p> : ''}
            <label>Unesite username koriniska</label>
            <Input
              className="default-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username ? <p className="error-text">{errors.username[0]}</p> : ''}
            <label>Unesite sifru koriniska</label>
            <Input
            type="password"
              className="default-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password ? <p className="error-text">{errors.password[0]}</p> : ''}
               <label>Potvride sifru koriniska</label>
            <Input
            type="password"
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
              {contextHolder}
              <button className="submit" onClick={createAccounts
              }>
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
