import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookService } from "../../../api/api"
import {
  EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import { Table, Dropdown, Menu, Modal } from "antd";

const IzdajTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }


  const [izdate, setIzdate] = useState([]);


  const fetchBooksIzdavanja = async () => {
    try {
      const response = await BookService.GetAllIzdajBook();
      setIzdate(response.data.data.izdate);
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


  const Item = Menu.Item

  const navigateToDetails = (bookId) => navigate(`/EvidentionOfBooks/${bookId}`);

  const menu = (recordId) =>
  <Menu>
    <Item onClick={() => navigateToDetails(recordId)}>Detalji</Item>
  </Menu>


  const columns = [
    {
      title: "Naziv Knjige",
      dataIndex: "name",
      render: renderBookName,
      sorter: (a, b) => compareStrings(a.name, b.name),
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
      dataSource={izdate}
      rowKey="id"
      pagination={pagination}
      loading={loading}
    />
  );
};

export default IzdajTable;
