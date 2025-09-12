import React from "react";
import "./StudentDashboard.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StudentDashboard() {
  const attendanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Attendance %",
        data: [85, 90, 80, 95, 88],
        backgroundColor: "#d32f2f",
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Student Dashboard</div>
        <div className="navbar-links">
          <button className="login-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>Attendance</li>
            <li>Results</li>
            <li>Events</li>
            <li>Notifications</li>
            <li>Logout</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Student Profile Section */}
          <div className="profile-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Student Avatar"
              className="profile-avatar"
            />
            <div>
              <h2>Tasneem Banu</h2>
              <p>Roll No: 21CSE123</p>
              <p>Course: B.Tech CSE</p>
              <p>Year: 4th Year</p>
            </div>
          </div>

          {/* Top Cards */}
          <div className="top-cards">
            <div className="card notifications">
              <h3>Notifications</h3>
              <ul>
                <li>Exam on Monday</li>
                <li>Holiday on Friday</li>
                <li>Project submission due</li>
              </ul>
            </div>
            <div className="card events">
              <h3>Events</h3>
              <p>Annual Sports Day - 25th Sept</p>
              <p>Hackathon - 30th Sept</p>
            </div>
            <div className="card attendance">
              <h3>Attendance</h3>
              <p>
                Overall: <span>88%</span>
              </p>
            </div>
          </div>

          {/* Exam Results Table */}
          <div className="results-section">
            <h2>Exam Results</h2>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mathematics</td>
                  <td>92</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>Science</td>
                  <td>85</td>
                  <td>B+</td>
                </tr>
                <tr>
                  <td>English</td>
                  <td>88</td>
                  <td>B+</td>
                </tr>
                <tr>
                  <td>Computer Science</td>
                  <td>95</td>
                  <td>A+</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Attendance Chart + Event Calendar */}
          <div className="chart-calendar">
            <div className="chart-section">
              <h3>Attendance Chart</h3>
              <Bar data={attendanceData} />
            </div>
            <div className="calendar-section">
              <h3>Event Calendar</h3>
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
