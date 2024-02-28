import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from './Footer'
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import Statistics from "./Statistics";

const fileUrl = "http://127.0.0.1:8000/storage/";

const Dashboard = () => {
  const { id } = useParams();
  const role = localStorage.getItem('role');
  const [courses, setCourses] = useState([]);
  const [course1, setCourse1] = useState('');
  const [course2, setCourse2] = useState('');
  const [scores, setScores] = useState([]);
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [fullScore, setFullScore] = useState('Not yet done');
  const [evaluate, setEvaluate] = useState('You are adivised to keep learning, do not sit for provisional exam');

  let c1 = null;
  let c2 = null;
  let sc1 = 'Not yet done';
  let sc2= 'Not yet done';
  let fsc = 'Not yet done';

  useEffect(() => {
    async function fetchCourses() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/enrolled-course/${id}`
      );
      setCourses(response.data);
      for(let i = 0; i < response.data.length; i++){
        if(parseInt(response.data[i].level) === 1){
          c1 = response.data[i].course_name + ' part ' + response.data[i].level;
        } else{
          c2 = response.data[i].course_name + ' part ' + response.data[i].level;
        } 
        
      }
      setCourse1(c1);
      setCourse2(c2);

    }
    fetchCourses();

    async function fetchScores() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/scores/${id}`
      );
      setScores(response.data);

      for(let i = 0; i < response.data.length; i++){
        if(parseInt(response.data[i].level) === 1){
          sc1 = response.data[i].score + '/' + 20;
        } else if(parseInt(response.data[i].level) === 2){
          sc2 = response.data[i].score + '/' + 20;
        } else if(response.data[i].level === 'full'){
          fsc = response.data[i].score;
        }
      }

      setScore1(sc1);
      setScore2(sc2);
      setFullScore(fsc);
      if(fsc >= 15){
        setEvaluate('You are ready to sit for provisional exam');
      }
    }
    fetchScores();
  }, []);
  

  return (

    <>
    <Navbar/>
    <div class="row">
    <Sidebar/>
    <div class="col-md-10">
       <div className="dashboard">
        {role === 'admin'?
          <Statistics />
        :(
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
              <div class="card bg-info text-white">
                <div class="card-body">
                  <h5 class="card-title">Your scores for {course1}:</h5>
                  <p class="card-text">{score1}</p>
                </div>
                </div>
              </div>
              <div class="col-md-6">
              <div class="card bg-info text-white">
                <div class="card-body">
                  <h5 class="card-title">Your scores for {course2}:</h5>
                  <p class="card-text">{score2}</p>
                </div>
                </div>
              </div>

            </div><br/><br/>
            <div class="row">
            <div class="col-md-6">
              <div class="card bg-info text-white">
                <div class="card-body">
                  <h5 class="card-title">Your scores for full course:</h5>
                  <p class="card-text">{fullScore}</p>
                </div>
                </div>
              </div>
              <div class="col-md-6">
              <div class="card bg-success text-white">
                <div class="card-body">
                  <h5 class="card-title">Evaluetion:</h5>
                  <p class="card-text">{evaluate}</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
    </div>
    </div>
    
    <Footer/>
    
    </>
    
  );
};

export default Dashboard;
