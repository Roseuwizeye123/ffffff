import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  MdDelete,
  MdDownload,
  MdPayment,
  MdReplyAll
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCourse = () => {
  const history = useHistory();
  const [cooperatives, setCoooperatives] = useState([]);
  const [CoooperativesEnrolled, setCoooperativesEnrolled] = useState([]);
  const [allFileType, setAllFileType] = useState([]);

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

    async function fetchEnrolled() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/allenrollments`
      );
      // console.log("Enrolled =====> "+response.data);
      setCoooperativesEnrolled(response.data);
    }

    fetchEnrolled();

    async function fetchAllCourses() {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      // console.log(response.data)

      setAllFileType(response.data);

    }

    fetchAllCourses();

  }, []);


  let sn = 0;
  let paidAmount = 0;
  let status = false;

  const handleViewCourse = async(level, fileType, price) => {
    for(let i = 0; i < CoooperativesEnrolled.length; i++) {
      if(parseInt(CoooperativesEnrolled[i].level) === parseInt(level)) {
        if(parseInt(CoooperativesEnrolled[i].amount) !== parseInt(price)){
          toast.warn("You must complete your payment to get access on that course");
          return false;
        };
    }
  }

    const res = await axios.get(
      `http://127.0.0.1:8000/api/completed_course/${userID}`
    );

    let courseId = null;
    let course = {};
    for(let i = 0; i < allFileType.length; i++) {
      if(parseInt(allFileType[i].level) === parseInt(level) && allFileType[i].type === fileType){
        courseId = allFileType[i].id;
        course = allFileType[i];
      }
    }

      // console.log("Completed course: ", res.data);
      let isCompleted = false;
      if(parseInt(course.level) === 1){
        isCompleted = true;
      } else if(res.data.length > 0) {
        // for(let i = 0; i < res.data.length; i++){
          // if(parseInt(res.data[i].courseID) === parseInt(course.id) && parseInt(course.level) === 2){
  
            await axios({
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
        //   } else {
        //     toast.warn('You must be completed course part 1 before to start part 2.');
        //     return true;
        //   }

        // }
      } else{
        toast.warn('You must be completed course part 1 before to start part 2.');
        return false;
      }

      if(isCompleted) {
        await axios({
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
      }
    // history.push(`/course-view/${course.id}`);
  };

  const handlePayment = (courseId, coursePrice) => {
    
    let remains = 0;
  
    for(let i = 0; i < CoooperativesEnrolled.length; i++) {
      if(parseInt(CoooperativesEnrolled[i].student_id) && parseInt(CoooperativesEnrolled[i].course_id) === parseInt(courseId)){
        remains = coursePrice - CoooperativesEnrolled[i].amount;
      }
    }

    history.push(`/pay/${courseId}/?course_price=${remains}`);
  };
  
  

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
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
          <h2>My Courses</h2>
      
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Course Name</th>
        <th scope="col">Description</th>
        <th scope="col">Type</th>
        <th scope="col">Amount To Pay</th>
        <th scope="col">Paid Amount</th>
        <th scope="col">Remains Amount</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
    {cooperatives.length === 0 &&(<span>No record available</span>)}
    {cooperatives.map((cooperative) => (
      <tr>
        <td>{++sn}</td>
        <td>{cooperative.course_name} (part {cooperative.level}) </td>
        <td>{cooperative.description}</td>
        <td>PDF and Video</td>
        <td>{parseInt(cooperative.price).toLocaleString()}RWF</td>
        <td>
          {CoooperativesEnrolled.map((enrolled) => {
            if(parseInt(enrolled.student_id)  === parseInt(userID) && parseInt(enrolled.course_id)  === parseInt(cooperative.id)){
              paidAmount = enrolled.amount;
              if(enrolled.status){
                status = true;
              } else{
                status = false;
              }
            }
          })}
          {parseInt(paidAmount).toLocaleString()}RWF
        </td>
        <td>{parseInt(cooperative.price - paidAmount).toLocaleString()}RWF</td>
        <td>
          {status ? (
            <span className="badge bg-success px-2 py-2 w-100">Completed</span>
          ) : (
            <span className="badge bg-warning text-dark px-2 py-2 w-100">Pending</span>
          )}
        </td>
        <td>
          <div className="row g-3">
            <div className="col-6">
            <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <MdDownload style={{ color: "#fff", fontSize: "1.2rem" }} />{" "}
                  </button>
                  <div className="dropdown-menu" style={{marginLeft: '-90px'}}>
                    <button
                      className="dropdown-item text-white"
                      onClick={() => handleViewCourse(cooperative.level, 'pdf', cooperative.price)}
                    >
                      Download PDF
                    </button>
                    <button
                      className="dropdown-item text-white"
                      onClick={() => handleViewCourse(cooperative.level, 'video', cooperative.price)}
                    >
                      Download Video
                    </button>
                  </div>
                </div>
            </div>
            {parseInt(cooperative.price) !== parseInt(paidAmount) &&
             (<div className="col-5">
             <button
               className="btn btn-warning"
               title="Pay remainder"
               onClick={() => handlePayment(cooperative.id, cooperative.price)}
             >
               <MdPayment style={{ color: "#fff", fontSize: "1.2rem" }} />{" "}
             </button>
           </div>) 
            }
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
