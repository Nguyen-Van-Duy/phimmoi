import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="app__container footer__container">
      <div className="footer__list" onClick={() => navigate('/')}>
        <h2 className="logo-movie">DUY FILM</h2>
      </div>
      <div className="footer__list">
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
      </div>
      <div className="footer__list">
          <h4 className="footer__list--title">Support</h4>
          <li>FAQs</li>
          <li>Support Center</li>
          <li>Contact</li>
      </div>
      </div>
      <div className="app__container footer__desc">
          <span>copy right @ by Nguyen Van Duy</span>
          <a href="https://app-film-10550.web.app/">DUY FILM version 1.0</a>
      </div>
    </footer>
  );
};

export default Footer;
