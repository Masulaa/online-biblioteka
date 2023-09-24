import "./UserProfile.css"
import {useState, useEffect, useRef} from "react"
import { UserService } from "../../api/api";



import { Link, useNavigate } from "react-router-dom";

import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Space, Col, Row } from 'antd';
const { Meta } = Card;



const UserProfile = () =>{

    const navigate = useNavigate();

    const[me, setMe]=useState([]);


 



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

 

      const [showModal, setShowModal] = useState(false);

      const openModal = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

return(<>
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
                  <p class="breadcrumbs">
             Korisnički Profil
              /  <Link to="/UserProfile">
                <span className="paragraf">ID-{me.id}</span>
              </Link>{" "}
            </p>
                </div>
              </h1>
              
            </div>
            
          </div></div>
        </div>
        
        

    
    <div className="details-content">
   

    <div className="columns">
    <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={me.photoPath}
        style={{
          border: "1px solid #f0f0f0"
        }}
      />
    }
    actions={[
      <SettingOutlined key="setting" onClick={()=>{navigate("/Settings")}} />,
      <EditOutlined key="edit" onClick={()=>{navigate("/EditUserProfile")}}/>,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Ime i prezime"
      description={`${me.name} ${me.surname}`}
    />
  </Card>

  
   <div className="second-column01">
    <Card type="inner" title="Tip korisnika">
      {me.role}
    </Card>
    <Card
      style={{
        marginTop: 16,
        width: 200      }}
      type="inner"
      title="JMBG"
    >
     {me.jmbg}
    </Card>
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title="Email"
    >
     {me.email}
    </Card>
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title="Korisničko ime"
    >
     {me.username}
    </Card>
  </div>
    
    </div></div>
</>

);
}

export default UserProfile;