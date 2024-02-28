import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const MyBooks = () => {
  const history = useHistory();

  const fileUrl = "http://127.0.0.1:8000/storage/";

  const userID = localStorage.getItem("userID");

  const [cooperatives, setCoooperatives] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/courses/books"
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
        <div className="col-md-10 mt-5">
          <h2>All MyBooks</h2>
  
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Course</th>
              </tr>
            </thead>
            <tbody>
              {cooperatives.map((cooperative) => (
                <tr key={cooperative.id}>
                  <td style={{ backgroundColor: '#0b7758' }}>
                      {cooperative.type === "pdf" ? (
                        <a
                          href={fileUrl + cooperative.name}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {cooperative.name}
                        </a>
                      ) : (
                        <div>
                          <h2>No Books</h2>
                        </div>
                      )}
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

export default MyBooks;
