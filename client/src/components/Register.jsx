import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Axios instance
import "./Login.css"; // You can reuse your login CSS

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    contactNumber: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        contactNumber: formData.contactNumber,
      });

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Registration successful! Redirecting...");
      
      // Redirect based on role after short delay
      setTimeout(() => {
        const role = res.data.user.role;
        if (role === "student") navigate("/student");
        if (role === "teacher") navigate("/teacher");
        if (role === "admin") navigate("/admin");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="auth-container">
      {/* Left side illustration */}
      <div className="auth-left">
        <h2 className="auth-logo">Study Hive</h2>
        <div className="auth-illustration">
          <img
            src="https://i.pinimg.com/736x/c3/3c/49/c33c499ac84e8b5c424916765c913d6e.jpg"
            alt="illustration"
          />
        </div>
      </div>

      {/* Right side form */}
      <div className="auth-right">
        <div className="auth-box">
          <h2 className="auth-welcome">Create Account</h2>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="auth-input"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="auth-input"
            />

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="auth-input"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="auth-input"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="auth-select"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="auth-btn">
              Register
            </button>
          </form>

          <p className="auth-register">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
}
