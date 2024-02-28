import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const UpdateCourse = () => {

  const userID = localStorage.getItem("userID");
  const role = localStorage.getItem("role");
  const { level } = useParams();

  const [loading, setLoading] = useState("");
  const [cooperatives, setCoooperatives] = useState([]);
  const [type, setType] = useState({});
  const [courseName, setCourseName] = useState({});
  const [coursePrice, setCoursePrice] = useState({});
  const [courseLevel, setCourseLevel] = useState({});
  const [description, setDescription] = useState({});
  const [file1, setFile1] = useState({});
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);


  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get_course/${level}`
      );
      console.log(response.data);
      setCoooperatives(response.data);
    }

    fetchCourses();

}, []);

const onCourseChange = (e) => {
    const selectedCourseId = parseInt(e.target.value);

    if (selectedCourseId !== 0) {
      // Find the selected course from the list of courses
      const course = cooperatives.find((c) => c.id === selectedCourseId);

      if (course) {
        setType({ value: course.type });
        setCourseLevel({ value: course.level });
        setDescription({ value: course.description });
        setCourseName({ value: course.course_name });
        setCoursePrice({ value: course.price });
        setSelectedCourse(course);
        setIsCourseSelected(true);
      }
    } else {
      // Handle the case when "Select Course" is chosen
    //   setSelectedCourse(null);
      setIsCourseSelected(false);
    }
    
  };

  const onTypeChange = (newValue) => {
    setSelectedCourse((prevState) => ({
        ...prevState,
        type: newValue,
      }));
  };

  const onCourseLevelChange = (newValue) => {
    setSelectedCourse((prevState) => ({
        ...prevState,
        level: newValue,
      }));
  };

  const onDescriptionChange = (newValue) => {
    setSelectedCourse((prevState) => ({
        ...prevState,
        description: newValue,
      }));
  };

  const onCourseNameChange = (newValue) => {

    setSelectedCourse((prevState) => ({
        ...prevState,
        course_name: newValue,
      }));

  };

  const onCoursePriceChange = (newValue) => {
    setSelectedCourse((prevState) => ({
        ...prevState,
        price: newValue,
      }));
  };

  // const onFile1Change = (e) => {
  //   var em = e.target.files[0];   
  //  if (em != "") {
  //     setFile1({ value: em });
  //   } else {
  //     setFile1({ message: "Upload file please" });
  //   }
  // };

  const onFile1Change = (newValue) => {
    const file = newValue; // Access the selected file from the event
    if (file) {
      // Get the file's MIME type

      const fileType = file.type;
  
      // Check if the file type is allowed (PDF or video)
      if (fileType === "application/pdf" || fileType.startsWith("video/")) {
        setSelectedCourse((prevState) => ({
          ...prevState,
          file: file, // Set the file in the state
        }));
      } else {
        setFile1({ message: "Only PDF and video files are allowed" });
      }
    } else {
      setFile1({ message: "Upload a file, please" });
    }
  };
  

  const fileInput = document.getElementById('file');
  
  const handleUpload = (e) => {
    e.preventDefault();

    if (selectedCourse.type == "") {
      setType({ message: "Select Type" });
      toast.error("All fields are required");
    } else if (selectedCourse.description == "") {
      setDescription({ message: "Enter description" });
      toast.error("All fields are required");
    } else if (selectedCourse.course_name == "") {
      setCourseName({ message: "Enter course name" });
      toast.error("All fields are required");
    } else if (selectedCourse.price == "") {
      setCoursePrice({ message: "Enter course price" });
      toast.error("All fields are required");
    } else if (selectedCourse.level == "") {
      setCoursePrice({ message: "Enter course level" });
      toast.error("All fields are required");
    } else {
      const formData = new FormData();
      formData.append("course", selectedCourse.file);
      formData.append("teacherID", userID);
      formData.append("file_type", selectedCourse.type);
      formData.append("description", selectedCourse.description);
      formData.append("course_name", selectedCourse.course_name);
      formData.append("course_price", selectedCourse.price);
      formData.append("course_level", selectedCourse.level);

    //   for (const pair of formData.entries()) {
    //     console.log(`${pair[0]}, ${pair[1]}`);
    //   }
        
      setLoading(true);
      axios
        .post(`http://127.0.0.1:8000/api/update_course/${selectedCourse.id}`, formData)
        .then(function (response) {
          // if(response.data.message === "Course name already exists"){
            toast.success(response.data.message);
          // } else{
          //   toast.success("Course added successfully");
          // }
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          toast.error("Failed to update course, check if valid file selected");
          console.log("Error response: ", error);
        });
    }
  };

  return (
    <>
    <div className="container mt-5">
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
      
      <div className="jumbotron bg-secondary">
        <h1 className="display-4">Update a Course</h1>
        {!isCourseSelected &&(
            <div className="form-group col-md-12">
            <label htmlFor="fileType" className="text-white">Select File Type</label>
            <select className="form-control" id="fite-type" onChange={onCourseChange}>
              <option></option>
              {cooperatives.map((course) =>
                <option value={course.id}>{course.type}</option>
              )}
            </select>
          </div>
        )}
        {isCourseSelected &&(
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">File Type</label>
              <select className="form-control" id="sel1" onChange={(e) =>onTypeChange(e.target.value)}>
                <option>{selectedCourse.type}</option>
                <option value='video'>Video</option>
                <option value='pdf'>PDF</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">Course Name</label>
              <input type="text" 
              className="form-control" 
              name="course_name" 
              value={selectedCourse.course_name}
              onChange={(e) => onCourseNameChange(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">Course Price</label>
              <input type="text" 
              className="form-control" 
              name="price" 
              value={selectedCourse.price}
              onChange={(e) => onCoursePriceChange(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">Course Level</label>
              <select className="form-control" id="level" onChange={(e) => onCourseLevelChange(e.target.value)}>
                <option>{selectedCourse.level}</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
              </select>
            </div>
            </div>
          <div className="form-group">
            <label htmlFor="description" className="text-white">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows="4"
              value={selectedCourse.description}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="file" className="text-white">Upload File</label>
            <input
              type="file"
              className="form-control-file"
              id="file"
              name="file"
              onChange={(e) =>onFile1Change(e.target.files[0])}
              required
            />
          </div>
          {loading ? (
            <button class="btn btn-block  login-btn" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <button
            type="submit"
            className="btn btn-primary"
            onClick={handleUpload}
          >
            Update Course
          </button>
          )}
        </form>
        )}
      </div>
    </div>
    </>
  );
};

export default UpdateCourse;
