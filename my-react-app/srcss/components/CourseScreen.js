import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Document, Page } from 'react-pdf';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import {
  MdDelete,
  MdDownload
} from "react-icons/md";

const CourseScreen = () => {

  const history = useHistory();
 
  const fileUrl = "http://127.0.0.1:8000/storage/";

  const [cooperatives, setCoooperatives] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      // console.log(response.data)
      setCoooperatives(response.data);
    }

    fetchCourses();
  }, []);

const handleViewCourse = (course) => {
  axios({
    url: `http://127.0.0.1:8000/api/view-course/${course.id}`,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
     const url = window.URL.createObjectURL(new Blob([response.data]));
     console.log("URL here: ", url);
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', `${course.name}`); //or any other extension
     document.body.appendChild(link);
     link.click();
  });
  // history.push(`/course-view/${course.id}`);
};

const handleDeleteCourse = async (id) => {

  try {
    // Send a DELETE request to your API to delete the selected course
    await axios.delete(`http://127.0.0.1:8000/api/courses/${id}`);
    // Reload the courses list after deletion
    const updatedCourses = cooperatives.filter(
      (course) => course.id !== selectedCourseId
    );
    setCoooperatives(updatedCourses);
    setTimeout(() => {
      // Reload the page to refresh the courses list
      window.location.reload();
    }, 2000);
    // Clear the selectedCourseId
    setSelectedCourseId(null);
    toast.success("Course delete successfully");
  } catch (error) {
    toast.error("Failed to dlete course");
    console.error("Error deleting course:", error);
  }
};

  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Navbar />
    <div class="row">
      <Sidebar />
      <div class="col-md-10 mt-5">
          <h2>All Courses</h2>
      
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Course</th>
        <th scope="col">Description</th>
        <th scope="col">Type</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
    {cooperatives.map((cooperative) => (
      <tr>
        <td>{cooperative.id}</td>
        <td>{cooperative.name}</td>
        <td>{cooperative.description}</td>
        <td>{cooperative.type}</td>
        <td>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={() => handleViewCourse(cooperative)}
              >
                <MdDownload style={{ color: "#fff", fontSize: "1.4rem" }} title="Download"/>{" "}
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCourse(cooperative.id)}
              >
                <MdDelete style={{ color: "#fff", fontSize: "1.4rem" }} title="Delete" />{" "}
              </button>
            </div>
          </div>
        </td>

      </tr>
    ))}
    </tbody>
  </table>
  {/* {selectedCourseId && (
    <div>
      <p>Selected Course ID: {selectedCourseId}</p>
      <button
        className="btn btn-danger"
        onClick={handleDeleteCourse}
      >
        Confirm Delete
      </button>
    </div>
  )} */}
</div>
</div>
  </>
  );
};

export default CourseScreen