import React from "react";
import { Link, useHistory } from "react-router-dom";
import mtn from "../image/download.png";
import tigo from "../image/tigo.jpeg";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Pricing = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const coursePrice = queryParams.get("course_price");
  const level = queryParams.get("level");
  const history = useHistory();
  const courseName = localStorage.getItem('courseName');

  const handlePayment = () => {
    if (id === "p") {
      history.push("/courses");
    } else if (token) {
      history.push(`/pay/${id}/?course_price=${coursePrice}&level=${level}`);
    } else {
      alert("Please log in or register to make a payment.");
      history.push("/register");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Payment Methods</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">MTN MoMo</h5>
                    <img src={mtn} alt="MTN MoMo" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">TigoCash (coming soon)</h5>
                    <img src={tigo} alt="TigoCash" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Complete Your Payment</h5>
                <p className="card-text">
                  Access to this course for just <strong>{parseInt(coursePrice).toLocaleString()} FRW</strong><br />
                  <h3>{courseName}</h3>
                </p>
                <button className="btn btn-primary" onClick={handlePayment}>
                  Continue To Pay With Mobile Money
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <blockquote className="blockquote">
              <p className="mb-0">
                "You will not regret your decision to pay for this course because of its high-quality content."
              </p>
              {/* <footer className="blockquote-footer">Innocent</footer> */}
            </blockquote>
          </div>
          <div className="col-md-6">
            <blockquote className="blockquote">
              <p className="mb-0">
                "The quality of the content can exceed your expectations."
              </p>
              {/* <footer className="blockquote-footer">Innocent</footer> */}
            </blockquote>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
