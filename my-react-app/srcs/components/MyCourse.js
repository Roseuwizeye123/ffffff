import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const MyCourse = () => {
  const history = useHistory();

  const fileUrl = "http://127.0.0.1:8000/storage/";

  const userID = localStorage.getItem("userID");

  const [cooperatives, setCoooperatives] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enrolled-course/${userID}`
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
          <h2>All Courses</h2>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Course</th>
              </tr>
            </thead>
            <tbody>
              {cooperatives.map((cooperative) => (
                <tr>
                  <td>
                    {" "}
                    <div
                      class="embed-responsive embed-responsive-16by9"
                      style= {{

                        maxWidth: "200px",
                        maxHeight: "200px"
                      }}
                    >
                      <iframe
                        class="embed-responsive-item"
                        style={{
                            width: "30%" 
                          }}
                        src={fileUrl + cooperative.name}
                        allowfullscreen
                      ></iframe>
                    </div>
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

export default MyCourse;
