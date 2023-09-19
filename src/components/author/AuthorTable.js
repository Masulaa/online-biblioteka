import React, { useState, useEffect } from "react";
import "./AuthorTable.css";
import { useNavigate } from "react-router-dom";
import { AuthorService } from "../../api/api";
// import LoadingSpinner from "../account-components/loading-spinner/LoadingSpinner";
// import AuthorSingle from "./AuthorSingle";
import {
  EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import { Table, Dropdown, Menu, Modal } from "antd";

const AuthorTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }


  const fetchAuthors = async () => {
    try {
      const response = await AuthorService.ListAuthors();
      setAuthors(response.data.data);
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
      onOk: () => deleteAuthor(id)
    });
  };

  // confirm(1);

  useEffect(() => {
    withLoading(fetchAuthors)
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

  const renderFirstLastName = (text, author) => {
    return (
      <span>
        {author.name} {author.surname}
      </span>
    );
  };

  const Item = Menu.Item

  const navigateToDetails = (authorId) => navigate(`/AuthorEvidention/AuthorDetails/${authorId}`);
  const navigateToEdit = (authorId) => navigate(`/AuthorEvidention/EditAuthor/${authorId}`);

  const deleteAuthor = async (authorId) => {
    try {
      setLoading(true)
      await AuthorService.DeleteAuthors(authorId);
      setLoading(false)
      fetchAuthors();
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
      title: "Naziv Autora",
      dataIndex: "name",
      render: renderFirstLastName,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: authors.map((author) => {
        return {
          text: author.name + " " + author.surname,
          value: author.name + " " + author.surname,
        };
      }),
      onFilter: (value, record) =>
        `${record.name} ${record.surname}`.startsWith(value),
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
    const author = {
      id: 0
    }
    switch (e.key) {
      case 1:
        navigate(`/AuthorEvidention/AuthorDetails/${author.id}`);
        break;
      case 2:
        navigate(`/AuthorEvidention/EditAuthor/${author.id}`);
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
      dataSource={authors}
      rowKey="id"
      pagination={pagination}
      loading={loading}
    />
  );
};

export default AuthorTable;
