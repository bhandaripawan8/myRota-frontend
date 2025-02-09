import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ManageShifts from "./sections/ManageShifts";
import ManageEmployees from "./sections/ManageEmployees";
import ShiftRequests from "./sections/ShiftRequests";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/dashboard/employer/manage-shifts":
        return <ManageShifts />;
      case "/dashboard/employer/manage-employees":
        return <ManageEmployees />;
      case "/dashboard/employer/manage-shift-requests":
        return <ShiftRequests />;
      default:
        return <h2>Employer Dashboard</h2>;
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

export default EmployerDashboard;