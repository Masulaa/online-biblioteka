import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../../api/api"
import {
  EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import "./evidention.css";

import { Table, Dropdown, Menu, Modal } from "antd";

const ArchivedReservationTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }


  const [arhivirane, setArhivirane] = useState([]);


  const fetchBooksRezervacije = async () => {
    try {
      const response = await BookService.GetAllReserveBook();
      setArhivirane(response.data.data.archive);
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
    withLoading(fetchBooksRezervacije)
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

  const renderBookName = (text, arhivirane) => {
    return (
      <span>
        {arhivirane.knjiga.title}
      </span>
    );
  };

  const renderStudentName = (text, arhivirane) => {
    return (
      <span>
        {arhivirane.student.name} {arhivirane.student.surname}
      </span>
    );
  };

  const renderDate = (text, arhivirane) => {
    return (
      <span>
        {arhivirane.borrow_date}
      </span>
    );
  };


  const renderStatus = (text, arhivirane) => {
    return (
      <span>
        {arhivirane.status} 
      </span>
    );
  };


  const Item = Menu.Item

  const navigateToDetails = (bookId) => navigate(`/EvidentionOfBooks/${bookId}`);

  const menu = (recordId) =>
  <Menu>
    <Item onClick={() =>(recordId)}>Izdaj knjigu</Item>
  </Menu>


  const columns = [
    {
      title: "Naziv knjige",
      dataIndex: "name",
      render: renderBookName,
      sorter: (a, b) => compareStrings(a.name, b.name),
    },
    {
        title: "Datum izdavanja",
        dataIndex: "name",
        render: renderDate,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  arhivirane.map((date) => {
            return {
                text: date.borrow_date,
                value: date.borrow_date,
            };
          }),
          onFilter: (value, record) =>
          `${record.borrow_date} `.startsWith(value),
      },
    {
        title: "Rezervisano za učenika",
        dataIndex: "name",
        render: renderStudentName,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  arhivirane.map((student) => {
            return {
                text: student.student.name + " " + student.student.surname,
                value: student.student.name + " " + student.student.surname,
            };
          }),
          onFilter: (value, record) =>
          `${record.student.name} ${record.student.surname}`.startsWith(value),
      },
      
      {
        title: "Status",
        dataIndex: "name",
        render: renderStatus,
        sorter: (a, b) => compareStrings(a.name, b.name),
        filters:  arhivirane.map((date) => {
            return {
                text: date.status,
                value: date.status,
            };
          }),
          onFilter: (value, record) =>
          `${record.status} `.startsWith(value),
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
      dataSource={arhivirane}
      rowKey="id"
      pagination={pagination}
      loading={loading}
    />
  );
};

export default ArchivedReservationTable;
