import { useState, useEffect, useRef } from "react";
import { UserService } from "../../api/api";

import { Input } from 'antd';

import { Link, useNavigate } from "react-router-dom";

import "./EditUserProfile.css";


const EditUserProfile = () => {
  const navigate = useNavigate();

  const [userIconMenuOpen, setUserIconMenuOpen] = useState(false);
  const [me, setMe] = useState([]);
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [JMBG, setJMBG] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const newUserData = {
    name: name,
    surname: surname,
    email: email,
    username: username,
    jmbg: JMBG,
    password: password,
    password_confirmation: confirmPassword,
  };

  // const updateAccount = async () => {
  //   try {
  //     const response = await UserService.UpdateMeInfo(newUserData);
  //   // console.log(newUserData)
  //     console.log("API Response", response);

  //     // navigate("/EvidentionOfBooks");
  //   } catch (error) {
  //     console.error("Error updating an account", error);
  //   }
  // };

const id = me.id

  const UpdateMe = async () => {
    try {
      const response = await UserService.UpdateUser(newUserData, id);
      console.log("API Response", response);
      navigate("/UserProfile")
    } catch (error) {
      console.error("Error updating my account", error);
    }
  };


  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await UserService.GetMeInfo();
        setMe(response.data.data);
      } catch (error) {
        console.log("Error fetching info about me:", error);
      }
    };

    fetchMe();
  }, []);


  return (<>
      <div className="wrapper10">
        <div className="book-details">
          {/* <div className="book-image">
            <img src={me.photoPath} alt="book img" className="slika" />
          </div> */}

          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
                Izmjeni Podatke
                <div className="links">
                  <p class="breadcrumbs">
                    Izmjeni Korisnički Profil /{" "}
                    <Link to="/UserProfile">
                      <span className="paragraf">ID-{me.id}</span>
                    </Link>{" "}
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-columns">
        <div className="column">
          <div>
            <label>Ime</label>
            <Input
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Prezime</label>
            <Input
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div>
            <label>JMBG</label>
            <Input
              onChange={(e) => setJMBG(e.target.value)}
              max={13}
            />
          </div>
          <div>
            <label>E-mail</label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div></div>
          <div className="column">
          <div>
            <label>Korisničko Ime</label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Šifra</label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Potvrdite Šifru</label>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        
          <div className="buttons">
            <button
              className="cancel"
              onClick={() => {
                navigate("/EvidentionOfBooks");
              }}
            >
              Poništi
            </button>
            <button className="submit" onClick={()=>{
                UpdateMe();
            }}>
              Potvrdi
            </button></div>
          </div>
      </div>
      </>
  );
};

export default EditUserProfile;
