import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import { Puff } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const history = useHistory();

  const [email, setEmail] = useState({});
  const [password, setPass] = useState({});
  const [password_confirmation, setConfirm] = useState({});
  const [loading, setLoading] = useState("");

  const onEmailChange = (e) => {
    var email = e.target.value;
    if (email != "") {
      setEmail({ value: email });
    } else {
      setEmail({ value: email, message: "Please enter existing email" });
    }
  };
  const onPasswordChange = (e) => {
    var password = e.target.value;
    if (password != "") {
      setPass({ value: password });
    } else {
      setPass({ value: password, message: "enter your password" });
    }
  };

  const onPasswodConfirmCahnge = (e) => {
    var confirm = e.target.value;
    if (confirm != "") {
      setConfirm({ value: password_confirmation });
    } else {
      setConfirm({ value: password_confirmation, message: "confirm your password" });
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (email.value == null || email.value == "") {
      setEmail({ message: "Please enter existing email" });
    } else if (!email.value.includes("@")) {
      setEmail({ message: "Please Include '@'" });
    } else if (password.value == null || password.value == "") {
      setPass({ message: "Enter new password" });
    } else if (password_confirmation.value == null || password_confirmation.value == "") {
      setConfirm({ message: "Please confirm Password" });
      // } else if (password_confirmation.value !== password.value) {
      //   setConfirm({ message: "Password does not match" });
    } else {
      const payload = {
        email: email.value,
        password: password.value,
        password_confirmation:password.value
      };
      try {
        setLoading(true);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/forgot",
          payload
        );
        toast.success(response.message);
        history.push("/login");
        setLoading(false);
      } catch (error) {
        console.log("my errors", error.response.data.errors.email)
        toast.warn(error);
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div class="container-fluid garage">
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
       

        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12 bg-light mt-4 pt-4 mb-4">
            <form class="p-3">
              <div class="form-group">
                <label class="text-dark text-bold p-1">Email</label>
                <input
                  type="email"
                  class="form-control"
                  onChange={onEmailChange}
                  required
                />{" "}
                <span class="text-danger">{email.message}</span>
              </div>

              <div class="form-group">
                <label class="text-dark text-bold">Password</label>
                <input
                  type="password"
                  class="form-control"
                  onChange={onPasswordChange}
                />
                <span class="text-danger">{password.message}</span>
              </div>

              <div class="form-group">
                <label class="teaxt-dark text-bold">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  onChange={onPasswodConfirmCahnge}
                />

                <span class="text-danger">{password_confirmation.message}</span>
              </div>
              <br />

              {loading ? (
                <button class="btn btn-block  login-btn" type="button" disabled>
                  <span
                    class="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button
                  class="btn btn-lg btn-block btn-secondary"
                  name="submit"
                  onClick={handleRegister}
                >
                  Reset password
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

       <Footer /> 
    </>
  );
};

export default Forgot;
