import {useState, useEffect} from "react"
import { UserService } from "../../api/api";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const UserProfile = () =>{

    const[me, setMe]=useState([]);

    const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

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

return(
    <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="profile-details">
          {/* <div className="book-image">
            <img src={me.photoPath} alt="book img" className="slika" />
          </div> */}

          <div className="profile-info">
            <div className="naslov">
              <h1 className="h1">
                {me.name}
                <div className="links">
                  <Link to="/EvidentionOfBooks">
                    Evidencija Knjiga&nbsp;
                  </Link>
                  /
                </div>
              </h1>
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
          <h3 className="detail-info">{me.id}</h3>
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
         <div className="book-details-01"> 
         <img src={me.photoPath}/>
         </div> 
      </div>
    </div>
    </div>

    </div>

);
}

export default UserProfile;