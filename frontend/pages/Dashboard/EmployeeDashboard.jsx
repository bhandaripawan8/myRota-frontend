import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import SetAvailability from "./sections/SetAvailability";
import MakeShiftRequest from "./sections/MakeShiftRequest";
import ViewMyShifts from "./sections/ViewMyShifts";
import BookLeave from "./sections/BookLeave";
// import "./Dashboard.css";

const EmployeeDashboard = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/dashboard/employee/set-availability":
        return <SetAvailability />;
      case "/dashboard/employee/shift-request":
        return <MakeShiftRequest />;
      case "/dashboard/employee/view-shifts":
        return <ViewMyShifts />;
      case "/dashboard/employee/book-leave":
        return <BookLeave />;
      default:
        return <h2>Employee Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeDashboard;