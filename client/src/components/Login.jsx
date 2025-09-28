import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  // Demo user credentials
  const users = [
    { username: "student1", password: "12345", role: "student" },
    { username: "teacher1", password: "12345", role: "teacher" },
    { username: "admin1", password: "12345", role: "admin" },
  ];

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === formData.username &&
        u.password === formData.password &&
        u.role === formData.role
    );

    if (user) {
      // Store login data
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", "demo-token");

      // Role-based navigation
      if (user.role === "student") navigate("/student");
      if (user.role === "teacher") navigate("/teacher");
      if (user.role === "admin") navigate("/admin");
    } else {
      setError("Invalid login details. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        <h2 className="auth-logo">Study Hive</h2>
        <div className="auth-illustration">
          <img
            src="https://i.pinimg.com/736x/c3/3c/49/c33c499ac84e8b5c424916765c913d6e.jpg"
            alt="illustration"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="auth-box">
          <h2 className="auth-welcome">Welcome Back</h2>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
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

            <div className="auth-options">
              <label>
                <input type="checkbox" /> Keep me logged in
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="auth-btn">
              Log In
            </button>
          </form>

          <p className="auth-register">
            Need Help? <br />
            You are not a member? <a href="#">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
