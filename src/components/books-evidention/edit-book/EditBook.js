import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./EditBook.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BookService } from "../../../api/api";

import { Steps, Input, Select, Space } from "antd";

import {
  DatabaseOutlined,
  RetweetOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

function EditBook() {
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
  const [currentStep, setCurrentStep] = useState(1);
  const [currentStepperId, setStepId] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    console.log("On current step change", currentStep);
    if (currentStep == 1) {
      setStepId(0);
    } else {
      setStepId(1);
    }
  }, [currentStep]);

  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BookService.EditBookInfo(id);
        setBook(response.data.data);
      } catch (error) {
        console.log("Error fetching book:", error);
      }
    };

    fetchBook();
  }, []);

  const [book, setBook] = useState([]);

  const navigate = useNavigate();
  const EditBook = async () => {
    try {
      const response = await BookService.EditBook(newBookData, id);
      console.log("API Response", response);
      navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error editing an book", error);
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
    },
    {
      title: "Specifikacije",
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
  // const items = [
  //   {
  //     key: 1,
  //     label: (
  //       <div>
  //         <DatabaseOutlined />
  //         <span>Osnovni Detalji</span>
  //       </div>
  //     ),
  //     children: (
  //     ),
  //   },
  //   {
  //     key: 2,
  //     label: (
  //       <div>
  //         <ProfileOutlined />
  //         <span>Specifikacije</span>
  //       </div>
  //     ),
  //     children: (
  //     ),
  //   },
  // ];

  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
          {/* <Headbar naslov="Nova Knjiga"> */}
          <div class="headbar">
            <h2 className="naslov">Izmjeni Knjigu</h2>
            <p class="breadcrumbs">
              <Link to="/EvidentionOfBooks">
                <span className="paragraf">Evidencija Knjiga</span>
              </Link>{" "}
              / Izmjeni Knjigu
            </p>
          </div>

          <div>
            <div>
              <Steps
                current={currentStepperId}
                percent={50}
                labelPlacement="vertical"
                items={step1}
                style={{margin:'1rem 0rem'}}
              />
              {/* <Tabs
                defaultActiveKey={currentStep.toString()}
                activeKey={currentStep}
                items={items}
                onChange={(key) => setCurrentStep(key)}
                tabPosition="top"
              ></Tabs> */}
              {currentStep == 1 && (
                <div className="flex-columns">
                  <div className="column">
                    <label>Naziv Knjige</label>
                    <Input
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                    />
                    <label>Kratki sadržaj</label>
                    <TextArea
                      showCount
                      maxLength={100}
                      rows={3}
                      onChange={(e) => setSadrzaj(e.target.value)}
                      
                      mode
                    />
                    <label>Izaberite kategorije</label>
                    <Select
                      onChange={(selectedCategories) =>
                        setCategories(selectedCategories)
                      }
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite kategorije"
                      optionLabelProp="label"
                    >
                      {book.categories &&
                        book.categories.map((category) => (
                          <Option
                            key={category.id}
                            value={category.id}
                            label={category.name}
                          >
                            <Space>{category.name}</Space>
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
                          <Option
                            key={zanr.id}
                            value={zanr.id}
                            label={zanr.name}
                          >
                            <Space>{zanr.name}</Space>
                          </Option>
                        ))}
                    </Select>
                  </div>
                  <div className="column">
                    <label>Izaberite autore</label>
                    <Select
                      onChange={(selectedAuthors) =>
                        setAuthors(selectedAuthors)
                      }
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite autore"
                      optionLabelProp="label"
                    >
                      {book.authors &&
                        book.authors.map((autor) => (
                          <Option
                            key={autor.id}
                            value={autor.id}
                            label={autor.name + " " + autor.surname}
                          >
                            <Space>
                              {autor.name}
                              {autor.surname}
                            </Space>
                          </Option>
                        ))}
                    </Select>
                    <label>Izdavač</label>
                    <Select
                      onChange={(selectedPublishers) =>
                        setPublisher(selectedPublishers)
                      }
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite izdavač"
                      optionLabelProp="label"
                    >
                      {book.publishers &&
                        book.publishers.map((izdavac) => (
                          <Option
                            key={izdavac.id}
                            value={izdavac.id}
                            label={izdavac.name}
                          >
                            <Space>{izdavac.name}</Space>
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
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="submit"
                      >
                        Dalje
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep == 2 && (
                <div className="container2">
                  <div className="info">
                    <label>Broj Stranica</label>
                    <Input
                      type="number"
                      
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
                          <Option
                            key={pismo.id}
                            value={pismo.id}
                            label={pismo.name}
                          >
                            <Space>{pismo.name}</Space>
                          </Option>
                        ))}
                    </Select>
                    <label>Jezici</label>
                    <Select
                      onChange={(selectedLanguages) =>
                        setLanguage(selectedLanguages)
                      }
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite jezik"
                      optionLabelProp="label"
                    >
                      {book.languages &&
                        book.languages.map((jezik) => (
                          <Option
                            key={jezik.id}
                            value={jezik.id}
                            label={jezik.name}
                          >
                            <Space>{jezik.name}</Space>
                          </Option>
                        ))}
                    </Select>
                    <label>Povez</label>
                    <Select
                      onChange={(selectedBookBind) =>
                        setBinding(selectedBookBind)
                      }
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite povez"
                      optionLabelProp="label"
                    >
                      {book.bookbinds &&
                        book.bookbinds.map((povez) => (
                          <Option
                            key={povez.id}
                            value={povez.id}
                            label={povez.name}
                          >
                            <Space>{povez.name}</Space>
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
                          <Option
                            key={format.id}
                            value={format.id}
                            label={format.name}
                          >
                            <Space>{format.name}</Space>
                          </Option>
                        ))}
                    </Select>
                    <label>ISBN</label>
                    <Input
                      
                      maxLength={13}
                      onChange={(e) => setIsbn(e.target.value)}
                    />
                    <div className="buttons-spec">
                      <button className="cancel" onClick={() => setCurrentStep(1)}>
                        Nazad
                      </button>
                      <button
                        className="submit"
                        onClick={() => {
                          EditBook();
                        }}
                      >
                        Sačuvaj
                      </button>{" "}
                    </div>
                  </div>
                </div>
              )}
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

export default EditBook;