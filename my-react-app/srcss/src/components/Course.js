import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import image from "../image/driving.jpg";
import { ToastContainer, toast } from "react-toastify";

const Course = () => {
  const history = useHistory();

  const [courses, setCourses] = useState([]);
  const [myEnrolled, setMyEnrolled] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");

      const uniqueData = [];
      const levelsSet = new Set();

      response.data.forEach((item) => {
        if (!levelsSet.has(item.level)) {
          uniqueData.push(item);
          levelsSet.add(item.level);
        }
      });

      setCourses(uniqueData);
    }

    fetchCourses();
  }, []);

  const handleEnroll = async (id, coursePrice, course_name, level) => {
    const userID = localStorage.getItem("userID");
    localStorage.setItem("courseName", course_name)
    try {
    //   const response = await axios.post(
    //     `http://127.0.0.1:8000/api/enroll/${userID}/${id}`
    //   );
      // history.push(`/pricing/${id}/?course_price=${coursePrice}`);
      window.location.href = `/payment_method/${id}/?course_price=${coursePrice}&level=${level}`;
      // toast.success("Enrolled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Enrollment failed");
    }
  };

  return (
    <>
      <Navbar />

      <div class="container mt-5">
        <h1 class="text-center mb-4">Our Courses</h1>
        <div class="row">
          {courses.map((course) => (
            <div class="col-6 mb-6">
              <div class="card h-100 course-card">
                {/* <img src={image} class="card-img-top" alt="Course 1" /> */}
                <h3 style={{color: 'white', fontSize: '20px'}}>
                  {course.course_name} (part {course.level})
                </h3>
                <span style={{color: "#02AF76"}}>Type: PDF and Video</span>
                <div class="card-body">
                  {/* <h5 class="card-title text-bold">{course.id}</h5> */}
                  <p class="card-text text-light">{course.description}</p>
                  <Link
                    to="#"
                    class="btn btn-primary"
                    onClick={() => handleEnroll(course.id, course.price, course.course_name, course.level)}
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div><br/><br/><br/><br/>

      <Footer />
    </>
  );
};

export default Course;
