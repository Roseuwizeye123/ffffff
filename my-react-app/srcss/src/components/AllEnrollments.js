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
      setCoooperatives(response.data);
    }

    fetchCourses();
  }, []);
  let sn = 0;
  let totalAmount = 0;
  let totalPaidAmount = 0;
  let totalNotPaid = 0;
  cooperatives.forEach((cooperative) => {
    totalPaidAmount += cooperative.amount;
    totalAmount += parseInt(cooperative.amount_to_pay);
  });

  totalNotPaid = totalAmount -  totalPaidAmount ;

  return (
    <>
      <Navbar />
      <div class="row" style={{maxWidth: '100%', overflowX: 'auto'}}>
        <Sidebar />
        <div class="col-md-10 mt-5" style={{maxWidth: '100%', overflowX: 'auto'}}>
         
          <h5>Quick count</h5><br/>
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Total amount to be paid</th>
                <th scope="col">Total amount paid</th>
                <th scope="col">Total amount not paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalAmount.toLocaleString()}RWF</td>
                <td>{totalPaidAmount.toLocaleString()}RWF</td>
                <td>{totalNotPaid.toLocaleString()}RWF</td>
              </tr>
            </tbody>
          </table><br/><br/>

          <h5>All enrollments</h5><br/>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Name</th>
                <th scope="col">Student Name</th>
                <th scope="col"> Student Email</th>
                <th scope="col">Amount To Pay</th>
                <th scope="col">Paid Amount</th>
                <th scope="col">Payment Due Date</th>
                <th scope="col">Not Paid</th>
              </tr>
            </thead>
            <tbody>
            {cooperatives.length === 0 &&(<span>No record available</span>)}
              {cooperatives.map((cooperative) => (
                <tr>
                  <td>{++sn}</td>
                  <td>{cooperative.course}</td>
                  <td>{cooperative.name}</td>
                  <td>{cooperative.email}</td>
                  <td>{(parseInt(cooperative.amount_to_pay)).toLocaleString()}RWF</td>
                  <td>{cooperative.amount.toLocaleString()}RWF</td>
                  <td>{cooperative.updated_at}</td>
                  <td>{(parseInt(cooperative.amount_to_pay) - parseInt(cooperative.amount)).toLocaleString()}RWF</td>
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
