import React from "react";
import { MdCheck } from "react-icons/md";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section class="py-5 hero mb-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mt-5">
            <h2 class="display-4">WELCOME TO OUR JOIN COMMUNITY</h2>
            <h3 class="lead">
              Be part of our awesome community and stay updated with the latest
              skills and knowledge.
            </h3>
            <Link class="btn btn-secondary btn-lg" to="/register">
              Sign Up Now
            </Link>
          </div>
        </div>
        <div class="row" style={{height: '400px', width: '50%', backgroundColor: 'white', padding: '10px', marginTop: '80px'}}>
        <h2 style={{marginTop: '0px'}}>
          We are here to help you get started and win your Provisional Driving License.
        </h2>
        <ul style={{listStyle: 'none'}}>
          <li style={{fontSize: '25px'}}>
            <MdCheck style={{ color: "green", fontSize: "2rem", marginTop: '', cursor: 'pointer' }}/>{" "}
          Enroll on traffic laws courses
          </li><br/>
          <li style={{fontSize: '25px'}}>
            <MdCheck style={{ color: "green", fontSize: "2rem", marginTop: '', cursor: 'pointer' }}/>{" "}
          Attempt assessment
          </li>
        </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
