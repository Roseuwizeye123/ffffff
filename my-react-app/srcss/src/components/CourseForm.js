import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseForm = () => {

  const userID = localStorage.getItem("userID");

  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState("");
  const [type, setType] = useState({});
  const [courseName, setCourseName] = useState({});
  const [coursePrice, setCoursePrice] = useState({});
  const [courseLevel, setCourseLevel] = useState({});
  const [description, setDescription] = useState({});
  const [file1, setFile1] = useState({});

  const onTypeChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setType({ value: em });
    } else {
      setType({ message: "Select Type" });
    }
  };

  const onCourseLevelChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setCourseLevel({ value: em });
    }else {
      setCourseLevel({ message: "Select Level" });
    }
  };

  const onDescriptionChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setDescription({ value: em });
    } else {
      setDescription({ message: "Write description please" });
    }
  };

  const onCourseNameChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setCourseName({ value: em });
    }else {
      setCourseName({ message: "Write course name" });
    }
  };

  const onCoursePriceChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setCoursePrice({ value: em });
    }else {
      setCoursePrice({ message: "Write course price" });
    }
  };

  // const onFile1Change = (e) => {
  //   var em = e.target.files[0];   
  //  if (em != "") {
  //     setFile1({ value: em });
  //   } else {
  //     setFile1({ message: "Upload file please" });
  //   }
  // };

  const onFile1Change = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Get the file's MIME type
      const fileType = file.type;
  
      // Check if the file type is allowed (PDF or video)
      if (fileType === "application/pdf" || fileType.startsWith("video/")) {
        setFile1({ value: file });
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

    if (type.value == null || type.value == "") {
      setType({ message: "Select Type" });
      toast.error("All fields are required");
    } else if (description.value == null || description.value == "") {
      setDescription({ message: "Enter description" });
      toast.error("All fields are required");
    } else if (courseName.value == null || courseName.value == "") {
      setCourseName({ message: "Enter course name" });
      toast.error("All fields are required");
    } else if (coursePrice.value == null || coursePrice.value == "") {
      setCoursePrice({ message: "Enter course price" });
      toast.error("All fields are required");
    } else if (courseLevel.value == null || courseLevel.value == "") {
      setCoursePrice({ message: "Enter course level" });
      toast.error("All fields are required");
    }else if (fileInput.files.length === 0) {
      toast.error("Course file is required");
    } 
    else {
      const formData = new FormData();
      formData.append("course", file1.value);
      formData.append("teacherID", userID);
      formData.append("file_type", type.value);
      formData.append("description", description.value);
      formData.append("course_name", courseName.value);
      formData.append("course_price", coursePrice.value);
      formData.append("course_level", courseLevel.value);

      // console.log(formData);

      // for (const pair of formData.entries()) {
      //   console.log(`${pair[0]}, ${pair[1]}`);
      // }
        
      setLoading(true);
      axios
        .post("http://127.0.0.1:8000/api/upload", formData)
        .then(function (response) {
          console.log("Response: ", response.data);
          // if(response.data.message === "Course name already exists"){
            toast.success(response.data.message);
          // } else{
          //   toast.success("Course added successfully");
          // }
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          toast.error("Failed to add course");
          console.log("Error response: ", error);
        });
    }
  };

  return (
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
        <h1 className="display-4">Add a Course</h1>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">File Type</label>
              <select className="form-control" id="sel1" onChange={onTypeChange}>
                <option></option>
                <option value='video'>Video</option>
                <option value='pdf'>Pdf</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">Course Name</label>
              <input type="text" 
              className="form-control" 
              name="course_name" 
              onChange={onCourseNameChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">Course Price</label>
              <input type="text" 
              className="form-control" 
              name="price" 
              onChange={onCoursePriceChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="fileType" className="text-white">Course Level</label>
              <select className="form-control" id="level" onChange={onCourseLevelChange}>
                <option></option>
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
              onChange={onDescriptionChange}
              rows="4"
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
              onChange={onFile1Change}
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
            Add Course
          </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
