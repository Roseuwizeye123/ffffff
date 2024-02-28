import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";

const UsersList = () => {
  const history = useHistory();

  const [cooperatives, setCoooperatives] = useState([]);
  useEffect(() => {
    async function fetchAdmins() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/allusers`
      );
      console.log(response.data);
      setCoooperatives(response.data);
    }

    fetchAdmins(setCoooperatives);
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Send a request to update the user's role
      await axios.put(`http://127.0.0.1:8000/api/update_user_role/${userId}`, {
        role: newRole,
      });

      // Update the local state to reflect the new role
      setCoooperatives((prevState) =>
        prevState.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      toast.success("User role updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating user role.");
    }
  };

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
      <div class="row" style={{height: '600px', overflow: 'scroll'}}>
        <div class="col-md-10 mt-5">
          <h2>All users</h2>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cooperatives.map((cooperative) => (
                <tr>
                  <td>{cooperative.id}</td>
                  <td>{cooperative.name}</td>
                  <td>{cooperative.email}</td>
                  <td>{cooperative.role}</td>  
                  <td>

                  <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${cooperative.id}`}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Change Role
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${cooperative.id}`}
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => handleRoleChange(cooperative.id, "student")}
                          style={{color: 'white'}}
                        >
                          Student
                        </button>
                        {/* <button
                          className="dropdown-item"
                          onClick={() => handleRoleChange(cooperative.id, "teacher")}
                          style={{color: 'white'}}
                        >
                          Teacher
                        </button> */}
                        <button
                          className="dropdown-item"
                          onClick={() => handleRoleChange(cooperative.id, "admin")}
                          style={{color: 'white'}}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
