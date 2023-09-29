import "./LibrarianDetails.css";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlineArrowUturnUp } from "react-icons/hi2";
import { FaRegHandScissors } from "react-icons/fa";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserService } from "../../../api/api";

import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { Card, Tabs, Dropdown, Menu, Modal } from "antd";
const { Meta } = Card;

function LibrarianDetails() {
  const [librarian, setLibrarian] = useState([]);

  const profilRef = useRef(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const deleteLibrarian = async () => {
    try {
      const response = await UserService.DeleteUsers(id);
      console.log("API Response", response);
      navigate("/AuthorEvidention");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const confirm = (id) => {
    Modal.confirm({
      title: "Potvrdi",
      icon: <ExclamationCircleOutlined />,
      content: "Da li ste sigurni da zelite obrisati bibliotekara?",
      okText: "Da, Obrisi",
      cancelText: "Ne",
      onOk: () => deleteLibrarian(id),
    });
  };

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const response = await UserService.ShowSingleUser(id);
        setLibrarian(response.data.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchLibrarian();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/LibrarianEvidention/EditLibrarian/${id}`}>
          <EditOutlined className="detail-icons" />
          Izmjeni Podatke
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => confirm(id)} key="6" danger="true">
        <DeleteOutlined className="detail-icons" />
        Obriši Korisnika
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="wrapper10">
        <div className="book-details">
          <div className="book-image">
            <img src={librarian.photoPath} alt="book img" className="slika" />
          </div>
          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
                {librarian.name} {librarian.surname}
                <div className="links">
                  <p class="breadcrumbs">
                    <Link to="/LibrarianEvidention">
                      <span className="paragraf">Evidencija Bibliotekara</span>
                    </Link>{" "}
                    / ID-{librarian.id}
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </div>
        <div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreOutlined
                className="detail-icons"
                style={{
                  fontSize: "40px",
                  color: "#76a5af",
                  cursor: "pointer",
                  borderLeft: "1px solid #ccc",
                }}
              />
            </a>
          </Dropdown>
        </div>
      </div>

      <div className="details-content">
        <div className="columns">
          <div>
            <Card type="inner" title="Ime i prezime" style={{ width: 150 }}>
              {librarian.name} {librarian.surname}
            </Card>
            <Card
              type="inner"
              title="Tip korisnika"
              style={{ marginTop: 16, width: 150 }}
            >
              {librarian.role}
            </Card>
            <Card
              type="inner"
              title="JMBG"
              style={{ marginTop: 16, width: 150 }}
            >
              {librarian.jmbg}
            </Card>
            <Card
              type="inner"
              title="Email"
              style={{ marginTop: 16, width: 150 }}
            >
              {librarian.email}
            </Card>
            <Card
              type="inner"
              title="Korisničko ime"
              style={{ marginTop: 16, width: 150 }}
            >
              {librarian.username}
            </Card>
            
          </div>
          <div className="second-column01">
          <Card type="inner" title="Slika korisnika" style={{ width: 400 }}>
              <img src={librarian.photoPath} className="slika-user" />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default LibrarianDetails;
