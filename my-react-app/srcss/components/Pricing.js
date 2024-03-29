import React from "react";
import { Link, useHistory } from "react-router-dom";
import mtn from "../image/download.png";
import tigo from "../image/tigo.jpeg";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Pricing = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const history = useHistory();

  // console.log("Course Id++++: ", id);
  if(!token){
    window.location.href = "/login";
  }

  const handlePayment = () => {
    if(id === 'p'){
      // alert("Please go to your dashboard to access courses.");
      // history.push('/dashboard');
      window.location.href = "/courses";
    }
    if (token) {
      history.push(`/pay/${id}`);
    } else {
      alert("Please log in or register  to make a payment.");
      history.push('/register');
    }
  };

  return (
    <>
      <Navbar />
      <div class="container mt-5">
        <h1 class="text-center mb-4">Course Pricing</h1>
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-6">
                <div class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title">MTN MoMo</h5>
                    <img src={mtn} alt="MTN MoMo" class="img-fluid" />
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title">TigoCash (coming soon)</h5>
                    <img src={tigo} alt="TigoCash" class="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">Course Price</h5>
                <p class="card-text">Access to all courses</p>
                <h3 class="card-title">100FRW</h3>
                <button className="btn btn-primary" onClick={handlePayment}>
                  Pay now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-md-6">
            <blockquote class="blockquote">
              <p class="mb-0">
                "I learned so much from these courses. Highly recommended!"
              </p>
              <footer class="blockquote-footer">ROSE</footer>
            </blockquote>
          </div>
          <div class="col-md-6">
            <blockquote class="blockquote">
              <p class="mb-0">
                "The quality of the content exceeded my expectations."
              </p>
              <footer class="blockquote-footer">ROSE</footer>
            </blockquote>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
