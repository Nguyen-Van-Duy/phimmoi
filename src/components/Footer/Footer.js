import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Feedback from "../Feedback/Feedback";
import Modal from "../Modal/Modal";
import "./Footer.css";
import tmdb from '../../image/TMDB.svg';

const Footer = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
}
  return (<>
    <div onClick={toggleModal}><Modal showModal={showModal} /></div>
        {showModal && <Feedback closeFeedback={toggleModal} />}
    <footer className="footer">
      <div className="app__container footer__container">
      <div className="footer__list" onClick={() => navigate('/')}>
        <h2 className="logo-movie">DUY FILM</h2>
        <div>
          <img src={tmdb} alt="The Movie DB" />
          </div>
      </div>
      <div className="footer__list">
          <h4 className="footer__list--title">Movie</h4>
          <li>Trending Day</li>
          <li>Trending Week</li>
          <li>Top Rated</li>
          <li>Popular</li>
      </div>
      <div className="footer__list">
          <h4 className="footer__list--title">TV Shows</h4>
          <li>Trending Day</li>
          <li>Trending Week</li>
          <li>Top Rated</li>
          <li>Popular</li>
      </div>
      <div className="footer__list">
          <h4 className="footer__list--title" style={{    marginBottom: "2rem"}}>Feedback application</h4>
          <span className="button blue footer-button" onClick={toggleModal}>Feedback</span>
      </div>
      </div>
      <div className="app__container footer__desc">
          <a href="https://www.themoviedb.org/">https://www.themoviedb.org/</a>
          <a href="https://app-film-10550.web.app/">DUY FILM version 1.0</a>
      </div>
    </footer>
    </>
  );
};

export default Footer;
