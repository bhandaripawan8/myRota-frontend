import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RegisterCompany from "../pages/RegisterCompany/RegisterCompany";
import RegistrationSuccess from "../pages/authentication/UserRegistrationSuccess";
import SuccessPage from "../pages/RegisterCompany/SuccessPage";
import { ToastContainer } from "react-toastify";
import EmployerDashboard from "../pages/Dashboard/EmployerDashboard";
import EmployerProtectedRoutes from "../pages/protected-routes/EmployerProtectedRoutes";
import EmployeeProtectedRoutes from "../pages/protected-routes/EmployeeProtectedRoutes";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registercompany" element={<RegisterCompany />} />
        <Route path="/registercompany/success" element={<SuccessPage />} />
        <Route path="/register/success" element={<RegistrationSuccess />} />
        <Route path="/dashboard/employer/*" element={<EmployerProtectedRoutes><EmployerDashboard /></EmployerProtectedRoutes>} />
        <Route path="/dashboard/employee/*" element={<EmployeeProtectedRoutes><EmployeeDashboard /></EmployeeProtectedRoutes>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
