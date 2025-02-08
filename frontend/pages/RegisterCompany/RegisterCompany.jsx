import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCompanyStore from "../../Store/CompanyStore";
import "./RegisterCompany.css";

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
  });

  const { loading, error, registerCompany } = useCompanyStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRegisterClick = async () => {
    const response = await registerCompany(formData);
    console.log("Response from registerCompany:", response); // Add logging
    if (response && response.unique_code) {
      navigate("/registercompany/success", {
        state: { unique_code: response.unique_code },
      });
    } else {
      console.error("Failed to navigate to success page. Response:", response);
    }
  };

  return (
    <div className="register-company-container">
      <h1>Register Company</h1>
      {error && <p className="error-message">{error}</p>}
      <form>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3>Address</h3>
          <label>Street</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Zipcode</label>
          <input
            type="text"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={handleRegisterClick} disabled={loading}>
          {loading ? "Registering..." : "Register Company"}
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;
