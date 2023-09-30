import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DragDrop from "../../dragdropupload/DragDrop";
import "./NewBook.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BookService } from "../../../api/api";
import { Tabs, Steps, Input, Select, Space, message } from "antd";
import {
  DatabaseOutlined,
  RetweetOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

function NewBook() {
  const [bookName, setBookName] = useState("");
  const [sadrzaj, setSadrzaj] = useState("");
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [script, setScript] = useState("");
  const [language, setLanguage] = useState("");
  const [binding, setBinding] = useState("");
  const [format, setFormat] = useState("");
  const [isbn, setIsbn] = useState("");
  const [errors, setErrors] = useState({});
  const [step1ValidationPassed, setStep1ValidationPassed] = useState(false);

  const [activeKey, setActiveKey] = useState("1");
  const onKeyChange = (key) => setActiveKey(key);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentStepperId, setStepId] = useState(0);

  useEffect(() => {
    console.log("On current step change", currentStep);
    if (currentStep === 1) {
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
      message.destroy();
      if (currentStep === 1) {
        // Provjerava se da li je trenutni korak prvi
        if (
          !bookName ||
          !publisher ||
          !year ||
          !quantity ||
          !sadrzaj ||
          categories.length === 0 ||
          genres.length === 0 ||
          authors.length === 0
        ) {
          setErrors({ allFieldsRequired: true });
          message.error("Sva polja su obavezna");
          return;
        } else {
          setStep1ValidationPassed(true);
        }
      } else if (currentStep === 2) {
        // Provjerava se da li je trenutni korak drugi
        if (
          !numOfPages ||
          !script ||
          !language ||
          !binding ||
          !format ||
          !isbn
        ) {
          setErrors({ allFieldsRequired: true });
          message.error("Sva polja su obavezna");
          return;
        }
      }

      // Ako nije trenutni korak ni 1 ni 2, to znači da korisnik nije ništa promijenio, ne radi se validacija

      const response = await BookService.CreateBook(newBookData);
      console.log("API Response", response);
      message.success("Knjiga je uspješno kreirana");
      navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Error creating a book", error);
      message.error("Knjiga nije kreirana");
      setErrors(error.response.data.data);
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

  return (
    <Fragment>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="">
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
              <Steps
                current={currentStepperId}
                percent={50}
                labelPlacement="vertical"
                items={step1}
                style={{ margin: "1rem 0rem" }}
              />
              {currentStep == 1 && (
                <div className="flex-columns">
                  <div className="column">
                    <label>Naziv Knjige</label>
                    <Input
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                    />
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje naziv knjige je obavezno.
                      </p>
                    ) : (
                      errors.nazivKnjiga && (
                        <p className="error-text">{errors.nazivKnjiga}</p>
                      )
                    )}
                    <label>Kratki sadržaj</label>
                    <TextArea
                      showCount
                      maxLength={100}
                      rows={3}
                      onChange={(e) => setSadrzaj(e.target.value)}
                    />
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje Kratki sadrzaj je obavezno.
                      </p>
                    ) : (
                      errors.kratki_sadrzaj && (
                        <p className="error-text">{errors.kratki_sadrzaj}</p>
                      )
                    )}
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
                      value={categories}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje Izaberite kategorije je obavezno.
                      </p>
                    ) : (
                      errors.categories && (
                        <p className="error-text">{errors.categories}</p>
                      )
                    )}
                    <label>Izaberite žanrove</label>
                    <Select
                      onChange={(selectedGenres) => setGenres(selectedGenres)}
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite zanrove"
                      optionLabelProp="label"
                      value={genres}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje Izaberite zanorve je obavezno.
                      </p>
                    ) : (
                      errors.genres && (
                        <p className="error-text">{errors.genres}</p>
                      )
                    )}
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
                      value={authors}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje Izaberite Autore je obavezno.
                      </p>
                    ) : (
                      errors.authors && (
                        <p className="error-text">{errors.authors}</p>
                      )
                    )}
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
                      value={publisher}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje Izdavac je obavezno.
                      </p>
                    ) : (
                      errors.izdavac && (
                        <p className="error-text">{errors.izdavac}</p>
                      )
                    )}
                    <label>Godina Izdavanja</label>
                    <Input
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      min="1980"
                      max="2024"
                      maxLength="4"
                    />
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje Godina izdavanja je obavezno.
                      </p>
                    ) : (
                      errors.year && (
                        <p className="error-text">{errors.year}</p>
                      )
                    )}
                    <label>Količina</label>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje kolicina je obavezno.
                      </p>
                    ) : (
                      errors.knjigaKolicina && (
                        <p className="error-text">{errors.knjigaKolicina}</p>
                      )
                    )}
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
                        onClick={() => {
                          if (step1ValidationPassed) {
                            setCurrentStep(2);
                          } else {
                            if (
                              bookName &&
                              publisher &&
                              year &&
                              quantity &&
                              sadrzaj &&
                              categories.length > 0 &&
                              genres.length > 0 &&
                              authors.length > 0
                            ) {
                              setCurrentStep(2);
                              setStep1ValidationPassed(true);
                            } else {
                              setErrors({ allFieldsRequired: true });
                              message.error("Sva polja su obavezna");
                            }
                          }
                        }}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">
                        Polje Broj stranica je obavezno.
                      </p>
                    ) : (
                      errors.brStrana && (
                        <p className="error-text">{errors.brStrana}</p>
                      )
                    )}
                    <label>Pismo</label>
                    <Select
                      onChange={(selectedScripts) => setScript(selectedScripts)}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite pismo"
                      optionLabelProp="label"
                      value={script}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">Polje pismo je obavezno.</p>
                    ) : (
                      errors.pismo && (
                        <p className="error-text">{errors.pismo}</p>
                      )
                    )}
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
                      value={language}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">Polje Jezik je obavezno.</p>
                    ) : (
                      errors.jezik && (
                        <p className="error-text">{errors.jezik}</p>
                      )
                    )}
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
                      value={binding}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">Polje Povez je obavezno.</p>
                    ) : (
                      errors.povez && (
                        <p className="error-text">{errors.povez}</p>
                      )
                    )}
                    <label>Format</label>
                    <Select
                      onChange={(selectedFormat) => setFormat(selectedFormat)}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Odaberite format"
                      optionLabelProp="label"
                      value={format}
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
                    {errors.allFieldsRequired ? (
                      <p className="error-text">Polje Format je obavezno.</p>
                    ) : (
                      errors.format && (
                        <p className="error-text">{errors.format}</p>
                      )
                    )}
                    <label>ISBN</label>
                    <Input
                      maxLength={13}
                      onChange={(e) => setIsbn(e.target.value)}
                      value={isbn}
                    />
                    {errors.allFieldsRequired ? (
                      <p className="error-text">Polje ISBN je obavezno.</p>
                    ) : (
                      errors.isbn && (
                        <p className="error-text">{errors.isbn}</p>
                      )
                    )}
                    <div className="buttons-spec">
                      <button
                        className="cancel"
                        onClick={() => setCurrentStep(1)}
                      >
                        Nazad
                      </button>
                      <button className="submit" onClick={CreateBook}>
                        Sačuvaj
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewBook;
