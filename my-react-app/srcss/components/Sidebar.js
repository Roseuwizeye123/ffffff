import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  MdDashboard,
  MdLibraryAdd,
  MdToc,
  MdOutlineMessage,
  MdArrowForward, 
  MdChevronRight,
  MdSettings
} from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { AiFillUnlock } from "react-icons/ai";
import { BiExit } from "react-icons/bi";

const Sidebar = () => {
  const history = useHistory();
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const role = localStorage.getItem("role");

  const userID = localStorage.getItem("userID");

  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload()
  }
  return (
    <>
      <div class="col-md-2 sidebar-bg sidebar ">
        <ul>
          {role === "student" && <>

          <li>
            <MdDashboard style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to={`/dashboard/${userID}`}>Dashboard</Link>
          </li>

          <li>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/mycourses">My Courses</Link>
          </li>
          
          <li>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/courses">All courses</Link>
          </li>


          <li>
            <BiExit
              style={{ color: "#fff", fontSize: "1.4rem" }}
              class="pr-1"
            />
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>

          </>}

          {role === "teacher" && <>

          <li>
            <MdLibraryAdd style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/addCourse">Add course</Link>
          </li>
          <li>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/coursScreen">All courses</Link>
          </li>

          <li>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/students">Students</Link>
          </li>
          <li>
            <BiExit
              style={{ color: "#fff", fontSize: "1.4rem" }}
              class="pr-1"
            />
            <Link  onClick={handleLogout}>
              Logout
            </Link>
          </li>
          
          </>}

          {role === "admin" && <>
          <li>
            <MdDashboard style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to={`/dashboard/${userID}`}>Dashboard</Link>
          </li>
          <li onClick={() => setShowUsersDropdown(!showUsersDropdown)}>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="#">Users</Link>
          </li>
          <div style={{marginLeft: '20px'}}>
            {showUsersDropdown === true && (
            <>
              <li>
                <MdChevronRight style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
                <Link to="/admins">Admins</Link>
              </li>
              <li>
                <MdChevronRight style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
                <Link to="/students">Students</Link>
              </li>

              <li>
                <MdChevronRight style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
                <Link to="/allusers">All users</Link>
              </li>
            </>
          )}
          </div>
          <li>
            <MdLibraryAdd style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/addCourse">Add course</Link>
          </li>
          <li>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/coursScreen">All courses</Link>
          </li>
          {/* <li>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/mybooks">Books</Link>
          </li> */}

          <li>
            <MdToc style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/allEnrollments">Enrollments</Link>
          </li>


          <li>
            <MdSettings style={{ color: "#fff", fontSize: "1.4rem" }} />{" "}
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <BiExit
              style={{ color: "#fff", fontSize: "1.4rem" }}
              class="pr-1"
            />
            <Link  onClick={handleLogout}>
              Logout
            </Link>
          </li>       
          </>}

        </ul>
      </div>
    </>
  );
};

export default Sidebar;
