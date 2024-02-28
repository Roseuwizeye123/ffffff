import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";

const UsersList = () => {
  const history = useHistory();

  const [cooperatives, setCoooperatives] = useState([]);
  useEffect(() => {
   
  }, []);

  return (
    <>
      <Navbar />
      <div style={{marginTop: '-32px'}}>
        <Sidebar />
      </div>
        <div>
        </div>
    </>
  );
};

export default UsersList;
