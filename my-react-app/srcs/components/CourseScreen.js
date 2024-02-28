import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from 'axios' 

const CourseScreen = () => {

    const history = useHistory();

    
  const fileUrl = "http://127.0.0.1:8000/storage/";

    const [cooperatives, setCoooperatives] = useState([]);
    useEffect(() => {
      async function fetchCourses() {
        const response = await axios.get("http://127.0.0.1:8000/api/courses");
        console.log(response.data)
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
    <th scope="col">Id</th>
    <th scope="col">Course</th>
    <th scope="col">Description</th>
    <th scope="col">Video</th>
    <th scope="col">Type</th>

  </tr>
</thead>
<tbody>
{cooperatives.map((cooperative) => (
  <tr>
    <td>{cooperative.id}</td>
    <td>{cooperative.name}</td>
    <td>{cooperative.description}</td>
    <td>
                    {" "}
                    <div
                      class="embed-responsive embed-responsive-16by9"
                      style= {{

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
    <td>{cooperative.type}</td>

  </tr>
))}
</tbody>
</table>
      </div>



    </div>
  </>
  );
};

export default CourseScreen