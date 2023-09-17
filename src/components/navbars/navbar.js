import { UserService } from '../../api/api';
import { UserOutlined, LaptopOutlined, NotificationOutlined, PlusCircleOutlined, ReadOutlined, DashboardOutlined, TeamOutlined, UsergroupAddOutlined, BookOutlined, SolutionOutlined, AccountBookOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Avatar, Dropdown, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [
  {
    key: 'dashboard',
    icon: React.createElement(DashboardOutlined),
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    key: 'bibliotekari',
    icon: React.createElement(TeamOutlined),
    label: 'Bibliotekari',
    path: '/LibrarianEvidention',
  },
  {
    key: 'ucenici',
    icon: React.createElement(UsergroupAddOutlined),
    label: 'Ucenici',
    path: '/StudentEvidention',
  },
  {
    key: 'knjige',
    icon: React.createElement(BookOutlined),
    label: 'Knjige',
    path: '/EvidentionOfBooks',
  },
  {
    key: 'autori',
    icon: React.createElement(SolutionOutlined),
    label: 'Autori',
    path: '/AuthorEvidention',
  },
  {
    key: 'izdavanje-knjiga',
    icon: React.createElement(AccountBookOutlined),
    label: 'Izdavanje Knjiga',
    path: '/Evidention',
  },
  {
    key: 'settings',
    icon: React.createElement(SettingOutlined),
    label: 'Settings',
    path: '/Settings',
  },
];



const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };
  
  const LogOut = async () => {
    try {
      const response = await UserService.LogOut(true);
      console.log("API Response", response);

      // navigate("/EvidentionOfBooks");
    } catch (error) {
      console.error("Couldn't logout", error);
    }
  };
  
  const profileMenu = (
  <Menu>
    <Menu.Item key="profile">
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item key="logout">
      <Link to="/LogIn" onClick={LogOut}>Logout</Link>
    </Menu.Item>
  </Menu>
);

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#76a5af', // Postavite željenu boju
        }}
      >
        <div className="demo-logo">
          <Avatar icon={<ReadOutlined />} style={{ backgroundColor: 'transparent', color: 'white', fontSize: '25px' }} />
        </div>
        <h1 style={{ color: 'white', fontSize: '25px', margin: '0', padding: '0', lineHeight: '1' }}>
          Online Biblioteka
        </h1>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <PlusCircleOutlined style={{ color: "white", fontSize: '25px', marginRight: '16px', backgroundColor: '#51737b', borderRadius: '50%', padding: '4px', cursor: 'pointer' }} />
          <Avatar icon={<UserOutlined />} onClick={toggleProfileMenu} style={{ marginRight: '16px', cursor: 'pointer' }} />
          <Dropdown overlay={profileMenu} visible={profileMenuVisible} trigger={['click']} onClick={toggleProfileMenu} placement="bottom">
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} style={{ color: 'white', fontSize: '18px' }}>
              {/* Tekst "Profile" je uklonjen */}
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 12px',
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <div className='content-wrapper'>
              <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']} // Opciono postavite početno selektovanu opciju
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%',
                }}
              >
                {items2.map((item) => (
                  <Menu.Item key={item.key}>
                    <Link to={item.path} style={{ fontSize: '16px' }}>{item.icon} {item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </Sider>
          <div style={{ flex: 1, padding: '24px 12px', background: colorBgContainer}}>
          <Outlet/></div>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        <div className="demo-logo">
          <Avatar icon={<ReadOutlined />} style={{ backgroundColor: 'transparent', color: '#76a5af', fontSize: '25px' }} />
        </div>
        <h1 style={{ color: '#76a5af', fontSize: '25px', margin: '0', padding: '0', lineHeight: '1' }}>
          Online Biblioteka
        </h1>
        React Cortex Team Niksic | Elektroskola Niksic
      </Footer>
    </Layout>
  );
};
export default App;
