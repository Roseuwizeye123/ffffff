import React from "react";
import facebook from '../image/icons/facebook.svg';
import twitter from '../image/icons/twitter.svg';
import instagram from '../image/icons/instagram.svg';
import youtube from '../image/icons/youtube.svg';
import {
  MdFacebook
} from "react-icons/md";

const Footer = () => {
  return (
    <footer class="text-white py-2 footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h4>Castro Driving School Online Management System</h4>
            <p>Address: Nyarugenge, Kigali, Rwanda</p>
            <p>Email: fideluwiringiyima@gmail.com</p>
            <p>Phone: +250 788843907</p>
          </div>
          <div class="col-md-4">
            <h4>Quick Links</h4>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h4>Follow Us</h4>
            <ul className="list-unstyled d-flex flex-column">
              <li className="mb-3">
                <a href="https://www.facebook.com/uwizeye.marie.75?mibextid=ZbWKwL">
                  <img src={facebook} alt="Facebook" />
                </a>
              </li>
              <li className="mb-3">
                <a href="#">
                  <img src={instagram} alt="Instagram" />
                </a>
              </li>
              <li className="mb-3">
                <a href="#">
                  <img src={twitter} alt="Twitter" />
                </a>
              </li>
              <li className="mb-3">
                <a href="#">
                  <img src={youtube} alt="YouTube" />
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
