import ToGiveBookTable from "./ToGiveBookTable"

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {useState} from 'react'

import { Tabs } from "antd";

import {
    RetweetOutlined,
    SnippetsFilled,
    WarningFilled,
    CarryOutFilled,
    CalendarFilled
  } from '@ant-design/icons';

// import illustration2 from "../../images/undraw_bibliophile_re_xarc.svg"

function Evidention() {
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);
  const [activeKey, setActiveKey] = useState('1')
  const onKeyChange = (key) => setActiveKey(key)


  const items = [
    {
      key: "1",
      label: <div><RetweetOutlined /><span>Iznajmljene knjige</span></div>,
      children: <ToGiveBookTable/>,
    },
    {
      key: "2",
      label: <div><SnippetsFilled /><span>Vraćene knjige</span></div>,
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: <div><WarningFilled /><span>Knjige u prekoračenju</span></div>,
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: <div><CarryOutFilled /><span>Aktivne rezervacije</span></div>,
      children: "Content of Tab Pane 4",
    },
    {
      key: "5",
      label: <div><CalendarFilled /><span>Arhivirane rezervacije</span></div>,
      children: "Content of Tab Pane 5",
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
