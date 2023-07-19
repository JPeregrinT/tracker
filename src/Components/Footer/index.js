import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import '../Footer/Footer.css';
import { NavLink } from 'react-bootstrap';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div id="backToTop">
        <NavLink href="#" onClick={handleBackToTop} id="link__backToTop"><FaArrowUp className="backToTop__icon" /> Back to Top</NavLink>
      </div>
      <div id="container__footer">
        <div id='container__items__footer'>
          <ul className="contact__list">
            <h6 id='contact__footer'>Contact</h6>
            <li className='li__footer__contact'>
              <FaMapMarkerAlt className="contact__icon" />
              <span> 123 Nuclio, City</span>
            </li>
            <li className='li__footer__contact'>
              <FaPhone className="contact__icon" />
              <span>+1 555-123456</span>
            </li>
            <li className='li__footer__contact'>
              <FaEnvelope className="contact__icon" />
    
        <span> orangetracker05@gmail.com</span>
            </li>
          </ul>
          
          <ul className="followUs__list">
            <h6 id='followUs__footer'>Follow us</h6>
            <li className='li__footer__followUs'>
              <FaInstagram className="contact__icon" />
              <span> Instagram</span>
            </li>
            <li className='li__footer__followUs'>
              <FaTwitter className="contact__icon" />
              <span> Twitter</span>
            </li>
            <li className='li__footer__followUs'>
              <FaFacebook className="contact__icon" />
              <span> Facebook</span>
            </li>
            <li className='li__footer__followUs'>
              <FaLinkedin className="contact__icon" />
              <span> LinkedIn</span>
            </li>
          </ul>

          <ul className="contact__list">
            <h6 id='company__footer'>Company</h6>
            <li className='li__footer__company'>
              <span>About us</span>
            </li>
            <li className='li__footer__company'>
              <span>Blog</span>
            </li>
            <li className='li__footer__company'>
              <span>News</span>
            </li>
            <li className='li__footer__company'>
              <span>Support</span>
            </li>
          </ul>
        </div>
        <p id='copyRight__text'>© 2023 OrangeTracker. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;