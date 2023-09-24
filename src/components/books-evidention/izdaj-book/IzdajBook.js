import { react, useState, useEffect, useRef, Fragment } from "react";
import { BookService } from "../../../api/api";
import { UserService } from "../../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./IzdajBook.css";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiReservedFill } from "react-icons/ri"

import { Input, Select, Space, Card  } from "antd";
const { Meta } = Card;



const IzdajBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState([]);
  const [datumIzdavanja, setDatumIzdavanja] = useState();
  const [datumVracanja, setDatumVracanja] = useState();


  const { id } = useParams();


  const izdajKnjiguData = {
    student_id: userId[0],
    datumIzdavanja: datumIzdavanja,
    datumVracanja: datumVracanja,
  };

  const { Option } = Select;


  const izdajKnjigu = async () => {
    try {
       const response = await BookService.IzdajBook(izdajKnjiguData, id);
       console.log("API Response", response);

      // navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error izdaj a book", error);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BookService.GetBook(id);
        setBook(response.data.data);
      } catch (error) {
        console.log("Error fetching book:", error);
      }
    };

    fetchBook();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.ListUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };


  return (
    <Fragment>
      <div className="wrapper10">
        <div className="book-details">
          <div className="book-image">
            <img src={book.photo} alt="book img" className="slika" />
          </div>

          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
                {book.title}
                <div className="links">
                  <p class="breadcrumbs">
                    <Link to="/EvidentionOfBooks">
                      <span className="paragraf">Evidencija Knjiga</span>
                    </Link>{" "}
                    / Izdaj Knjigu
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </div>
        <div>
          <Link to="#" className="links2 side-stuff">
            <HiOutlineArrowUturnUp className="detail-icons" />
            Otpisi Knjigu
          </Link>
          <Link to={`/ReserveBook/${book.id}`} className="links2 side-stuff">
            <RiReservedFill className="detail-icons" />
           Rezerviši Knjigu
           </Link>
          <Link to="#" className="links2 side-stuff">
            <HiOutlineArrowPath className="detail-icons" />
            Vrati Knjigu
          </Link>
          <Link to="#" className="links2">
            <BsThreeDotsVertical
              className="more-options"
            />
          </Link>
        </div>
      </div>
      <div className="raspored-izdaj-knjige">
        <div className="i10">
          <div className="i2">
            <h2 className="naslov-mini-ispod">Izdaj Knjigu</h2>
            <label>Izaberite učenika koji zadužuje knjigu</label>
            <Select
              type="password"
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Odaberite kategorije"
              
              value={userId}
              onChange={(selectedUserId) => setUserId(selectedUserId)}
            >
              {users.map((user) => {
                if (user.role === "Učenik") {
                  return (
                    <Option
                    key={user.id}
                    value={user.id}
                  >
                    <Space>{user.name}{user.surname}</Space>
                  </Option>
                  );
                }
                return null;
              })}
            </Select>
          </div>{" "}
          <div className="i0">
            <div className="i3">
              <div className="form123">
                <label>Datum Izdavanja</label>
                <Input
                  type="date"
                  
                  onChange={(e) => {
                    setDatumIzdavanja(e.target.value);
                  }}
                />
              </div>
              <div className="form1234">
                <label>Datum Vraćanja</label>
                <Input
                  type="date"
                  onChange={(e) => {
                    setDatumVracanja(e.target.value);
                  }}
                />
              </div>
            </div>
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
            <button
              className="submit"
              onClick={() => {
                izdajKnjigu();
                navigate("/EvidentionOfBooks")
              }}
            >
              Potvrdi
            </button>
          </div>
        </div>
       
            
            <Card
      style={{
        width: 300      }}
      type="inner"
      title="Informacije"
    > <div className="i4">
          <div className="category-info22">
     <div className="side-category00">
              <span className="side-category01">Na raspolaganju:</span>
              <span className="side-category01">Rezervisano:</span>
              <span className="side-category01">Izdato:</span>
              <span className="side-category01">U prekoračenju:</span>
              <span className="side-category01">Ukupna količina:</span>
            </div>
            <div>
              <div className="side-info00">
                <span className="side-info01">
                  {book.samples - book.rSamples - book.bSamples - book.fSamples}
                  primjeraka
                </span>
                <span className="side-info01">{book.rSamples} primjeraka</span>
                <span className="side-info01">{book.bSamples} primjeraka</span>
                <span className="side-info01">{book.fSamples} primjeraka</span>
                <span className="side-info01">
                  {book.samples}
                  primjeraka
                </span>
              </div>
            </div></div>
        </div>
    </Card>
          
      </div>
      </Fragment>
  );
};

export default IzdajBook;