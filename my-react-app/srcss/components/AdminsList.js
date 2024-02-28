import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";

const AdminsList = () => {
  const history = useHistory();

  const [cooperatives, setCoooperatives] = useState([]);
  useEffect(() => {
    async function fetchAdmins() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admins`
      );
      console.log(response.data);
      setCoooperatives(response.data);
    }

    fetchAdmins(setCoooperatives);
  }, []);

  console.log('Comperatives: ', setCoooperatives);

  // const [firstname, setFirst] = useState({});
  // const [role, setRole] = useState({});
  // const [lastname, setLast] = useState({});
  // const [email, setEmail] = useState({});
  // const [password, setPass] = useState({});
  // const [confirm_password, setConfirm] = useState({});
  // const [loading, setLoading] = useState("");

  // const onFirstChange = (e) => {
  //   var em = e.target.value;
  //   if (em != "") {
  //     setFirst({ value: em });
  //   } else {
  //     setLast({ value: em, message: "Write your Name" });
  //   }
  // };

  // const onRoleChange = (e) => {
  //   var em = e.target.value;
  //   if (em != "") {
  //     setRole({ value: em });
  //   } else {
  //     setRole({ value: em, message: "Select role" });
  //   }
  // };

  // const onEmailChange = (e) => {
  //   var email = e.target.value;
  //   if (email != "") {
  //     setEmail({ value: email });
  //   } else {
  //     setEmail({ value: email, message: "Write Email" });
  //   }
  // };
  // const onPasswordChange = (e) => {
  //   var password = e.target.value;
  //   if (password != "") {
  //     setPass({ value: password });
  //   } else {
  //     setPass({ value: password, message: "enter your password" });
  //   }
  // };

  // const onPasswodConfirmCahnge = (e) => {
  //   var confirm = e.target.value;
  //   if (confirm != "") {
  //     setConfirm({ value: confirm_password });
  //   } else {
  //     setConfirm({ value: confirm_password, message: "confirm your password" });
  //   }
  // };
  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   if (firstname.value == null || firstname.value == "") {
  //     setFirst({ message: "Write your firstname" });
  //   } else if (email.value == null || email.value == "") {
  //     setEmail({ message: "Write your email" });
  //   } else if (!email.value.includes("@")) {
  //     setEmail({ message: "Please Include '@'" });
  //   } else if (password.value == null || password.value == "") {
  //     setPass({ message: "enter your password" });
  //   } else if (confirm_password.value == null || confirm_password.value == "") {
  //     setConfirm({ message: "Please confirm Password" });
  //     // } else if (confirm_password.value !== password.value) {
  //     //   setConfirm({ message: "Password does not match" });
  //   } else {
  //     const payload = {
  //       name: firstname.value,
  //       role: role.value,
  //       email: email.value,
  //       password: password.value,
  //     };
  //     console.log(password, confirm_password);
  //     try {
  //       setLoading(true);
  //       const response = await axios.post(
  //         "http://127.0.0.1:8000/api/register",
  //         payload
  //       );
  //       toast.success("User Add successfully");

  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       toast.warn(error.response.data.error);
  //     }
  //   }
  // };
  return (
    <div className="container mt-5">
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
        <div class="col-md-10 mt-5">
          <h2>All Admins</h2>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {cooperatives.map((cooperative) => (
                <tr>
                  <td>{cooperative.id}</td>
                  <td>{cooperative.name}</td>
                  <td>{cooperative.email}</td>
                  <td>{cooperative.role}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="bg-secondary py-3">
        <h1 className="display-4">Registered teacher</h1> */}
        {/* <form class="p-3">
          <div class="form-row">
            <label class="text-dark text-bold">Name</label>
            <input type="text" class="form-control" onChange={onFirstChange} />
            <span class="text-danger">{firstname.message}</span> */}

            {/* <div class="col-md-6">
                  <label class="text-dark text-bold">Lastname</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={onLastChange}
                  />
                  <span class="text-danger">{lastname.message}</span>
                </div> */}
          {/* </div>

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
            <label class="text-dark text-bold">Role</label>
            <select class="form-control" onChange={onRoleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
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

            <span class="text-danger">{confirm_password.message}</span>
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
              Register
            </button>
          )}
        </form>*/}
      {/* </div>  */}
    </div>
  );
};

export default AdminsList;
