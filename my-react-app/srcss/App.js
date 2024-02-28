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
import Admins from "./components/Admins";
import AddCourse from "./components/AddCourse";
import CourseScreen from "./components/CourseScreen";
import MyCourse from "./components/MyCourse";
import MyBooks from "./components/MyBooks";
import Students from "./components/Students";
import AllEnrollments from "./components/AllEnrollments";
import Payment from "./components/Payment";
import ProtectedRoute from "./components/ProtectedRoute";
import Forgot from './components/Forgot'
import AllUsers from "./components/AllUsers";
import CourseView from "./components/CourseView";
import Settings from "./components/Settings";

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

      <Route path="/courses">
        <Course />
      </Route>

      <Route path="/pricing/:id">
        <Pricing />
      </Route>
      {/* <Route path="/pricing">
        <Pricing />
      </Route> */}
      {/* <Route path="/admin">
        <DashboardAdmin />
      </Route> */}

      {/* <ProtectedRoute path="/dashboard/:id" component={DashboardAdmin} /> */}

      <Route path="/addCourse">
        <AddCourse />
      </Route>

      <Route path="/admins">
        <Admins />
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

      <Route path="/pay/:id">
        <Payment />
      </Route>
      <Route path="/allusers">
        <AllUsers />
      </Route>
      <Route path="/course-view/:id">
        <CourseView />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
    </Router>
  );
}

export default App;
