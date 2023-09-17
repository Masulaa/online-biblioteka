import React, { useState, useEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../api/api";
// import LoadingSpinner from "../account-components/loading-spinner/LoadingSpinner";
// import AuthorSingle from "./AuthorSingle";
import {
  EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import { Table, Dropdown, Menu, Modal } from "antd";

const BookTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }


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
      title: 'Potvrdi',
      icon: <ExclamationCircleOutlined />,
      content: 'Da li ste sigurni da zelite obrisati autora?',
      okText: 'Da, Obrisi',
      cancelText: 'Ne',
      onOk: () => deleteBook(id)
    });
  };

  // confirm(1);

  useEffect(() => {
    withLoading(fetchBooks)
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
    return (
      <span>
        {book.title}
      </span>
    );
  };

  const renderAuthors = (text, book) => {
    return (
      <span>
        {book.authors.map((a) => `${a.name} ${a.surname}`).join(", ")}
      </span>
    );
  };

  const renderCategories = (text, book) => {
    return (
      <span>
        {book.categories.map((c) => c.name).join(", ")}
      </span>
    )
  }

  const renderAbleToBorrow = (text, book) => {
    return (
      <span>
        {book.ableToBorrow ? "Da" : "Ne"}
      </span>
    )
  }

  const renderReserved = (text, book) =>{
    return (
      <span>
        {book.rSamples}
      </span>
    )
  }

  const renderBorrowed = (text, book) =>{
    return (
      <span>
        {book.bSamples}
      </span>
    )
  }

  const renderFSamples = (text, book) =>{
    return (
      <span>
        {book.fSamples}
      </span>
    )
  }

  const renderAllSamples = (text, book) =>{
    return (
      <span>
        {book.samples}
      </span>
    )
  }

  const Item = Menu.Item

  const navigateToDetails = (bookId) => navigate(`/EvidentionOfBooks/BookDetails/${bookId}`);
  const navigateToEdit = (bookId) => navigate(`/EvidentionOfBooks/EditBook/${bookId}`);

  const deleteBook = async (bookId) => {
    try {
      setLoading(true)
      await BookService.DeleteBooks(bookId);
      setLoading(false)
      fetchBooks();
    } catch (error) {

      console.error("Error deleting book:", error)
    }
  };

  const menu = (recordId) =>
  <Menu>
    <Item onClick={() => navigateToDetails(recordId)}>Detalji</Item>
    <Item onClick={() => navigateToEdit(recordId)}>Izmijeni</Item>
    <Item onClick={() => confirm(recordId)}><DeleteOutlined /> Obrisi</Item>
  </Menu>


  const columns = [
    {
      title: "Naziv Knjige",
      dataIndex: "name",
      render: renderTitleAndImage,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: books.map((book) => {
        return {
          text: book.title,
          value: book.title,
        };
      }),
      onFilter: (value, record) =>
        `${record.title}`.startsWith(value),
    },
    {
      title: "Autori",
      dataIndex: "autori",
      render: renderAuthors,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: books.map((book)=>{
        return {
          text: `${book.authors.map((a) => `${a.name} ${a.surname}`).join(", ")}`,
          value: `${book.authors.map((a) => `${a.name} ${a.surname}`).join(", ")}`,
        }
      }),
      onFilter: (value, record) =>
      `${record.authors.map((a) => `${a.name} ${a.surname}`).join(", ")}`.startsWith(value),
    },
    {
      title: "Kategorije",
      dataIndex: "name",
      render: renderCategories,
      sorter: (a, b) => compareStrings(a.name, b.name),
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
      dataIndex: "name",
      render: renderAbleToBorrow,
      sorter: (a, b) => compareStrings(a.name, b.name),
    },
    {
      title: "Rezervisano",
      dataIndex: "name",
      render: renderReserved,
      sorter: (a, b) => a.rSamples - b.rSamples,
    },
    {
      title: "Izdato",
      dataIndex: "name",
      render: renderBorrowed,
      sorter: (a, b) => a.bSamples - b.bSamples,
    },  
    {
      title: "U preokoračenju",
      dataIndex: "name",
      render: renderFSamples,
      sorter: (a, b) => a.fSamples - b.fSamples,
      
    },  
    {
      title: "Ukupna količina",
      dataIndex: "name",
      render: renderAllSamples,
      sorter: (a, b) => a.samples - b.samples,
    },  
    {
      title: "",
      dataIndex: "action",
      fixed: "right",
      render: (text, record) => (
        <Dropdown overlay={menu(record.id)} trigger={[`click`]}>
        <EllipsisOutlined />
      </Dropdown>
    
      ),
    },
  ];

  const handleMenuClick = (e) => {
    console.log(e)
    const book = {
      id: 0
    }
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
  );
};

export default BookTable;
