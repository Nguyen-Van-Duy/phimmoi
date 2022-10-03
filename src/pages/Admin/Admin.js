import React from 'react';
import 'antd/dist/antd.css';
import './Admin.css';
import { LaptopOutlined, NotificationOutlined, LogoutOutlined, BlockOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeAdmin from './HomeAdmin/HomeAdmin';
import AccountUser from './AccountUser/AccountUser';

const menu = [
  {
    key: "",
    label: `Home`,
    icon: <BlockOutlined />,
  },
  {
    key: "account",
    label: `Account`,
    icon: <BlockOutlined />,
  },
  {
    key: "movie",
    label: `Movie`,
    icon: <BlockOutlined />,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = 2 * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  }
]

const { Header, Content, Sider } = Layout;
const items1 = menu.map((key) => ({
  key: key.key,
  label: key.label,
  icon: <BlockOutlined />,
}));
const items2 = [BlockOutlined, BlockOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export default function Admin() {
  const navigate = useNavigate()
  const handleClick = (e) => {
    console.log(e);
    navigate(`/admin/${e.key}`)
  }
  return (
    <div className='admin__container'>
       <Layout>
    <Header className="header">
      <div className="logo" />
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      <div><LogoutOutlined /></div>
      </div>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          onClick={handleClick}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={items1}
        />
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
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
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="" element={<HomeAdmin />} />
            <Route path="/account" element={<AccountUser />} />
        </Routes>
        </Content>
      </Layout>
    </Layout>
  </Layout>
    </div>
  )
}
