import "./BookDetails.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

import {
  MoreOutlined,
  SendOutlined,
  EnterOutlined,
  FileOutlined,
  RollbackOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";

import { BookService } from "../../../api/api";

import { Card, Tabs, Dropdown, Menu, Modal } from "antd";
const { Meta } = Card;

function BookDetails() {
  const [book, setBook] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  const { id } = useParams();

  const deleteBooks = async () => {
    try {
      const response = await BookService.DeleteBooks(book.id);
      console.log("API Response", response);
      navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error deleting book:", error);
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


  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="#">
          <EnterOutlined className="detail-icons" />
          Otpisi Knjigu
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/GiveBook/${book.id}`}>
          <SendOutlined className="detail-icons" />
          Izdaj Knjigu
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/ReserveBook/${book.id}`}>
          <FileOutlined className="detail-icons" />
          Rezerviši Knjigu
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="#">
          <RollbackOutlined className="detail-icons" />
          Vrati Knjigu
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to={`/EvidentionOfBooks/EditBook/${id}`}>
          <EditOutlined className="detail-icons" />
          Izmjeni Knjigu
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => confirm(id)} key="6" danger="true">
          <DeleteOutlined className="detail-icons" />
          Obriši Knjigu
      </Menu.Item>
    </Menu>
  );

  const confirm = (id) => {
    Modal.confirm({
      title: "Potvrdi",
      icon: <ExclamationCircleOutlined />,
      content: "Da li ste sigurni da zelite obrisati knjigu?",
      okText: "Da, Obrisi",
      cancelText: "Ne",
      onOk: () => deleteBooks(id),
    });
  };
  const items = [
    {
      key: "1",
      label: (
        <div>
          <span>Osnovni detalji</span>
        </div>
      ),
      children: (
        <>
          <div className="details-content">
            <div className="columns">
              <div>
                <Card type="inner" title="Naziv knjige">
                  {book.title}
                </Card>
                <Card
                  type="inner"
                  title="Kategorija/e"
                  style={{ marginTop: 16, width: 150 }}
                >
                  {book.categories &&
                    book.categories.map((kategorija) => (
                      <li className="li" key={kategorija.id}>
                        {kategorija.name}
                      </li>
                    ))}
                </Card>
                <Card
                  type="inner"
                  title="Žanr/ovi"
                  style={{ marginTop: 16, width: 150 }}
                >
                  {book.genres &&
                    book.genres.map((zanr) => (
                      <li className="li" key={zanr.id}>
                        {zanr.name}
                      </li>
                    ))}
                </Card>
                <Card
                  type="inner"
                  title="Žanr/ovi"
                  style={{ marginTop: 16, width: 150 }}
                >
                  {book.authors &&
                    book.authors.map((autor) => (
                      <li className="li" key={autor.id}>
                        {autor.name}
                      </li>
                    ))}
                </Card>

                <Card
                  type="inner"
                  title="Izdavač/či"
                  style={{ marginTop: 16, width: 150 }}
                >
                  {book.publisher && book.publisher.name}
                </Card>
                <Card
                  type="inner"
                  title="Godina izdavanja"
                  style={{ marginTop: 16, width: 150 }}
                >
                  {book.pDate}
                </Card>
              </div>
              <div className="second-column01">
                <Card type="inner" title="Storyline (Kratki sadržaj)">
                  {book.description}
                </Card>
              </div>
            </div>
            <Card
              style={{
                width: 300,
              }}
              type="inner"
              title="Informacije"
            >
              <div className="category-info">
                <div className="side-category00">
                  <span className="side-category01">Na raspolaganju:</span>
                  <span className="side-category01">Rezervisano:</span>
                  <span className="side-category01">Izdato:</span>
                  <span className="side-category01">U prekoračenju:</span>
                  <span className="side-category01">Ukupna količina:</span>
                </div>
                <div className="side-info00">
                  <span className="side-info01">
                    {book.samples -
                      book.rSamples -
                      book.bSamples -
                      book.fSamples}{" "}
                    primjeraka
                  </span>
                  <span className="side-info01">
                    {book.rSamples} primjeraka
                  </span>
                  <span className="side-info01">
                    {book.bSamples} primjeraka
                  </span>
                  <span className="side-info01">
                    {book.fSamples} primjeraka
                  </span>
                  <span className="side-info01">{book.samples} primjeraka</span>
                </div>
              </div>{" "}
            </Card>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <span>Specifikacija</span>
        </div>
      ),
      children: (
        <div className="details-content">
          <div className="columns">
            <div>
              <Card type="inner" title="Broj strana">
                {book.pages}
              </Card>
              <Card
                type="inner"
                title="Pismo"
                style={{ marginTop: 16, width: 150 }}
              >
                {book.script && book.script.name}
              </Card>
              <Card
                type="inner"
                title="Jezik"
                style={{ marginTop: 16, width: 150 }}
              >
                {book.language && book.language.name}
              </Card>
            </div>
            <div className="second-column01">
              <Card type="inner" title="Povez" style={{ width: 150 }}>
                {book.bookbind && book.bookbind.name}
              </Card>
              <Card
                type="inner"
                title="Format"
                style={{ marginTop: 16, width: 150 }}
              >
                {book.format && book.format.name}
              </Card>
              <Card
                type="inner"
                title="International Standard Book Number (ISBN)"
                style={{ marginTop: 16, width: 150 }}
              >
                {book.isbn}
              </Card>
            </div>
          </div>
          <Card
            style={{
              width: 300,
            }}
            type="inner"
            title="Informacije"
          >
            <div className="category-info">
              <div className="side-category00">
                <span className="side-category01">Na raspolaganju:</span>
                <span className="side-category01">Rezervisano:</span>
                <span className="side-category01">Izdato:</span>
                <span className="side-category01">U prekoračenju:</span>
                <span className="side-category01">Ukupna količina:</span>
              </div>
              <div className="side-info00">
                <span className="side-info01">
                  {book.samples - book.rSamples - book.bSamples - book.fSamples}{" "}
                  primjeraka
                </span>
                <span className="side-info01">{book.rSamples} primjeraka</span>
                <span className="side-info01">{book.bSamples} primjeraka</span>
                <span className="side-info01">{book.fSamples} primjeraka</span>
                <span className="side-info01">{book.samples} primjeraka</span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          <span>Multimedija</span>
        </div>
      ),
      children: (
        <div className="details-content">
          <div className="columns">
            <div>
              <Card type="inner" title="Multimedija" style={{ width: 200 }}>
                <img className="slika-user" src={book.photo} />
              </Card>
            </div>
          </div>
          <Card
            style={{
              width: 300,
            }}
            type="inner"
            title="Informacije"
          >
            <div className="category-info">
              <div className="side-category00">
                <span className="side-category01">Na raspolaganju:</span>
                <span className="side-category01">Rezervisano:</span>
                <span className="side-category01">Izdato:</span>
                <span className="side-category01">U prekoračenju:</span>
                <span className="side-category01">Ukupna količina:</span>
              </div>
              <div className="side-info00">
                <span className="side-info01">
                  {book.samples - book.rSamples - book.bSamples - book.fSamples}{" "}
                  primjeraka
                </span>
                <span className="side-info01">{book.rSamples} primjeraka</span>
                <span className="side-info01">{book.bSamples} primjeraka</span>
                <span className="side-info01">{book.fSamples} primjeraka</span>
                <span className="side-info01">{book.samples} primjeraka</span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="wrapper30">
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
                    / ID-{book.id}
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
      <Tabs
        defaultActiveKey={currentStep.toString()}
        items={items}
        onChange={(key) => setCurrentStep(parseInt(key))}
        tabPosition="top"
      ></Tabs>
    </>
  );
}

export default BookDetails;
