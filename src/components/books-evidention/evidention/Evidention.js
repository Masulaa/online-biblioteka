import AuthorTable from "../../author/AuthorTable";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {useState} from 'react'

import { Tabs } from "antd";

import {
    RetweetOutlined
  } from '@ant-design/icons';

// import illustration2 from "../../images/undraw_bibliophile_re_xarc.svg"

function Evidention() {
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const [activeKey, setActiveKey] = useState('1')
  const onKeyChange = (key) => setActiveKey(key)

  const leasedBooks = () => {
    return <div><AuthorTable /></div>
  }

  const items = [
    {
      key: "1",
      label: <div><RetweetOutlined /><span>Iznajmljene knjige</span></div>,
      children: <AuthorTable/>,
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];

  const navigate = useNavigate();
  return (
    <body>
      <div className={`blur ${isMenuOpen ? "blur-showed" : ""}`}>
        <div className="naslov">
          <div className="illustrations">
            {/* <img src={illustration2} className="illustration" />  */}
            <h1>Autori</h1>
          </div>
        </div>
        <div className="line2"></div>
        <div className="table-header">
          <button
            className="default-button"
            onClick={() => {
              navigate("/AuthorEvidention/NewAuthor");
            }}
          >
            Novi Autor
          </button>
        </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onKeyChange} tabPosition="left"></Tabs>
      </div>
    </body>
  );
}

export default Evidention;
