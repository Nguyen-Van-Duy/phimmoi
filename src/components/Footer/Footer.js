import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Feedback from "../Feedback/Feedback";
import Modal from "../Modal/Modal";
import "./Footer.css";

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
      </div>
      {/* <div className="footer__list">
          <h4 className="footer__list--title">About</h4>
          <li>About Us</li>
          <li>Features</li>
          <li>New Movies</li>
      </div>
      <div className="footer__list">
          <h4 className="footer__list--title">Company</h4>
          <li>Team</li>
          <li>Plan</li>
          <li>Become A Member</li>
      </div> */}
      <div className="footer__list">
          <h4 className="footer__list--title">Feedback application</h4>
          <span className="button blue paticipant-button" onClick={toggleModal}>
        Feedback</span>
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
