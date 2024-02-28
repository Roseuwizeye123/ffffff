import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import Course from "./components/Course";
import Pricing from "./components/Pricing";
import DashboardAdmin from "./components/DashboardAdmin";
import AddTeacher from "./components/AddTeacher";
import AddCourse from "./components/AddCourse";
import CourseScreen from "./components/CourseScreen";
import MyCourse from "./components/MyCourse";
import MyBooks from "./components/MyBooks";
import Students from "./components/Students";
import AllEnrollments from "./components/AllEnrollments";
import Payment from "./components/Payment";
import ProtectedRoute from "./components/ProtectedRoute";
import Forgot from './components/Forgot'

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />{" "}
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/forget">
        <Forgot/>
      </Route>
      {/* <Route path="/dashboard/:id">
        <Dashboard />
      </Route> */}

      <ProtectedRoute path="/dashboard/:id" component={Dashboard} />

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/course">
        <Course />
      </Route>

      <Route path="/pricing">
        <Pricing />
      </Route>
      {/* <Route path="/admin">
        <DashboardAdmin />
      </Route> */}

      <ProtectedRoute path="/admin" component={DashboardAdmin} />

      <Route path="/addCourse">
        <AddCourse />
      </Route>

      <Route path="/addTeacher">
        <AddTeacher />
      </Route>
      <Route path="/coursScreen">
        <CourseScreen />
      </Route>

      <Route path="/mycourses">
        <MyCourse />
      </Route>
      <Route path="/mybooks">
        <MyBooks />
      </Route>
      <Route path="/students">
        <Students />
      </Route>
      <Route path="/allEnrollments">
        <AllEnrollments />
      </Route>

      <Route path="/paymentmethod">
        <Payment />
      </Route>
    </Router>
  );
}

export default App;
