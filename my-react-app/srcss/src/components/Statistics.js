import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaBeer } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";

const Statistics = () => {

  const role = localStorage.getItem('role')

  const [course, setCourse] = useState('0');

  const [Student, setStudentCount] = useState('0');

  const [EnrolledCount, setEnrolledCount] = useState('0');
  const [allEnrollments, setAllEnrollments] = useState([]);
  const [scoredPart1, setScoredPar1] = useState('');
  const [scoredPart2, setScoredPar2] = useState('');
  const [scoredBoth, setScoredBoth] = useState('');


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

    async function fetchScores() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/scores/full`
      );
      setScoredBoth(response.data.length);
    }
    fetchScores();

  }, []);

  useEffect(() => {
    async function coursesCount() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/courses"
        );

        if (data) {
          setCourse(data.length / 2);
        }
      } catch (error) {
        console.log(error);
      }
    }
    coursesCount();
  }, []);

 ;
 let countPassPart1 = 0;
 let countPassPart2 = 0;
  useEffect(() => {
    async function enrolledCount() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/allenrollments"
        );

        if (data) {
          setEnrolledCount(data.length);

          if(data.length > 0){
            
            for(let i = 0; i < data.length; i++) {
              if(parseInt(data[i].level) === 1 && data[i].status === 1){
                countPassPart1 += 1;
              } else if(parseInt(data[i].level) === 2 && data[i].status === 1){
                countPassPart2 += 1;
              } 
            }
              setScoredPar1(countPassPart1);
          setScoredPar2(countPassPart2);
          }

        
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

        </div><br/>
        <div class="row">
        <div class="col-md-6">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <h5 class="card-title">Student completed course part 1</h5>
                <p class="card-text">{scoredPart1}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-info text-white">
              <div class="card-body">
                <h5 class="card-title">Student completed course part 2</h5>
                <p class="card-text">{scoredPart2}</p>
              </div>
            </div>
          </div>
        </div><br/>
        <div class="row">
        <div class="col-md-6">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Student completed full course</h5>
                <p class="card-text">{scoredBoth}</p>
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
