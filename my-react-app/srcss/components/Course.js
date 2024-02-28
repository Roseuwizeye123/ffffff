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
  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      setCourses(response.data);
    }

    fetchCourses();
  }, []);

  const handleEnroll = async (id) => {
    // console.log("Course Id: ===> ", id)
    const userID = localStorage.getItem("userID");
    try {
    //   const response = await axios.post(
    //     `http://127.0.0.1:8000/api/enroll/${userID}/${id}`
    //   );
      history.push(`/pricing/${id}`);
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
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card course-card">
                <img src={image} class="card-img-top" alt="Course 1" />
                <div class="card-body">
                  <h5 class="card-title text-bold">{course.id}</h5>
                  <p class="card-text text-light">{course.description}</p>
                  <Link
                    to="#"
                    class="btn btn-primary"
                    onClick={() => handleEnroll(course.id)}
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Course;
