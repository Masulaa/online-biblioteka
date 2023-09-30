import { useParams, useNavigate } from "react-router-dom";
import { AuthorService } from "../../../api/api";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Card, Tabs, Dropdown, Menu, Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import "./AuthorDetails.css";
import { Link } from "react-router-dom";

const { Meta } = Card;

function LibrarianDetails() {
  const [author, setAuthor] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const deleteAuthor = async () => {
    try {
      const response = await AuthorService.DeleteAuthors(author.id);
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
      content: "Da li ste sigurni da zelite obrisati autora?",
      okText: "Da, Obrisi",
      cancelText: "Ne",
      onOk: () => deleteAuthor(id),
    });
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await AuthorService.ShowAuthor(id);
        setAuthor(response.data.data);
      } catch (error) {
        console.log("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/AuthorEvidention/EditAuthor/${id}`}>
          <EditOutlined className="detail-icons" />
          Izmjeni Podatke
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => confirm(id)} key="6" danger="true">
        <DeleteOutlined className="detail-icons" />
        Obriši Autora
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="wrapper10">
        <div className="book-details">
          {/* <div className="book-image">
            <img src={librarian.photoPath} alt="book img" className="slika" />
          </div> */}
          <div className="book-info">
            <div className="naslov">
              <h1 className="h1">
                {author.name} {author.surname}
                <div className="links">
                  <p class="breadcrumbs">
                    <Link to="/LibrarianEvidention">
                      <span className="paragraf">Evidencija Autora</span>
                    </Link>{" "}
                    / ID-{author.id}
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
            <Card type="inner" title="Ime i prezime">
              {author.name} {author.surname}
            </Card>
            <Card
              type="inner"
              title="Opis"
              style={{ marginTop: 16 }}
            >
              {author.bio}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default LibrarianDetails;
