import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./Header.css";
import Search from "./Search/Search";
import {category} from "../../API/MoviesApi";
import Genre from "./Genre/Genre";
import Login from "./Login/Login";
import './Login/Login.css'
import { useDispatch, useSelector } from "react-redux";
// import BoxModal from "../BoxModal/BoxModal";
import axios from "axios"
import { setUserId } from "../../store/LoginSlice";
import apiConfig from "../../API/configApi"
import MenuListFeature from "./MenuListFeature/MenuListFeature";

const menu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Movies",
    path: `/${category.movie}`,
  },
  {
    name: "TV Shows",
    path: `/${category.tv}`,
  },
  {
    name: "New Movie",
    path: "/new-movie",
  },
  {
    name: "Movie Genre",
    path: "/new-popular",
  },
];

const Header = () => {
  const [menuMobile, setMenuMobile] = useState(false)
  const [onSearch, setOnSearch] = useState(false)
  const [showLanguage, setShowLanguage] = useState(false)
  const [showFeature, setShowFeature] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const headerRef = useRef(null)
  const navigate = useNavigate()
  const dataUser = useSelector((state) => state.loginSlice.dataUser)
    const isLogin = useSelector((state) => state.loginSlice.isLogin)
    const urlConnect = useSelector((state) => state.loginSlice.urlConnect)
    const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

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

  const toggleMenu = () => {
    setMenuMobile(!menuMobile)
    setOnSearch(false)
  }

  const toggleSearch = () => {
    setOnSearch(!onSearch)
    setMenuMobile(false)
    setShowLanguage(false)
    setShowFeature(false)
  }

  const handleShowSearch = () => {
    setShowFeature(!showFeature)
    setOnSearch(true)
    
  }

  const handleShowLanguage = ()=> {
    setOnSearch(false)
    setShowLanguage(!showLanguage)
    setShowFeature(false)
    // setOnSearch(false)
  }

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    const fixedHeader = () => {
      if(window.scrollY > 80 & document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('header-fixed')
      } else {
        headerRef.current.classList.remove('header-fixed')
      }
    }
    window.addEventListener('scroll', fixedHeader)

    return () => {
      window.removeEventListener('scroll', fixedHeader)
    }
  }, [])

  return (
    <>
    <header className="header" ref={headerRef}>
      <div onClick={toggleMenu}><Modal showModal={menuMobile} /></div>
      <div className="container__conainer">
        <nav className="header__menu">
          <div className="header__menu-bar" onClick={toggleMenu}><i className="fas fa-bars"></i></div>
          <h2 className="header__logo logo-movie" onClick={() => navigate('/')}>DUY FILM</h2>
          <ul className={`header__menu-list ${menuMobile ? "show-menu" : ""}`}>
            {menu.map((item, index) => (
              <li key={index} className="header__menu-item">
                {item.name !== "Movie Genre" ? <NavLink
                  className="header__menu-link"
                  to={item.path}
                >
                  {item.name}
                </NavLink>: <span className="link__menu-genre">{item.name}
                <div className="menu-genre__container"><Genre /></div></span>}
              </li>
            ))}
          </ul>
        </nav>
        <ul className="header-list__feature">
          <li className="feature__item">
             <Search searchValue={onSearch} onSearch={toggleSearch} handleShowSearch={handleShowSearch} showFeature={showFeature} />
          </li>
          <li className="feature__item header-list__feature">
            <div id="google_translate_element" className={!showLanguage? "show-language": ""}></div>
            <i onClick={handleShowLanguage} style={{fontSize: "2rem"}}  className="fa-solid fa-earth-americas"></i>
          </li>
          {isLogin && !loading && <li className="feature__item header-list__feature">
            <i style={{fontSize: "2rem"}}  className="fa-solid fa-bell"></i>
          </li>}
          {!isLogin && <li className="feature__item" onClick={handleShowModal}><span className="login-bottom">Login</span></li>}
          {isLogin && !loading && <li className="feature__item login-bottom">
            <img src={ apiConfig.urlConnectSocketIO + dataUser.avatar } alt="" />
            <span>{dataUser?.user_name?.trim().split(' ').pop()}</span>
            <i className="fa-solid fa-caret-down" style={{marginLeft: "10px"}}></i>
            <div className="header-list__feature-menu"><MenuListFeature /></div>
          </li>}
          <div onClick={()=>setShowModal(!showModal)}><Modal showModal={showModal} /></div>
        </ul>
        {/* <SearchData /> */}
      </div>
    </header>
    {showModal && <Login closeModal={handleShowModal} />}
  </>
  );
};

export default Header;
