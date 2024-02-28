import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const AllEnrollments = () => {

  const [cooperatives, setCoooperatives] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/allenrollments"
      );
      // console.log(response.data);
      setCoooperatives(response.data);
    }

    fetchCourses();
  }, []);
  let sn = 0;
  let totalAmount = 0;
  let totalPaidAmount = 0;
  cooperatives.forEach((cooperative) => {
    totalPaidAmount += cooperative.amount;
  });
  return (
    <>
      <Navbar />
      <div class="row" style={{maxWidth: '100%', overflowX: 'auto'}}>
        <Sidebar />
        <div class="col-md-10 mt-5" style={{maxWidth: '100%', overflowX: 'auto'}}>
          <h2>All enrollments</h2>
          <h5>Total paid amount: {totalPaidAmount}RWF</h5><br/>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">course</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">amount</th>
              </tr>
            </thead>
            <tbody>
              {cooperatives.map((cooperative) => (
                <tr>
                  <td>{++sn}</td>
                  <td>{cooperative.course}</td>
                  <td>{cooperative.name}</td>
                  <td>{cooperative.email}</td>
                  <td>{cooperative.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllEnrollments;
