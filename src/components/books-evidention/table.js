import React, { useState, useEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../api/api";
// import LoadingSpinner from "../account-components/loading-spinner/LoadingSpinner";
// import AuthorSingle from "./AuthorSingle";
import {
  EllipsisOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  EditOutlined,
  EnterOutlined,
  SendOutlined,
  RollbackOutlined,
  FileOutlined,
} from "@ant-design/icons";

import { Table, Dropdown, Menu, Modal, Button } from "antd";

const BookTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

  const onSelectAllChange = (e) => {
    const selectedKeys = e.target.checked ? books.map((book) => book.id) : [];
    setSelectedRowKeys(selectedKeys);
    setSelectAll(e.target.checked);
  };

  const handleDeleteSelected = () => {
    try {
      const response = BookService.BulkDeleteBooks(selectedRowKeys);
      console.log("API Response", response);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const withLoading = async (method) => {
    setLoading(true);
    await method();
    setLoading(false);
  };

  const fetchBooks = async () => {
    try {
      const response = await BookService.ListBooks();
      setBooks(response.data.data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const confirm = (id) => {
    Modal.confirm({
      title: "Potvrdi",
      icon: <ExclamationCircleOutlined />,
      content: "Da li ste sigurni da zelite obrisati knjigu?",
      okText: "Da, Obrisi",
      cancelText: "Ne",
      onOk: () => deleteBook(id),
    });
  };

  // confirm(1);

  useEffect(() => {
    withLoading(fetchBooks);
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

  const renderTitleAndImage = (text, book) => {
    return <span>{book.title}</span>;
  };

  const renderAuthors = (text, book) => {
    return (
      <span>
        {book.authors.map((a) => `${a.name} ${a.surname}`).join(", ")}
      </span>
    );
  };

  const renderCategories = (text, book) => {
    return <span>{book.categories.map((c) => c.name).join(", ")}</span>;
  };

  const renderAbleToBorrow = (text, book) => {
    return <span>{book.ableToBorrow ? "Da" : "Ne"}</span>;
  };

  const renderReserved = (text, book) => {
    return <span>{book.rSamples}</span>;
  };

  const renderBorrowed = (text, book) => {
    return <span>{book.bSamples}</span>;
  };

  const renderFSamples = (text, book) => {
    return <span>{book.fSamples}</span>;
  };

  const renderAllSamples = (text, book) => {
    return <span>{book.samples}</span>;
  };

  const Item = Menu.Item;

  const deleteBook = async (bookId) => {
    try {
      setLoading(true);
      await BookService.DeleteBooks(bookId);
      setLoading(false);
      fetchBooks();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const navigateToDetails = (bookId) =>
    navigate(`/EvidentionOfBooks/BookDetails/${bookId}`);
  const navigateToEdit = (bookId) =>
    navigate(`/EvidentionOfBooks/EditBook/${bookId}`);
  const navigateToGiveBook = (bookId) => navigate(`/GiveBook/${bookId}`);
  const navigateToReserveBook = (bookId) => navigate(`/ReserveBook/${bookId}`);

  const menu = (recordId) => (
    <Menu>
      <Item onClick={() => navigateToDetails(recordId)}>
        <InfoCircleOutlined /> Detalji
      </Item>
      <Item onClick={() => navigateToEdit(recordId)}>
        <EditOutlined /> Izmijeni knjigu
      </Item>

      <Item onClick={() => recordId}>
        <EnterOutlined /> Otpiši knjigu
      </Item>
      <Item onClick={() => navigateToGiveBook(recordId)}>
        <SendOutlined /> Izdaj knjigu
      </Item>
      <Item onClick={() => recordId}>
        <RollbackOutlined /> Vrati knjigu
      </Item>
      <Item onClick={() => navigateToReserveBook(recordId)}>
        <FileOutlined /> Rezerviši knjigu
      </Item>
      <Item onClick={() => confirm(recordId)} danger="true">
        <DeleteOutlined /> Obriši knjigu
      </Item>
    </Menu>
  );

  const columns = [
    {
      title: "Naziv knjige",
      dataIndex: "knjiga",
      render: renderTitleAndImage,
      sorter: (a, b) => compareStrings(a.title, b.title),
      filters: books.map((book) => {
        return {
          text: book.title,
          value: book.title,
        };
      }),
      onFilter: (value, record) => `${record.title}`.startsWith(value),
    },
    {
      title: "Autori",
      dataIndex: "autor",
      render: renderAuthors,
      sorter: (a, b) => compareStrings(a.authors, b.authors),
      responsive: ["sm"],
      filters: books.map((book) => {
        return {
          text: `${book.authors
            .map((a) => `${a.name} ${a.surname}`)
            .join(", ")}`,
          value: `${book.authors
            .map((a) => `${a.name} ${a.surname}`)
            .join(", ")}`,
        };
      }),
      onFilter: (value, record) =>
        `${record.authors
          .map((a) => `${a.name} ${a.surname}`)
          .join(", ")}`.startsWith(value),
    },
    {
      title: "Kategorije",
      dataIndex: "kategorija",
      render: renderCategories,
      sorter: (a, b) => compareStrings(a.categories, b.categories),
      filters: books.map((book) => {
        return {
          text: `${book.categories.map((c) => c.name).join(", ")}`,
          value: `${book.categories.map((c) => c.name).join(", ")}`,
        };
      }),
      onFilter: (value, record) =>
        `${record.categories.map((c) => c.name).join(", ")}`.startsWith(value),
    },

    {
      title: "Na raspolaganju",
      dataIndex: "able",
      render: renderAbleToBorrow,
      sorter: (a, b) => compareStrings(a.able, b.able),
    },
    {
      title: "Rezervisano",
      dataIndex: "name",
      render: renderReserved,
      sorter: (a, b) => a.rSamples - b.rSamples,
      responsive: ["sm"],
    },
    {
      title: "Izdato",
      dataIndex: "name",
      render: renderBorrowed,
      sorter: (a, b) => a.bSamples - b.bSamples,
      responsive: ["sm"],
    },
    {
      title: "U prekoračenju",
      dataIndex: "name",
      render: renderFSamples,
      sorter: (a, b) => a.fSamples - b.fSamples,
      responsive: ["sm"],
    },
    {
      title: "Ukupna količina",
      dataIndex: "name",
      render: renderAllSamples,
      sorter: (a, b) => a.samples - b.samples,
    },
    {
      title: "Autor i kategorija",
      render: (record) => (
        <React.Fragment>
          {record.authors.map((a) => `${a.name} ${a.surname}`).join(", ")}
          <br />
          {record.categories.map((c) => c.name).join(", ")}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Rezervisano, izdato, u prekoračenju",
      render: (record) => (
        <React.Fragment>
          {record.rSamples} /
          <br />
          {record.bSamples} /
          <br />
          {record.fSamples}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title:
        selectedRowKeys.length > 0 ? (
          <Button type="primary" danger onClick={handleDeleteSelected}>
            Obriši selektovane
          </Button>
        ) : (
          "Akcije"
        ),
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Dropdown overlay={menu(record.id)} trigger={["click"]}>
            <EllipsisOutlined />
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    console.log(e);
    const book = {
      id: 0,
    };
    switch (e.key) {
      case 1:
        navigate(`/EvidentionOfBooks/BookDetails/${book.id}`);
        break;
      case 2:
        navigate(`/EvidentionOfBooks/EditBook/${book.id}`);
        break;

      case 3:
        break;

      default:
        console.error("No default case");
    }
    if (e.key == 2) {
      navigate("/EvidentionOfBooks/EditBook/BookDetails");
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
      <Table
        className="tabela"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={books}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        responsive={true}
      />
    </>
  );
};

export default BookTable;
