import React from "react";
import { Link } from "react-router-dom";
import useSidebarStore from "../../Store/SideBarStore";
import { FaBars, FaCalendarAlt, FaUsers, FaClipboardList, FaChartBar } from "react-icons/fa";
import "./Sidebar.css";

const EmployerSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard/employer">
            <FaChartBar /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/employer/manage-shifts">
            <FaCalendarAlt /> <span>Manage Shifts</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/employer/manage-employees">
            <FaUsers /> <span>Employees</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/employer/manage-shift-requests">
            <FaClipboardList /> <span>Shift Requests</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default EmployerSidebar;
