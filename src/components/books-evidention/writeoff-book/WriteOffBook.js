import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BookService } from "../../../api/api";

import { Table, Dropdown, Menu, Modal, message } from "antd";

import "./WriteOffBook.css";

import {
  MoreOutlined,
  SendOutlined,
  EnterOutlined,
  FileOutlined,
  RollbackOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const WriteOffBooks = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [book, setBook] = useState([]);

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

  const withLoading = async (method) => {
    setLoading(true);
    await method();
    setLoading(false);
  };

  const [izdate, setIzdate] = useState([]);

  const fetchBooksIzdavanja = async () => {
    try {
      const response = await BookService.GetSingleIzdajBook(id);
      setIzdate(response.data.data.izdate);
    } catch (error) {
      console.log("Error fetching to give info:", error);
    }
  };

  useEffect(() => {
    withLoading(fetchBooksIzdavanja);
  }, []);

  const compareStrings = function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };

  const renderStudentName = (text, izdate) => {
    return (
      <span>
        {izdate.student.name} {izdate.student.surname}
      </span>
    );
  };

  const renderDate = (text, izdate) => {
    return <span>{izdate.borrow_date}</span>;
  };

  const renderLibrarianWhoGave = (text, izdate) => {
    return (
      <span>
        {izdate.bibliotekar0.name} {izdate.bibliotekar0.surname}
      </span>
    );
  };

  const columns = [
    {
      title: "Izdato učeniku",
      dataIndex: "name",
      render: renderStudentName,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: izdate.map((student) => {
        return {
          text: student.student.name + " " + student.student.surname,
          value: student.student.name + " " + student.student.surname,
        };
      }),
      onFilter: (value, record) =>
        `${record.student.name} ${record.student.surname}`.startsWith(value),
    },
    {
      title: "Datum izdavanja",
      dataIndex: "name",
      render: renderDate,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: izdate.map((date) => {
        return {
          text: date.borrow_date,
          value: date.borrow_date,
        };
      }),
      onFilter: (value, record) => `${record.borrow_date} `.startsWith(value),
    },
    {
      title: "Knjigu izdao",
      dataIndex: "name",
      render: renderLibrarianWhoGave,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: izdate.map((librarian) => {
        return {
          text: librarian.bibliotekar0.name,
          value: librarian.bibliotekar0.surname,
        };
      }),
      onFilter: (value, record) =>
        `${record.bibliotekar0.name} ${record.bibliotekar0.surname} `.startsWith(
          value
        ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleWriteOffBooks = () => {
    try {
      const response = BookService.ToWriteOff(selectedRowKeys);
      console.log("API Response", response);
      message.success("Knjiga je uspješno otpisana");
      navigate("/EvidentionOfBooks")
    } catch (error) {
      console.error("Error deleting book:", error);
      message.error("Knjiga nije otpisana");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (current, newSize) => {
    setLoading(true);
    setPageSize(newSize);
    setLoading(false);
  };

  const pagination = {
    pageSize: pageSize,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["1", "10", "20", "50"],
    showSizeChanger: true,
    onShowSizeChange: handlePageSizeChange,
  };

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
      <h2>Otpiši knjigu</h2>
      <div style={{ marginBottom: 15, marginTop: 15 }}>
        <Table
          className="tabela"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={izdate}
          rowKey="id"
          pagination={pagination}
          loading={loading}
        />
      </div>
      <div className="buttons1">
        <button
          className="cancel"
          onClick={() => {
            navigate("/EvidentionOfBooks");
          }}
        >
          Poništi
        </button>
        <button
          className={`submit1 ${
            selectedRowKeys == 0 ? "" : "enabled1"
          }`}
          onClick={handleWriteOffBooks}
          disabled={selectedRowKeys == 0}
        >
          Otpiši knjigu
        </button>
      </div>
    </>
  );
};

export default WriteOffBooks;
