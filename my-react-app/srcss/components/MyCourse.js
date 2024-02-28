import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  MdDelete,
  MdDownload
} from "react-icons/md";

const MyCourse = () => {
  const history = useHistory();
  const [cooperatives, setCoooperatives] = useState([]);
  const fileUrl = "http://127.0.0.1:8000/storage/";

  const userID = localStorage.getItem("userID");

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
                <MdDownload style={{ color: "#fff", fontSize: "1.4rem" }} title="Download" />{" "}
              </button>
            </div>
            {/* <div className="col">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCourse(cooperative.id)}
              >
                <MdDelete style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
              </button>
            </div> */}
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

  // return (
  //   <>
  //     <Navbar />
  //     <div class="row">
  //       <Sidebar />
  //       <div class="col-md-10 mt-5">
  //         <h2>All Courses</h2>

  //         {/* <table class="table">
  //           <thead class="thead-dark">
  //             <tr>
  //               <th scope="col">Course</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {cooperatives.map((cooperative) => (
  //               <tr>
  //                 <td>
  //                   {" "}
  //                   <div
  //                     class="embed-responsive embed-responsive-16by9"
  //                     style= {{

  //                       maxWidth: "200px",
  //                       maxHeight: "200px"
  //                     }}
  //                   >
  //                     <iframe
  //                       class="embed-responsive-item"
  //                       style={{
  //                           width: "30%" 
  //                         }}
  //                       src={fileUrl + cooperative.name}
  //                       allowfullscreen
  //                     ></iframe>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table> */}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default MyCourse;
