import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Statistics from "./Statistics";
import Sidebar from "./Sidebar";
const DashboardAdmin = () => {
  return (
    <>
      <Navbar />
      <div class="container-fluid pt-2">
        <div class="row">
          <Sidebar />
          <Statistics />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DashboardAdmin;
