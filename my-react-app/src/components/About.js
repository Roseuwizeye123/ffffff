import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <div class="about-header">
        <div class="container">
          <h1>About Us</h1>
          <p>Castro Driving School Online System's Mission and Vision</p>
        </div>
      </div>

      <div class="about-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <h2>Our Story</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor eleifend nunc, at convallis elit convallis id.
              </p>
            </div>
            <div class="col-lg-4">
              <h2>Our Team</h2>
              <p>
                We have a diverse team of passionate individuals dedicated to
                bringing you the best learning experience.
              </p>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-4">
              <h2>Our Mission</h2>
              <p>
                We strive to empower individuals by providing accessible and
                high-quality educational content.
              </p>
            </div>
            <div class="col-md-4">
              <h2>Our Values</h2>
              <ul>
                <li>Excellence</li>
                <li>Innovation</li>
                <li>Collaboration</li>
                <li>Customer-Centric</li>
              </ul>
            </div>
            <div class="col-md-4 about"></div>


          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
