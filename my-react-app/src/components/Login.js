import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Puff } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Footer from "../components/Footer";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState({});
  const [loading, setLoading] = useState("");
  const [alert, setAlert] = useState(false);
  const [pass, setPassword] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [textVisible, setTextVisible] = useState(false); // State to toggle text visibility

  const onUsernameChange = (e) => {
    var em = e.target.value;
    if (em !== "") {
      setUsername({ value: em });
    } else {
      setUsername({ value: em, message: "Write your username" });
    }
  };

  const onPassChange = (e) => {
    var em = e.target.value;
    if (em !== "") {
      setPassword({ value: em });
    } else {
      setPassword({ value: em, message: "Enter your Password" });
    }
  };

  const toggleTextVisibility = () => {
    // Toggle the visibility of the text
    setTextVisible(!textVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast.warn("Please accept the Terms and Conditions.");
      return;
    }

    if (username.value == null || username.value === "") {
      setUsername({ message: "Write your email" });
    } else if (pass.value == null || pass.value === "") {
      setPassword({ message: "Enter your password" });
    } else {
      const payload = {
        email: username.value,
        password: pass.value,
      };

      try {
        setLoading(true);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          payload
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userID", response.data.id);
        localStorage.setItem("isEnrolled", response.data.isEnrolled);
        const isEnrolled = localStorage.getItem('isEnrolled');
          history.push(`/dashboard/${response.data.id}`);
          setLoading(false);
        
      } catch (error) {
        setLoading(false);
        toast.warn("Username or Password Incorrect");
        history.push("/login", payload);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid garage">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12 bg-light p-4 mt-4 mb-4">
            <h4
              style={{
                color: "red",
              }}
            >
              {alert ? "Username or Password is wrong" : ""}
            </h4>

            <h1 className="text-center pb-3 login-header">Login</h1>

            <form>
              <div className="form-group">
                <label className="text-dark text-bold">Username</label>

                <input
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={onUsernameChange}
                />
                <span className="text-danger">{username.message}</span>
              </div>

              <div className="form-group">
                <label className="text-dark text-bold">Password</label>
                <input
                  type="password"
                  name=""
                  className="form-control"
                  onChange={onPassChange}
                />
                <span className="text-danger">{pass.message}</span>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="acceptTerms"
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="acceptTerms">
                  I accept the{" "}
                  <Link to="/terms">Terms and Conditions</Link>.
                </label>
              </div>

              {/* Toggleable text */}
              <p
                className="text-muted toggle-text"
                onClick={toggleTextVisibility}
                style={{ cursor: "pointer" }}
              >
                {textVisible
                  ? "No one cares what you are going to do on the system."
                  : "Read terms and condition"}
              </p>

              {loading ? (
                <button className="btn btn-block login-btn" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-block btn-secondary"
                  name="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
