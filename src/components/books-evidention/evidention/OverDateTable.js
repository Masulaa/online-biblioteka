import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../../api/api"
import {
  EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import { Table, Dropdown, Menu, Modal } from "antd";

const OverDateTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }


  const [prekoracene, setPrekoracene] = useState([]);


  const fetchBooksIzdavanja = async () => {
    try {
      const response = await BookService.GetAllIzdajBook();
      setPrekoracene(response.data.data.prekoracene);
    } catch (error) {
      console.log("Error fetching overdate books info:", error);
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
    withLoading(fetchBooksIzdavanja)
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

  const renderBookName = (text, record) => {
    return (
      <span>
        {record.knjiga.title}
      </span>
    );
  };

  const renderStudentName = (text, izdate) => {
    return (
      <span>
        {izdate.student.name} {izdate.student.surname}
      </span>
    );
  };

  const renderDate = (text, izdate) => {
    return (
      <span>
        {izdate.borrow_date}
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
    },{
        title: "Datum izdavanja",
        dataIndex: "name",
        render: renderDate,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  prekoracene.map((date) => {
            return {
                text: date.borrow_date,
                value: date.borrow_date,
            };
          }),
          onFilter: (value, record) =>
          `${record.borrow_date} `.startsWith(value),
      },
    {
        title: "Izdato učeniku",
        dataIndex: "name",
        render: renderStudentName,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  prekoracene.map((student) => {
            return {
                text: student.student.name + " " + student.student.surname,
                value: student.student.name + " " + student.student.surname,
            };
          }),
          onFilter: (value, record) =>
          `${record.student.name} ${record.student.surname}`.startsWith(value),
      },
      {
        title: "Prethodno predvidjeni datum izdavanja",
        dataIndex: "name",
        render: renderReturnDate,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  prekoracene.map((date) => {
            return {
                text: date.borrow_date,
                value: date.borrow_date,
            };
          }),
          onFilter: (value, record) =>
          `${record.borrow_date} `.startsWith(value),
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
      dataSource={prekoracene}
      rowKey="id"
      pagination={pagination}
      loading={loading}
    />
  );
};

export default OverDateTable;
