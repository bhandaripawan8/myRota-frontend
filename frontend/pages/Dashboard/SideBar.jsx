import React from "react";
import { Link } from "react-router-dom";
import useSidebarStore from "../../Store/SideBarStore";
import useAuthStore from "../../Store/AuthStore";
import { 
  FaBars, 
  FaCalendarAlt, 
  FaUsers, 
  FaClipboardList, 
  FaChartBar,
  FaClock,
  FaCalendarCheck,
  FaCalendarWeek,
  FaPlane
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { user } = useAuthStore();

  const EmployerLinks = () => (
    <>
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
    </>
  );

  const EmployeeLinks = () => (
    <>
      <li>
        <Link to="/dashboard/employee">
          <FaChartBar /> <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/employee/set-availability">
          <FaClock /> <span>Set Availability</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/employee/shift-request">
          <FaCalendarCheck /> <span>Request Shift</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/employee/view-shifts">
          <FaCalendarWeek /> <span>View My Shifts</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/employee/book-leave">
          <FaPlane /> <span>Book Leave</span>
        </Link>
      </li>
    </>
  );

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <ul className="sidebar-menu">
        {user?.role === 'employer' ? <EmployerLinks /> : <EmployeeLinks />}
      </ul>
    </div>
  );
};

export default Sidebar;
