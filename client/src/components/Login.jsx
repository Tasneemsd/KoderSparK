import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdEmail,
  MdLock,
  MdSchool,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student", // default role
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔹 Call backend login
      const res = await axios.post("https://koderspark-backend-2.onrender.com/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // 🔹 Save token + user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔹 Compare role (dropdown vs backend)
      const roleFromBackend = res.data.user.role;
      if (formData.role !== roleFromBackend) {
        setError("Role mismatch. Please select the correct role.");
        return;
      }

      // 🔹 Redirect based on backend role
      if (roleFromBackend === "student") {
        navigate("/student");
      } else if (roleFromBackend === "teacher") {
        navigate("/teacher");
      } else if (roleFromBackend === "admin") {
        navigate("/admin");
      } else {
        setError("Unknown role, contact administrator.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed, try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side Image */}
        <div className="login-image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/391/042/non_2x/online-learning-concept-with-cartoon-character-vector.jpg"
            alt="Students learning"
            className="login-illustration"
          />
        </div>

        {/* Right Side Form */}
        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <MdSchool size={50} className="login-icon" />
              <h1>Welcome Back!</h1>
              <p>Continue your learning journey 🚀</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="input-group">
                <MdEmail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <MdLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-btn"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>

              {/* Role Selection */}
              <div className="input-group">
                <MdSchool className="input-icon" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Show error */}
              {error && <p className="error-text">{error}</p>}

              {/* Button */}
              <button type="submit" className="login-btn1">
                Login
              </button>

              {/* Extra */}
              <div className="extra-links">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
