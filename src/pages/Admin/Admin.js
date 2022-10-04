import React from 'react';
import 'antd/dist/antd.css';
import './Admin.css';
import { LaptopOutlined, NotificationOutlined, LogoutOutlined, BlockOutlined,AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeAdmin from './HomeAdmin/HomeAdmin';
import AccountUser from './AccountUser/AccountUser';
import MyMovie from '../../components/UserMannager/MyMovie/MyMovie';

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
  },
  {
    key: "my-movie",
    label: `My movie`,
    icon: <BlockOutlined />,
  },
]

const { Header, Content, Sider } = Layout;
const items1 = menu.map((key) => ({
  key: key.key,
  label: key.label,
  icon: <BlockOutlined />,
}));
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

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
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
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
            <Route path="/my-movie" element={<MyMovie />} />
        </Routes>
        </Content>
      </Layout>
    </Layout>
  </Layout>
    </div>
  )
}
