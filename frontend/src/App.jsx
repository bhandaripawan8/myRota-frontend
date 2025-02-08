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

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registercompany" element={<RegisterCompany />} />
        <Route path="/registercompany/success" element={<SuccessPage />} />
        <Route path="/register/success" element={<RegistrationSuccess />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
