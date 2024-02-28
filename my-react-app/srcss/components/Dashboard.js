import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from './Footer'
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import Statistics from "./Statistics";

const fileUrl = "http://127.0.0.1:8000/storage/";

const Dashboard = () => {
  const { id } = useParams();
  const role = localStorage.getItem('role');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enrolled-course/${id}`
      );
      setCourses(response.data);
    }

    fetchCourses();
  }, []);

  return (

    <>
    <Navbar/>
    <div class="row">
    <Sidebar/>
    <div class="col-md-10">
       <div className="dashboard">
        {role === 'admin' &&
          <Statistics />
        }
       
        {/* <div className="row">
          {courses.map((course, index) => {
            return (
              <div className="col-md-3 col-sm-6 col-xs-12" key={course.id}>
                <div className="card">
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                      class="embed-responsive-item"
                      src={fileUrl + course.name}
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
    </div>
    </div>
    </div>
    
    <Footer/>
    
    </>
    
  );
};

export default Dashboard;
