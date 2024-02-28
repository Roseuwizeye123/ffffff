import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Students = () => {
  const history = useHistory();

  const fileUrl = "http://127.0.0.1:8000/storage/";

  const userID = localStorage.getItem("userID");

  const [cooperatives, setCoooperatives] = useState([]);
  const role = 'student';
  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/${role}`
      );
      console.log(response.data);
      setCoooperatives(response.data);
    }

    fetchCourses();
  }, []);
  return (
    <>
      <Navbar />
      <div class="row">
        <Sidebar />
        <div class="col-md-10 mt-5">
          <h2>All students</h2>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {cooperatives.map((cooperative) => (
                <tr>
                  <td>{cooperative.id}</td>
                  <td>{cooperative.name}</td>
                  <td>{cooperative.email}</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Students;
