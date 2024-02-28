import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from './Footer'
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import Statistics from "./Statistics";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fileUrl = "http://127.0.0.1:8000/storage/";

const AdminAssessment = () => {
  const { id } = useParams();
  const role = localStorage.getItem('role');
  const [allQuestions, setAllQuestions] = useState([]);
  const [cooperatives, setCoooperatives] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [CoooperativesEnrolled, setCoooperativesEnrolled] = useState([]);
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [targetCourseQuestions, setTargetCourseQuestions] = useState([]);
  const [fullCourse, setFullCourse] = useState(false);
  const [selectedCourseLevel, setSelectedCourseLevel] = useState('');

  const userId = localStorage.getItem('userID');

  useEffect(() => {
    async function fetchAllQuestions() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/all_questions`
      );
      setAllQuestions(response.data);
    }

    fetchAllQuestions();
  }, []);


  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get("http://127.0.0.1:8000/api/courses");
      // console.log(response.data)
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

    async function fetchMyCourses() {
      let arr = [];
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enrolled-course/${userId}`
      );

      const res = await axios.get(
        `http://127.0.0.1:8000/api/completed_course/${userId}`
      );    

      if(res.data.length === 0){
        for(let i = 0; i < response.data.length; i++){
          if(parseInt(response.data[i].level) === 1 ){
            arr.push(response.data[i]);
          }
        }
      } 
      
      if(res.data.length === 1){
        for(let i = 0; i < response.data.length; i++){
          if(parseInt(response.data[i].level) === 2 ){
            arr.push(response.data[i]);
          }
        }
      }

     if(res.data.length === 2){
      setFullCourse(true);
     }

      // console.log("My coursess: "+response.data);
      setMyCourses(arr);
    }

    fetchMyCourses();

  }, []);

const handleAddNew = () =>{
    window.location.href = "/add-assessment";
}

let sn = 0;
let courseName = null;


function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

let snq = 0;
let score = 0;
let questionAndAnswer = [];

const handleOnSelectCourse = async(e) => {
  const em = e.target.value;

  for(let i = 0; i < cooperatives.length; i++){
    if(cooperatives[i].level === em){
      for(let k = 0; k < CoooperativesEnrolled.length; k++){
        if(parseInt(CoooperativesEnrolled[k].level) === parseInt(em) && 
         parseInt(CoooperativesEnrolled[k].student_id) === parseInt(userId)){
            if(parseInt(cooperatives[i].price) !== parseInt(CoooperativesEnrolled[k].amount)){
              toast.warn("You must complete your payment before to start assessment.");
              return false;
            }
          }
      }
   }
  }

  if (em !== "" && em != 'full') {

    setSelectedCourseLevel(em);
    // Filter questions based on the selected course level
    const filteredQuestions = allQuestions.filter(
      (question) => question.level === em
    );

    if(filteredQuestions.length < 10){
      toast.warn("Questions are not yet available");
      return false;
    }

    setIsCourseSelected(true);

    // Shuffle the filtered questions randomly
    const shuffledQuestions = shuffleArray(filteredQuestions);

    // Take the first ten questions from the shuffled array
    const selectedQuestions = shuffledQuestions.slice(0, 10);

    // Set the selected questions to setTargetCourseQuestions
    setTargetCourseQuestions(selectedQuestions);
  } else if(em === 'full') {

    setSelectedCourseLevel('full');

    setIsCourseSelected(true);

    const shuffledQuestions = shuffleArray(allQuestions);
    const selectedQuestions = shuffledQuestions.slice(0, 10);
    setTargetCourseQuestions(selectedQuestions);
  }
};


  const handleChoiceChange = (index, choice) => {
    // Check if a question with the same index already exists in the array
    const existingQuestionIndex = questionAndAnswer.findIndex(
      (item) => item.index === index
    );
  
    if (existingQuestionIndex !== -1) {
      // Update the existing question's answer
      questionAndAnswer[existingQuestionIndex].answer = choice;
    } else {
      // Add a new object to the array
      const obj = {
        index: index,
        question: targetCourseQuestions[index].question,
        answer: choice,
      };
      questionAndAnswer.push(obj);
    }
  };
  
  const handleScoreSubmit = async() => {
    score = 0;
    if(targetCourseQuestions.length !== questionAndAnswer.length){
      toast.warn("All questions are compulsory.");
      return false;
    }

    for(let i = 0; i < targetCourseQuestions.length; i++) {
      for(let k = 0; k < questionAndAnswer.length; k++) {
        if(targetCourseQuestions[i].question === questionAndAnswer[k].question){
          if(targetCourseQuestions[i].answer ===  questionAndAnswer[k].answer){
            score += 2;
          }
        }
      }
    }

    const formData = new FormData();
    formData.append('student_id', userId);
    formData.append('level', selectedCourseLevel)
    formData.append('score', score);

    try{
      const response = await axios.post(
        `http://127.0.0.1:8000/api/scores`, formData
      );
        toast.success(response.data.message);
        setTimeout(() =>{
          window.location.href = `/dashboard/${userId}`;
        }, 5000)
      }catch(error){
        console.log(error);
        toast.error("Failed to submit your anwers");
      }
    // for (const pair of formData.entries()) {
    //   console.log("Form data: "+`${pair[0]}, ${pair[1]}`);
    // }

  }


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
    {role === 'admin' ? (
    <div class="col-md-10 mt-5">
        <div class="row">
            <div className="col-10">
                <h2>List Of Prepared Assement</h2>
            </div>
            <div className="col-2">
                <button className="btn btn-primary" onClick={handleAddNew}>Add new</button>
            </div>
        </div><br/>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Name</th>
                <th scope="col">Question</th>
                <th scope="col">Choice 1</th>
                <th scope="col">Choice 2</th>
                <th scope="col">Choice 3</th>
                <th scope="col">Answer</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
            {allQuestions.length === 0 &&(<span>No record available</span>)}
                {allQuestions.map((question) =>(
                <tr>
                   <td>{++sn}</td>
                   {cooperatives.map((course) => {
                    if(parseInt(course.id) === parseInt(question.course_id)){
                      courseName = course.course_name + ' '+'part'+' '+ course.level;
                    }
                   })}
                    <td>{courseName}</td> 
                    <td>{question.question}</td> 
                    <td>{question.choice1}</td> 
                    <td>{question.choice2}</td> 
                    <td>{question.choice3}</td> 
                    <td>{question.answer}</td> 
                </tr>
                ))}
            </tbody>
          </table>
        </div>
    ): 
    
    (
    <div className="conatiner">
      <br/>
      <h5 className="px-5">You can take a test to determine your level to be ready for the provisional exam</h5>
      <br/>
      {/* <p className="px-5 ">Course: </p> */}
        {!isCourseSelected ? (
        <div className="form-group col-md-12 px-5">
          <label htmlFor="course" className="">Select course to start test</label>
          <select className="form-control" id="course" onChange={handleOnSelectCourse}>
            <option></option>
            {myCourses.map((course) =>(
              <option value={course.level}>{course.course_name} part {course.level}</option>
            ))}
            {fullCourse &&(
              <option value="full">Full course</option>
            )}
          </select>
        </div>
        ): (
          <div className="form-group col-md-12 px-5">
            <label htmlFor="course" className="">Now you can start your test</label>
            <select className="form-control" id="course" onChange={handleOnSelectCourse} disabled>
              <option></option>
              {myCourses.map((course) =>(
                <option value={course.level}>{course.course_name} part {course.level}</option>
              ))}
              <option value="all">Full course</option>
            </select>
          </div>
          )}
        <div className="px-5 my-5">
        {targetCourseQuestions.map((question, index) => (
        <div key={index}>
          <h5>{++snq}. {question.question}</h5>
            <div class="px-3">
              <label>
                <input
                  type="radio"
                  name={`choice${index}`}
                  value={question.choice1}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                {question.choice1}
              </label><br/>
              <label>
                <input
                  type="radio"
                  name={`choice${index}`}
                  value={question.choice2}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                {question.choice2}
              </label><br/>
              <label>
                <input
                  type="radio"
                  name={`choice${index}`}
                  value={question.choice3}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                {question.choice3}
              </label><br/>
            </div><br/>
        </div>
      ))}
        {isCourseSelected &&(
        <div className="form-group" style={{marginLeft: '17px', marginTop: "30px"}}>
          <button className="btn btn-primary" onClick={handleScoreSubmit}>Submit</button>
        </div>
        )}
        </div>
    </div>
    )
    
    }
    </div>
    <Footer/>
    
    </>
    
  );
};

export default AdminAssessment;
