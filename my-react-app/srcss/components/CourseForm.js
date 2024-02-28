import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseForm = () => {

  const userID = localStorage.getItem("userID");

  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState("");
  const [type, setType] = useState({});
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

  const onDescriptionChange = (e) => {
    var em = e.target.value;
    if (em != "") {
      setDescription({ value: em });
    } else {
      setDescription({ message: "Write description please" });
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
  
  const handleUpload = (e) => {
    e.preventDefault();

    if (type.value == null || type.value == "") {
      setType({ message: "Select Type" });
    } else if (description.value == null || description.value == "") {
      setDescription({ message: "Enter description" });
    } else {
      const formData = new FormData();
      formData.append("course", file1.value);
      formData.append("teacherID", userID);
      formData.append("file_type", type.value);
      formData.append("description", description.value);

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }
        
      setLoading(true);
      axios
        .post("http://127.0.0.1:8000/api/upload", formData)
        .then(function (response) {
          toast.success("Course Added successfully");
          // console.log("Successful response: ", response.data);
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
      <div className="jumbotron bg-secondary">
        <h1 className="display-4">Add a Course</h1>
        <form>
          <div className="form-group">
            <label htmlFor="fileType">File Type</label>
            <select class="form-control " id="sel1" onChange={onTypeChange}>
              <option></option>
              <option value='video'>Video</option>
              <option value='pdf'>Pdf</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
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
            <label htmlFor="file">Upload File</label>
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
