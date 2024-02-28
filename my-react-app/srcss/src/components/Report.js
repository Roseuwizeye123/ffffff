import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Report = () => {

  const [cooperatives, setCoooperatives] = useState([]);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/allenrollments"
      );
      setCoooperatives(response.data);
    }

    fetchCourses();
  }, []);

    // Filter cooperatives data based on the selected date
    const filteredCooperatives = cooperatives.filter((cooperative) => {
        if (selectedFromDate === "" || selectedToDate === "") {
            return true; // Show all records if no date is selected
          }

        const cooperativeDate = new Date(cooperative.updated_at);
        const selectedFromDateObject = new Date(selectedFromDate);
        const selectedToDateObject = new Date(selectedToDate);
      
        return (
          cooperativeDate.getFullYear() >= selectedFromDateObject.getFullYear() &&
          cooperativeDate.getFullYear() <= selectedToDateObject.getFullYear() &&
          cooperativeDate.getMonth() >= selectedFromDateObject.getMonth() &&
          cooperativeDate.getMonth() <= selectedToDateObject.getMonth() &&
          cooperativeDate.getDate() >= selectedFromDateObject.getDate() &&
          cooperativeDate.getDate() <= selectedToDateObject.getDate()
        );
      });
    // console.log("Filtered: "+ filteredCooperatives);
    
    
      let sn = 0;
      let totalAmount = 0;
      let totalPaidAmount = 0;
      let totalNotPaid = 0;
    
      filteredCooperatives.forEach((cooperative) => {
        totalPaidAmount += cooperative.amount;
        totalAmount += parseInt(cooperative.amount_to_pay);
      });
    
      totalNotPaid = totalAmount - totalPaidAmount;


  return (
    <>
      <Navbar />
      <div class="row" style={{maxWidth: '100%', overflowX: 'auto'}}>
        <Sidebar />
        <div class="col-md-10 mt-5" style={{maxWidth: '100%', overflowX: 'auto'}}>
        <div className="row">
            <div className="col-6">
                <h5>Select From Date</h5><br/>
                <input
                    type="date"
                    value={selectedFromDate}
                    onChange={(e) => setSelectedFromDate(e.target.value)}
                    className="form-control col-5"
                />
            </div>
            <div className="col-6">
                <h5>Select To Date</h5><br/>
                <input
                    type="date"
                    value={selectedToDate}
                    onChange={(e) => setSelectedToDate(e.target.value)}
                    className="form-control col-5"
                />
            </div>
        </div>
            <br/>
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

          <h5>Enrollments from {selectedFromDate} to {selectedToDate}</h5><br/>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Name</th>
                <th scope="col">Student Name</th>
                <th scope="col"> Student Email</th>
                <th scope="col">Amount To Pay</th>
                <th scope="col">Paid Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Not Paid</th>
              </tr>
            </thead>
            <tbody>
            {filteredCooperatives.length === 0 &&(<span>No record available</span>)}
              {filteredCooperatives.map((cooperative) => (
                <tr>
                  <td>{++sn}</td>
                  <td>{cooperative.course}</td>
                  <td>{cooperative.name}</td>
                  <td>{cooperative.email}</td>
                  <td>{(parseInt(cooperative.amount_to_pay)).toLocaleString()}RWF</td>
                  <td>{cooperative.amount.toLocaleString()}RWF</td>
                  <td>{(parseInt(cooperative.amount_to_pay) - parseInt(cooperative.amount)).toLocaleString()}RWF</td>
                  <td>
                    {cooperative.status === 1 ? (
                        <span className="badge bg-success px-2 py-2 w-100">Completed</span>
                    ) : (
                        <span className="badge bg-warning text-dark px-2 py-2 w-100">Pending</span>
                    )}
                    </td>
                </tr>
                        ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Report;
