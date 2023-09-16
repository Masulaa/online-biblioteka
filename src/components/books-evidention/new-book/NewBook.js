import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DragDrop from "../../dragdropupload/DragDrop";
import "./NewBook.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BookService } from "../../../api/api";

import { Tabs, Steps, Input, Select, Space } from "antd";

import { RetweetOutlined } from "@ant-design/icons";

function NewBook() {
  const [bookName, setBookName] = useState("");
  const [sadrzaj, setSadrzaj] = useState("");
  const [categories, setCategories] = useState("");
  const [genres, setGenres] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [script, setScript] = useState("");
  const [language, setLanguage] = useState("");
  const [binding, setBinding] = useState("");
  const [format, setFormat] = useState("");
  const [isbn, setIsbn] = useState("");

  const [activeKey, setActiveKey] = useState("1");
  const onKeyChange = (key) => setActiveKey(key);

  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BookService.CreateBookInfo();
        setBook(response.data.data);
      } catch (error) {
        console.log("Error fetching book:", error);
      }
    };

    fetchBook();
  }, []);

  const [book, setBook] = useState([]);

  const navigate = useNavigate();
  const CreateBook = async () => {
    try {
      const response = await BookService.CreateBook(newBookData);
      console.log("API Response", response);
      // console.log(newBookData)

      // navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error creating an book", error);
    }
  };

  const newBookData = {
    nazivKnjiga: bookName,
    brStrana: numOfPages,
    pismo: script,
    jezik: language,
    povez: binding,
    format: format,
    izdavac: publisher,
    godinaIzdavanja: year,
    isbn: isbn,
    knjigaKolicina: quantity,
    kratki_sadrzaj: sadrzaj,
    deletePdfs: 0,
    categories: categories,
    genres: genres,
    authors: authors,
  };

  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const description = "Procesuiranje";
  const description1 = "Završeno";
  const description2 = "Sledi";
  const step1 = [
    {
      title: "Detalji",
      description,
    },
    {
      title: "Specifikacije",
      description2,
    },
  ];
  const step2 = [
    {
      title: "Detalji",
      description1,
    },
    {
      title: "Specifikacije",
      description,
    },
  ];
  const items = [
    {
      key: "1",
      label: (
        <div>
          <RetweetOutlined />
          <span>Osnovni Detalji</span>
        </div>
      ),
      children: (
        <div className="flex-columns">
          <div className="column">
            <label>Naziv Knjige</label>
            <Input
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              
            />
            <label>Kratki sadržaj</label>
            <TextArea showCount maxLength={100} rows={3}
              onChange={(e)=>setSadrzaj(e.target.value)}
              className="default-input"
              mode
            />
            <label>Izaberite kategorije</label>
            <Select
           onChange={(selectedCategories) => setCategories(selectedCategories)}
           mode="multiple"
           style={{
             width: "100%",
           }}
           placeholder="Odaberite kategorije"
           optionLabelProp="label"
            >
              {book.categories &&
                book.categories.map((category) => (
                  <Option key={category.id} value={category.id} label={category.name}>
                    <Space>
                      {category.name}
                    </Space>
                  </Option>
                ))}
            </Select>
            <label>Izaberite žanrove</label>
            <Select
           onChange={(selectedGenres) => setGenres(selectedGenres)}
           mode="multiple"
           style={{
             width: "100%",
           }}
           placeholder="Odaberite zanrove"
           optionLabelProp="label"
            >
              {book.genres &&
                book.genres.map((zanr) => (
                  <Option key={zanr.id} value={zanr.id} label={zanr.name}>
                    <Space>
                      {zanr.name}
                    </Space>
                  </Option>
                ))}
            </Select>
          </div>
          <div className="column">
            <label>Izaberite autore</label>
            <Select
           onChange={(selectedAuthors) => setAuthors(selectedAuthors)}
           mode="multiple"
           style={{
             width: "100%",
           }}
           placeholder="Odaberite autore"
           optionLabelProp="label"
            >
              {book.authors &&
                book.authors.map((autor) => (
                  <Option key={autor.id} value={autor.id} label={autor.name + " " + autor.surname}>
                    <Space>
                      {autor.name}{autor.surname}
                    </Space>
                  </Option>
                ))}
            </Select>
            <label>Izdavač</label>
            <Select
           onChange={(selectedPublishers) => setPublisher(selectedPublishers)}
           style={{
             width: "100%",
           }}
           placeholder="Odaberite izdavač"
           optionLabelProp="label"
            >
              {book.publishers &&
                book.publishers.map((izdavac) => (
                  <Option key={izdavac.id} value={izdavac.id} label={izdavac.name}>
                    <Space>
                      {izdavac.name}
                    </Space>
                  </Option>
                ))}
            </Select>
            <label>Godina Izdavanja</label>
            <Input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1980"
              max="2024"
              maxLength="4"
            />

            <label>Količina</label>
            <Input
              type="number"
              className="default-input"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
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
              <button className="submit" onChange={onKeyChange}>
                Dalje
              </button>
            </div>
          </div>
          <Steps
            current={0}
            percent={50}
            labelPlacement="vertical"
            items={step1}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <RetweetOutlined />
          <span>Specifikacije</span>
        </div>
      ),
      children: (
        <div className="container2">
          <div className="info">
            <label>Broj Stranica</label>
            <Input
              type="number"
              className="default-input"
              min="1"
              value={numOfPages}
              onChange={(e) => setNumOfPages(parseInt(e.target.value))}
            />
            <label>Pismo</label>
            <Select
           onChange={(selectedScripts) => setScript(selectedScripts)}
           style={{
             width: "100%",
           }}
           placeholder="Odaberite pismo"
           optionLabelProp="label"
            >
              {book.scripts &&
                book.scripts.map((pismo) => (
                  <Option key={pismo.id} value={pismo.id} label={pismo.name}>
                    <Space>
                      {pismo.name}
                    </Space>
                  </Option>
                ))}
            </Select>
            <label>Jezici</label>
            <Select
           onChange={(selectedLanguages) => setLanguage(selectedLanguages)}
           style={{
             width: "100%",
           }}
           placeholder="Odaberite jezik"
           optionLabelProp="label"
            >
              {book.languages &&
                book.languages.map((jezik) => (
                  <Option key={jezik.id} value={jezik.id} label={jezik.name}>
                    <Space>
                      {jezik.name}
                    </Space>
                  </Option>
                ))}
            </Select>
            <label>Povez</label>
            <Select
           onChange={(selectedBookBind) => setBinding(selectedBookBind)}
           style={{
             width: "100%",
           }}
           placeholder="Odaberite povez"
           optionLabelProp="label"
            >
              {book.bookbinds &&
                book.bookbinds.map((povez) => (
                  <Option key={povez.id} value={povez.id} label={povez.name}>
                    <Space>
                      {povez.name}
                    </Space>
                  </Option>
                ))}
            </Select>
            <label>Format</label>
            <Select
           onChange={(selectedFormat) => setFormat(selectedFormat)}
           style={{
             width: "100%",
           }}
           placeholder="Odaberite format"
           optionLabelProp="label"
            >
              {book.formats &&
                book.formats.map((format) => (
                  <Option key={format.id} value={format.id} label={format.name}>
                    <Space>
                      {format.name}
                    </Space>
                  </Option>
                ))}
            </Select>
            <label>ISBN</label>
            <Input
              className="default-input"
              maxLength={13}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <div className="buttons-spec">
              <button className="cancel" onClick>
                Nazad
              </button>
              <button className="submit" onClick={CreateBook}>
                Sačuvaj
              </button>{" "}
              <Steps
                current={1}
                percent={50}
                labelPlacement="vertical"
                items={step2}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
          {/* <Headbar naslov="Nova Knjiga"> */}
          <div class="headbar">
            <h2 className="naslov">Nova Knjiga</h2>
            <p class="breadcrumbs">
              <Link to="/EvidentionOfBooks">
                <span className="paragraf">Evidencija Knjiga</span>
              </Link>{" "}
              / Nova Knjiga
            </p>
          </div>

          <div>
            <div>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onKeyChange}
                tabPosition="top"
              ></Tabs>
            </div>

            {/* {currentStep === 3 && (
              <div className="container3">
                <DragDrop
                  handleFileNameChange={handleFileNameChange}
                  fileName={fileName}
                />
                <div className="buttons">
                  <button
                    className="cancel"
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                  >
                    Nazad
                  </button>
                  <button
                    className="cancel"
                    onClick={() => {
                      navigate("/EvidentionOfBooks");
                    }}
                  >
                    Poništi
                  </button>
                  <button className="submit" onClick={handleConfirm}>
                    Potvrdi
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewBook;
