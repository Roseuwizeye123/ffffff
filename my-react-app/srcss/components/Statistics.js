import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaBeer } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";

const Statistics = () => {

  const role = localStorage.getItem('role')

  const [course, setCourse] = useState('0');

  const [Student, setStudentCount] = useState('0');

  const [EnrolledCount, setEnrolledCount] = useState('0');
  const [forRent, setforRent] = useState();

  useEffect(() => {
    async function studentCount() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/students"
        );

        // console.log("students ====>", data.length)

        if (data) {
          setStudentCount(data.length);

        }
      } catch (error) {
        console.log(error);
      }
    }
    studentCount();
  }, []);

  useEffect(() => {
    async function coursesCount() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/courses"
        );

        if (data) {
          setCourse(data.length);
        }
      } catch (error) {
        console.log(error);
      }
    }
    coursesCount();
  }, []);

 ;

  useEffect(() => {
    async function enrolledCount() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/allenrollments"
        );

        if (data) {
          setEnrolledCount(data.length);

          // console.log("Messagecount", messagesCount);
        }
      } catch (error) {
        console.log(error);
      }
    }
    enrolledCount();
  }, []);

  if (role === "admin" || role === "teacher") {

  return (
    <>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4">
            <div class="card bg-info text-white">
              <div class="card-body">
                <h5 class="card-title">Student</h5>
                <p class="card-text">{Student}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Courses</h5>
                <p class="card-text">{course}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <h5 class="card-title">Enrolled</h5>
                <p class="card-text">{EnrolledCount}</p>
              </div>
            </div>
          </div>
          {/* <div class="col-md-3">
            <div class="card bg-warning text-white">
              <div class="card-body">
                <h5 class="card-title">Failed Transaction</h5>
                <p class="card-text">3</p>
              </div>
            </div>
          </div> */}

          {/* <div class="col-md-6 mt-2">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <h5 class="card-title">Payments</h5>
                <p class="card-text">4</p>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </>
  );
  } else {
    return null;
  }
};

export default Statistics;
