import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from './Footer'
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fileUrl = "http://127.0.0.1:8000/storage/";

const AddAssessment = () => {
  const { id } = useParams();
  const role = localStorage.getItem('role');
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState({});
  const [cooperatives, setCoooperatives] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [level, setLevel] = useState('');
  const [getQuestions, setGetQuestions] = useState([]);


  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      // console.log(response.data)
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


const onQuestionChange = (e) => {
  var em = e.target.value;
  if (em != "") {
    setQuestions({ ...questions, question: em });
  }else {
    
  }
};

const onChoiceOneChange = (e) => {
  var em = e.target.value;
  if (em != "") {
    setQuestions({ ...questions, choice1: em });
  }else {
    
  }
};
const onChoiceTwoChange = (e) => {
  var em = e.target.value;
  if (em != "") {
    setQuestions({ ...questions, choice2: em });
  }else {
    
  }
};

const onChoiceThreeChange = (e) => {
  var em = e.target.value;
  if (em != "") {
    setQuestions({ ...questions, choice3: em });
  }else {
    
  }
};

const onAnswerChange = (e) => {
  var em = e.target.value;
  if (em != "") {
    setQuestions({ ...questions, answer: em });
  }else {
    
  }
};

// let courseLevel = null;

const onSelectCourseChange = async(e) => {

  var em = e.target.value;
  
  // console.log("Questions: "+response.data)
  
  if (em != "") {

    let courseLevel = em.charAt(em.length - 1);
    setLevel(courseLevel);
    let courseId = em.substring(0, em.length - 1);

    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('level', courseLevel);

    const response = await axios.post(`http://127.0.0.1:8000/api/get_questions`, formData);
    setGetQuestions(response.data);

    // console.log(response)
  // for (const pair of formData.entries()) {
  //   console.log("Form data: "+`${pair[0]}, ${pair[1]}`);
  // }

    setQuestions({ ...questions, course_id: courseId });
    setShowForm(true);

  }else {
    
  }
}

const handleSubmitQuestion = () =>{

  const formData = new FormData();

  if(questions.question === undefined || questions.choice1 === undefined ||
    questions.choice2 === undefined || questions.choice3 === undefined ){
      toast.warn("All fields are required");
  } else if(questions.answer === questions.choice1 || questions.answer === questions.choice2 ||
    questions.answer == questions.choice3){
      // console.log('Answer: '+ questions.answer+" "+ "choice: "+questions.choice1);

    formData.append("course_id", questions.course_id);
    formData.append("level", level);
    formData.append("question", questions.question);
    formData.append("choice1", questions.choice1);
    formData.append("choice2", questions.choice2);
    formData.append("choice3", questions.choice3);
    formData.append("answer", questions.answer);

    axios
    .post("http://127.0.0.1:8000/api/add_assessment", formData)
    .then(function (response) {
      toast.success(response.data.message);
      setTimeout(() =>{
        window.location.reload();
      }, 5000)
    })
    .catch(function (error) {
      console.log(error);
      toast.error("Failed to add question");
    });

  } else {

    toast.warn("Provided answer my be matching with one in the choices");
  }

 
  
}

// console.log("form data is:  ", questions);

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
    <Navbar/>
    <div class="row">
      <Sidebar/>
      <div class="col-md-10 mt-5 px-5">
        <div className="form-group col-md-12">
          <label htmlFor="course" className="text-white">Select course</label>
          <h5>Select course</h5>
          <select className="form-control" id="course" onChange={onSelectCourseChange}>
            <option></option>
            {cooperatives.map((course) =>
              <option value={course.id + course.level}>{course.course_name} part {course.level}</option>
            )}
          </select>
          {showForm ? (
            <span class="py-4 text-primary">Available questions for this course: <span>{getQuestions.length} </span>
              {getQuestions.length < 10 ?  
              <span>(Course must have at least 10 questions to be attempted by student)</span> : null}
             
          </span>): null} 
          </div>
      {showForm ? (
        <div className="form-group col-md-12">
            <label htmlFor="question" className="font-weight-bold">Question ?</label>
            <textarea type="text" 
            className="form-control" 
            name="question" 
            required
            onChange={onQuestionChange}
            />
        </div>
        ): null} {showForm ? (
        <div className="form-group col-md-12">
            <label htmlFor="choice-1" className="">Choice 1</label>
            <input type="text" 
            className="form-control" 
            name="choice1"
            required 
            onChange={onChoiceOneChange}
            />
        </div>
        ): null} {showForm ? (
        <div className="form-group col-md-12">
            <label htmlFor="choice-2" className="text-bold-medium">Choice 2</label>
            <input type="text" 
            className="form-control" 
            name="choice2" 
            required
            onChange={onChoiceTwoChange}
            />
        </div>
        ): null} {showForm ? (
        <div className="form-group col-md-12">
            <label htmlFor="choice-2" className="">Choice 3</label>
            <input type="text" 
            className="form-control" 
            name="choice3" 
            required
            onChange={onChoiceThreeChange}
            />
        </div>
        ): null} {showForm ? (
        <div className="form-group col-md-12">
            <label htmlFor="answer" className="">Correct choice</label>
            <input type="text" 
            className="form-control" 
            name="answer" 
            required
            placeholder="Paste here the correct answer in the above your provieded choices"
            onChange={onAnswerChange}
            />
        </div>
        ): null} {showForm ? (
        <div className="form-group" style={{marginLeft: '17px', marginTop: "40px"}}>
          <button className="btn btn-primary" onClick={handleSubmitQuestion}>Submit</button>
        </div>
        ): null}
      </div>
    </div><br/><br/>

    <Footer/>
    
    </>
    
  );
};

export default AddAssessment;
