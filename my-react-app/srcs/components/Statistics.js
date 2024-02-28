import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaBeer } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";

const Statistics = () => {

  const role = localStorage.getItem('role')

  const [course, setCourse] = useState([]);

  const [Student, setStudentCount] = useState();

  const [messagesCount, setMessagecount] = useState();


  const [forRent, setforRent] = useState();

  useEffect(() => {
    async function propertyCount() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/report/students"
        );

        console.log("report data", data)

        if (data) {
          setStudentCount(data[0].count);

        }
      } catch (error) {
        console.log(error);
      }
    }
    propertyCount();
  }, []);

  useEffect(() => {
    async function getforsale() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/report/courses"
        );

        if (data) {
          setCourse(data[0].count);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getforsale();
  }, []);

 ;

  useEffect(() => {
    async function getAllMessageCount() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/report/ernrol"
        );

        if (data) {
          setMessagecount(data[0].count);

          console.log("Messagecount", messagesCount);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllMessageCount();
  }, []);

  if (role === "admin" || role === "teacher") {

  return (
    <>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-3">
            <div class="card bg-info text-white">
              <div class="card-body">
                <h5 class="card-title">Student</h5>
                <p class="card-text">{Student}</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Courses</h5>
                <p class="card-text">{course}</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <h5 class="card-title">Enrolled</h5>
                <p class="card-text">{messagesCount}</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-warning text-white">
              <div class="card-body">
                <h5 class="card-title">Failed Transaction</h5>
                <p class="card-text">3</p>
              </div>
            </div>
          </div>

          <div class="col-md-6 mt-2">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <h5 class="card-title">Payments</h5>
                <p class="card-text">4</p>
              </div>
            </div>
          </div>

    
            
        </div>
      </div>
    </>
  );
  } else {
    return null;
  }
};

export default Statistics;
