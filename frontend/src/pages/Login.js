import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../utils/appUrls"; // ✅ Correct API URL import
import { errorPopUp, succesPopUp } from "../utils/Toaster";
import Nav from "../components/Nav";

const SimpleLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("studentToken");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(url.student.login, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('login res',response);
      if (response.data && response.data.token) {
        localStorage.setItem("studentToken", response.data.token);
        localStorage.setItem("student", JSON.stringify(response.data.student));
        navigate("/home");
        succesPopUp("Login Successful!");
      } else {
        errorPopUp(response.data.message || "Invalid credentials. Please try again.")
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        if (error.response.status === 403) {
          alert("Your account is pending admin approval.");
        } else if (error.response.status === 401) {
          alert("Invalid email or password.");
        } else {
          alert("Login failed. Please try again.");
        }
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <>
    
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </>
    
  );
};
export default SimpleLogin;
