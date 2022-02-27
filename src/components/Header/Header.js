import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./Header.css";
import Search from "./Search/Search";
import {category} from "../../API/MoviesApi";

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
    name: "New & Popular",
    path: "/new-popular",
  },
];

const Header = () => {
  const [menuMobile, setMenuMobile] = useState(false)
  const [onSearch, setOnSearch] = useState(false)
  const headerRef = useRef(null)

  const toggleMenu = () => {
    setMenuMobile(!menuMobile)
    setOnSearch(false)
  }

  const toggleSearch = () => {
    setOnSearch(!onSearch)
    setMenuMobile(false)
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
    <header className="header" ref={headerRef}>
      <div onClick={toggleMenu}><Modal showModal={menuMobile} /></div>
      <div className="container">
        <nav className="header__menu">
          <div className="header__menu-bar" onClick={toggleMenu}><i className="fas fa-bars"></i></div>
          <h2 className="header__logo">DUY FILM</h2>
          <ul className={`header__menu-list ${menuMobile ? "show-menu" : ""}`}>
            {menu.map((item, index) => (
              <li key={index} className="header__menu-item">
                <NavLink
                  className="header__menu-link"
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Search search={onSearch} onSearch={toggleSearch} />
        {/* <SearchData /> */}
      </div>
    </header>
  );
};

export default Header;
