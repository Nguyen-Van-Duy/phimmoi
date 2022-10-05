import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './Admin.css';
import {LogoutOutlined, BlockOutlined,AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeAdmin from './HomeAdmin/HomeAdmin';
import AccountUser from './AccountUser/AccountUser';
import MyMovie from '../../components/UserMannager/MyMovie/MyMovie';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiConfig from '../../API/configApi';
import { setUserId } from '../../store/LoginSlice';
import NewMovie from '../NewMovie/NewMovie';

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
  getItem('Home', '', <PieChartOutlined />),
  getItem('Account', 'Account', <DesktopOutlined />),
  getItem('Movie', 'movie', <MailOutlined />, [
    getItem('Movie list', 'movie-list'),
    getItem('My movie', 'my-movie'),
  ]),
  getItem('Approve', 'approve', <AppstoreOutlined />, [
    getItem('Movie share', 'movie-share'),
    getItem('Movie update', 'movie-update'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

export default function Admin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const urlConnect = useSelector((state) => state.loginSlice.urlConnect)
  const isLogin = useSelector((state) => state.loginSlice.isLogin)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  useEffect(()=> {
    const authentication = async () => {
        setLoading(true)
        if(token && !isLogin) {
            try {
                const result = await axios.get(urlConnect + 'account/refresh', apiConfig.headers);
                dispatch(setUserId(result.data))
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                return
            }
        } else {
            setLoading(false)
        }
    }
    authentication()
  }, [token, dispatch, urlConnect, isLogin])


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
        onClick={handleClick}
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
        {!loading && <Content
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
            <Route path="/movie-list" element={<NewMovie />} />
        </Routes>
        </Content>}
      </Layout>
    </Layout>
  </Layout>
    </div>
  )
}
