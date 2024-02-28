import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    async function fetchCourse() {
        axios({
            url: `http://127.0.0.1:8000/api/view-course/${id}`,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'file.pdf'); //or any other extension
             document.body.appendChild(link);
             link.click();
          });

    //   try {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/view-course/${id}`);
    //     setCourse(response.data);
        
    //     downloadCourseFile(response.data.file_url);
    //     // console.log(response.data.file_url);
    //   } catch (error) {
    //     console.error("Error fetching course:", error);
    //   }
    }

    fetchCourse();

  }, [id]);

  const downloadCourseFile = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", course.name); // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
    <h1>Course Details</h1>
    <iframe
      height="500"
      width="500px"
      src="/viewcourse/{{$data->name}}"
    ></iframe>
  </div>
  );
};

export default CourseView;
