import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../../api/api"
import {
  EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import { Table, Dropdown, Menu, Modal } from "antd";

import "./evidention.css";

const ToReturnBookTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }


  const [vracene, setVracene] = useState([]);


  const fetchBooksVracene = async () => {
    try {
      const response = await BookService.GetAllIzdajBook();
      setVracene(response.data.data.vracene);
    } catch (error) {
      console.log("Error fetching to give info:", error);
    }
  };

  const confirm = (id) => {
    Modal.confirm({
      title: 'Potvrdi',
      icon: <ExclamationCircleOutlined />,
      content: 'Da li ste sigurni da zelite obrisati bibliotekara?',
      okText: 'Da, Obrisi',
      cancelText: 'Ne',
      onOk: () => (id)
    });
  };

  // confirm(1);

  useEffect(() => {
    withLoading(fetchBooksVracene)
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

  const renderBookName = (text, vracene) => {
    return (
      <span>
        {vracene.knjiga.title}
      </span>
    );
  };

  const renderStudentName = (text, vracene) => {
    return (
      <span>
        {vracene.student.name} {vracene.student.surname}
      </span>
    );
  };

  const renderBorrowDate = (text, vracene) => {
    return (
      <span>
        {vracene.borrow_date}
      </span>
    );
  };

  const renderReturnDate = (text, vracene) => {
    return (
      <span>
        {vracene.return_date}
      </span>
    );
  };

  const renderStatus = (text, vracene) => {
    return (
      <span>
        {vracene.status} 
      </span>
    );
  };

  const renderLibrarianWhoGot = (text, vracene) => {
    return (
      <span>
        {vracene.bibliotekar1.name} {vracene.bibliotekar1.surname}
      </span>
    );
  };


  const Item = Menu.Item

  const navigateToDetails = (bookId) => navigate(`/EvidentionOfBooks/${bookId}`);

  const menu = (recordId) =>
  <Menu>
    <Item onClick={() =>(recordId)}>Otpiši knjigu</Item>
    <Item onClick={() =>(recordId)}>Vrati knjigu</Item>
  </Menu>


  const columns = [
    {
      title: "Naziv knjige",
      dataIndex: "name",
      render: renderBookName,
      sorter: (a, b) => compareStrings(a.name, b.name),
    },
    {
        title: "Izdato učeniku",
        dataIndex: "name",
        render: renderStudentName,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  vracene.map((student) => {
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
        render: renderBorrowDate,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  vracene.map((date) => {
            return {
                text: date.borrow_date,
                value: date.borrow_date,
            };
          }),
          onFilter: (value, record) =>
          `${record.borrow_date} `.startsWith(value),
      },
      {
        title: "Datum vraćanja",
        dataIndex: "name",
        render: renderReturnDate,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  vracene.map((date) => {
            return {
                text: date.return_date,
                value: date.return_date,
            };
          }),
          onFilter: (value, record) =>
          `${record.return_date} `.startsWith(value),
      },
      {
        title: "Status",
        dataIndex: "name",
        render: renderStatus,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  vracene.map((date) => {
            return {
                text: date.status,
                value: date.status,
            };
          }),
          onFilter: (value, record) =>
          `${record.status} `.startsWith(value),
      },
      {
        title: "Knjigu primio",
        dataIndex: "name",
        render: renderLibrarianWhoGot,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  vracene.map((librarian) => {
            return {
                text: librarian.bibliotekar1.name,
                value: librarian.bibliotekar1.surname,}
          }),
          onFilter: (value, record) =>
          `${record.bibliotekar1.name} ${record.bibliotekar1.surname} `.startsWith(value),
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
      dataSource={vracene}
      rowKey="id"
      pagination={pagination}
      loading={loading}
    />
  );
};

export default ToReturnBookTable;
