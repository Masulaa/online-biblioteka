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
        <div className="book-details">
          <div className="book-image">
            <img src={me.photoPath} alt="book img" className="slika" />
          </div>

          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
                {me.name}
                <div className="links">
                  <Link className="evidention" to="/EvidentionOfBooks">
                    Evidencija Knjiga&nbsp;
                  </Link>
                  /
                  <Link
                    className="book"
                    to={""}
                  >
                    
                  </Link>
                </div>
              </h1>
            </div>
          </div>
        </div>
    </div>
);
}

export default UserProfile;