import {useState, useEffect, useRef} from "react"
import { UserService } from "../../api/api";

import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import "./UserProfile.css"

const UserProfile = () =>{

    const navigate = useNavigate();

    const[me, setMe]=useState([]);

    const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

    const [userIconMenuOpen, setUserIconMenuOpen] = useState(false);

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

      const isOpennedUserIconMenu = () => {
        setUserIconMenuOpen(!userIconMenuOpen);
        if (userIconMenuOpen === false) {
          setUserIconMenuOpen(!userIconMenuOpen);
        }
      };

return(
    <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="wrapper10">
      
        <div className="book-details">
          {/* <div className="book-image">
            <img src={me.photoPath} alt="book img" className="slika" />
          </div> */}

          <div className="book-info">
            
            <div className="naslov">
              
              <h1 className="h1">
                {me.name}
                <div className="links">
                  <Link to="/EvidentionOfBooks">
                    Evidencija Knjiga &nbsp;
                  </Link>
                   / 
                  <Link to="/userprofile">
                &nbsp; ID-{me.id}&nbsp;
                  </Link>
                </div>
              </h1>
              
            </div>
            
          </div></div>
          <div>
        <Link to="#" className="links2 side-stuff">
          <HiOutlineArrowUturnUp className="detail-icons" />
          Otpisi Knjigu
        </Link>
        <Link to="#" className="links2 side-stuff">
          <FaRegHandScissors className="detail-icons" />
          Izdaj Knjigu
        </Link>
        <Link to="#" className="links2 side-stuff">
          <HiOutlineArrowPath className="detail-icons" />
          Vrati Knjigu
        </Link>
        <Link to="#" className="links2" ref={profilRef}>
          <BsThreeDotsVertical
            className="more-options"
            onClick={isOpennedUserIconMenu}
          /></Link>
          {userIconMenuOpen && (
            <div className="option-menu01">
              <ul>
                <li
                  onClick={() => {
                    isOpennedUserIconMenu();
                    navigate();
                  }}
                >
                  <HiOutlineArrowPath className="detail-icons"/>
                  Izmjeni Knjigu
                </li>
              </ul>
            </div>
          )}
        
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
    
    <div className="details-content">
      
    <div className="columns">
      <div>
        <div className="book-details-01">
          <p className="category-info">Ime i prezime</p>
          <h3 className="detail-info">{me.name} {me.surname}</h3>
        </div>
        <div className="book-details-01">
          <p className="category-info">Tip korisnika</p>
          <h3 className="detail-info">{me.role}</h3>
        </div>
        <div className="book-details-01">
          <p className="category-info">JMBG</p>
          <h3 className="detail-info">{me.jmbg}</h3>
        </div>
        <div className="book-details-01">
          <p className="category-info">Email</p>
          <h3 className="detail-info">{me.email}</h3>
        </div>
        <div className="book-details-01">
          <p className="category-info">Korisnicko ime</p>
          <h3 className="detail-info">{me.username}</h3>
        </div>
      </div>
      <div className="second-column01">     
         <img src={me.photoPath} className="slika-user"/>
      </div>
      
    </div>
    
    </div>

    </div>

);
}

export default UserProfile;