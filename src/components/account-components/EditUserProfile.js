import { useState, useEffect, useRef } from "react";
import { UserService } from "../../api/api";

import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import "./EditUserProfile.css";

import DragDrop from "../../components/dragdropupload/DragDrop";

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
  const [fileName, setFileName] = useState("");

  const newUserData = {
    name: name,
    surname: surname,
    email: email,
    username: username,
    jmbg: JMBG,
    password: password,
    password_confirmation: confirmPassword,
    photoPath: fileName,
  };

  const updateAccount = async () => {
    try {
      const response = await UserService.UpdateMeInfo(newUserData);
    // console.log(newUserData)
      console.log("API Response", response);

      // navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error updating an account", error);
    }
  };

  const handleFileNameChange = (name) => {
    setFileName(name);
  };

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const profilRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profilRef.current && !profilRef.current.contains(event.target)) {
        setUserIconMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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


  return (
    <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
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

      <div className="line2"></div>
      {/* <h4 className="category-info">Ime i prezime</h4>
              <p>{me.name} {me.surname}</p>
              <h4>Tip korisnika</h4>
              <p>{me.role}</p>
              <h4>JMBG</h4>
              <p>{me.id}</p>
              <h4>Email</h4>
              <p>{me.email}</p>
              <h4>Korisnicko ime</h4>
              <p>{me.username}</p> */}

      <div className="flex-columns">
        <div className="column">
          <div>
            <label>Ime</label>
            <input
              className="default-input"
              placeholder={me.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Prezime</label>
            <input
              className="default-input"
              placeholder={me.surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div>
            <label>JMBG</label>
            <input
              className="default-input"
              placeholder={me.jmbg}
              onChange={(e) => setJMBG(e.target.value)}
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              className="default-input"
              placeholder={me.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Korisničko Ime</label>
            <input
              className="default-input"
              placeholder={me.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Šifra</label>
            <input
              type="password"
              className="default-input"
              placeholder={me.password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Ponovi Šifru</label>
            <input
              type="password"
              className="default-input"
              placeholder={me.password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="column">
          <DragDrop
            handleFileNameChange={handleFileNameChange}
            fileName={fileName}
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
            <button className="submit" onClick={()=>{
                updateAccount();
                navigate("/UserProfile")
            }}>
              Potvrdi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
