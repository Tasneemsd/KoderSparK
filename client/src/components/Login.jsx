import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // import Axios instance
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      const role = res.data.user.role;
      if (role === "student") navigate("/student");
      if (role === "teacher") navigate("/teacher");
      if (role === "admin") navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Try again.");
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
            You are not a member? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
