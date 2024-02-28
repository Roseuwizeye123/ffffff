import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Document, Page } from 'react-pdf';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import {
  MdDelete,
  MdDownload,
  MdUpdate
} from "react-icons/md";

const CourseScreen = () => {

  const history = useHistory();
 
  const fileUrl = "http://127.0.0.1:8000/storage/";

  const [cooperatives, setCoooperatives] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [allFileType, setAllFileType] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      // console.log(response.data)

      setAllFileType(response.data);

      const uniqueData = [];
      const levelsSet = new Set();

      response.data.forEach((item) => {
        if (!levelsSet.has(item.level)) {
          uniqueData.push(item);
          levelsSet.add(item.level);
        }
      });
      
      setCoooperatives(uniqueData);
    }

    fetchCourses();
  }, []);


const handleViewCourse = (level, fileType) => {
  let courseId = null;
  let course = {};
  for(let i = 0; i < allFileType.length; i++) {
    if(parseInt(allFileType[i].level) === parseInt(level) && allFileType[i].type === fileType){
      courseId = allFileType[i].id;
      course = allFileType[i];
    }
  }

  axios({
    url: `http://127.0.0.1:8000/api/view-course/${courseId}`,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
     const url = window.URL.createObjectURL(new Blob([response.data]));
     console.log("URL here: ", url);
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', `${course.file_name}`); //or any other extension
     document.body.appendChild(link);
     link.click();
  });
  // history.push(`/course-view/${course.id}`);
};

const handleUdateCourse = async (level) => {
  window.location.href =  `/update_course/${level}`;
};

let sn = 0;

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
        <th scope="col">Course Name</th>
        <th scope="col">Description</th>
        <th scope="col">Type</th>
        <th scope="col">Course Level</th>
        <th scope="col">Course Price</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
    {cooperatives.length === 0 &&(<span>No record available</span>)}
    {cooperatives.map((cooperative) => (
      <tr>
        <td>{++sn}</td>
        <td>{cooperative.course_name}</td>
        <td>{cooperative.description}</td>
        <td>PDF and Video</td>
        <td>{cooperative.level}</td>
        <td>{cooperative.price}</td>
        <td>
            <div className="row">
              <div className="col">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Download
                  </button>
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item text-white"
                      onClick={() => handleViewCourse(cooperative.level, 'pdf')}
                    >
                      Download PDF
                    </button>
                    <button
                      className="dropdown-item text-white"
                      onClick={() => handleViewCourse(cooperative.level, 'video')}
                    >
                      Download Video
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <button
                  className="btn btn-success"
                  onClick={() => handleUdateCourse(cooperative.level)}
                >
                  <MdUpdate style={{ color: "#fff", fontSize: "1.4rem" }} title="Delete" />{" "}
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