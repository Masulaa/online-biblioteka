import React, { useState, useEffect } from "react";
import "./StudentTable.css";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../api/api";
// import LoadingSpinner from "../account-components/loading-spinner/LoadingSpinner";
// import AuthorSingle from "./AuthorSingle";
import {
  EllipsisOutlined, DeleteOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import { Table, Dropdown, Menu, Modal } from "antd";

const StudentTable = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const withLoading = async (method) => {
    setLoading(true)
    await method()
    setLoading(false)
  }


  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    try {
      const response = await UserService.ListUsers();
      const ucenici = response.data.data.filter(user => user.role === "Učenik");
      setUsers(ucenici);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const confirm = (id) => {
    Modal.confirm({
      title: 'Potvrdi',
      icon: <ExclamationCircleOutlined />,
      content: 'Da li ste sigurni da zelite obrisati učenika?',
      okText: 'Da, Obrisi',
      cancelText: 'Ne',
      onOk: () => deleteUser(id)
    });
  };

  // confirm(1);

  useEffect(() => {
    withLoading(fetchUsers)
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

  const renderFirstLastName = (text, user) => {
    return (
      <span>
         <div className="usrslk">
    <img src={user.photoPath}></img>
  
        {user.name} {user.surname}  </div>
      </span>
    );
  };

  const renderEmail = (text, user) => {
    return (
      <span>
        {user.email}
      </span>
    );
  };

  const Item = Menu.Item

  const navigateToDetails = (userId) => navigate(`/StudentEvidention/StudentDetails/${userId}`);
  const navigateToEdit = (userId) => navigate(`/StudentEvidention/EditStudent/${userId}`);

  const deleteUser = async (userId) => {
    try {
      setLoading(true)
      await UserService.DeleteUsers(userId);
      setLoading(false)
      fetchUsers();
    } catch (error) {

      console.error("Error deleting book:", error)
    }
  };

  const menu = (recordId) =>
  <Menu>
    <Item onClick={() => navigateToDetails(recordId)}>Detalji</Item>
    <Item onClick={() => navigateToEdit(recordId)}>Izmijeni</Item>
    <Item onClick={() => confirm(recordId)}><DeleteOutlined /> Obriši</Item>
  </Menu>


  const columns = [
    {
      title: "Naziv Učenika",
      dataIndex: "name",
      render: renderFirstLastName,
      sorter: (a, b) => compareStrings(a.name, b.name),
      filters: users.map((user) => {
        return {
          text: user.name + " " + user.surname,
          value: user.name + " " + user.surname,
        };
      }),
      onFilter: (value, record) =>
        `${record.name} ${record.surname}`.startsWith(value),
    },
    {
      title: "Email Učenika",
      dataIndex: "email",
      render: renderEmail,
      sorter: (a, b) => compareStrings(a.email, b.email),
      filters: users.map((user) => {
        return {
          text: user.email,
          value: user.email,
        };
      }),
      onFilter: (value, record) =>
        `${record.email}`.startsWith(value),
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
    const user = {
      id: 0
    }
    switch (e.key) {
      case 1:
        navigate(`/StudentEvidention/StudentDetails/${user.id}`);
        break;
      case 2:
        navigate(`/StudentEvidention/EditStudent/${user.id}`);
        break;

      case 3:
        break;

        default:
          console.error("No default case");
    }
    if (e.key === 2) {
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
      dataSource={users}
      rowKey="id"
      pagination={pagination}
      loading={loading}
    />
  );
};

export default StudentTable;
