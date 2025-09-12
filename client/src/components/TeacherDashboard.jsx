import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  Bell,
  Settings,
  Search,
  Clock,
  Award,
  MessageSquare,
  GraduationCap,
  CheckCircle,
  Star,
  Eye,
  Brain,
  Upload,
  BarChart3,
  UserCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./TeacherDashboard.css";

export default function TeacherDashboard() {
  const [notifications] = useState([
    { id: 1, text: "New assignment submitted by Rahul", time: "2h ago" },
    { id: 2, text: "Meeting scheduled for Friday", time: "5h ago" },
    { id: 3, text: "New message from Admin", time: "1d ago" },
  ]);

  const [events] = useState([
    { id: 1, title: "Parent-Teacher Meeting", date: "15 Sept" },
    { id: 2, title: "Exam Paper Submission", date: "20 Sept" },
    { id: 3, title: "Science Fair", date: "25 Sept" },
  ]);

  // Attendance Data
  const attendanceData = [
    { day: "Mon", value: 92 },
    { day: "Tue", value: 96 },
    { day: "Wed", value: 88 },
    { day: "Thu", value: 94 },
    { day: "Fri", value: 90 },
  ];

  // Performance Distribution
  const performanceData = [
    { name: "Excellent", value: 45 },
    { name: "Good", value: 35 },
    { name: "Average", value: 15 },
    { name: "Weak", value: 5 },
  ];

  const COLORS = ["#4caf50", "#2196f3", "#ffc107", "#f44336"];

  return (
    <div className="teacher-dashboard">
      {/* ===== Header ===== */}
      <header className="td-header">
        <div className="td-logo-section">
          <div className="td-logo-icon">
            <GraduationCap size={22} />
          </div>
          <div className="td-logo-text">
            <h1>Koder Spark</h1>
            <p>Teacher Panel</p>
          </div>
        </div>

        <div className="td-search-container">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search students, courses, events..."
            className="td-search-input"
          />
        </div>

        <div className="td-header-right">
          <button className="td-header-btn">
            <Settings size={20} />
          </button>
          <button className="td-header-btn">
            <Bell size={20} />
            <span className="td-notification-badge">3</span>
          </button>
          <div className="td-profile">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="td-profile-img"
            />
            <span className="td-profile-name">Ms. Priya</span>
          </div>
        </div>
      </header>

      {/* ===== Content ===== */}
      <div className="td-content">
        {/* Overview Cards */}
        <div className="td-cards">
          <div className="td-card purple">
            <Users size={26} />
            <div>
              <h3>120</h3>
              <p>Students</p>
            </div>
          </div>
          <div className="td-card blue">
            <BookOpen size={26} />
            <div>
              <h3>8</h3>
              <p>Subjects</p>
            </div>
          </div>
          <div className="td-card green">
            <CheckCircle size={26} />
            <div>
              <h3>95%</h3>
              <p>Attendance</p>
            </div>
          </div>
          <div className="td-card orange">
            <Award size={26} />
            <div>
              <h3>15</h3>
              <p>Awards</p>
            </div>
          </div>
        </div>

        {/* Notifications & Events */}
        <div className="td-flex">
          <div className="td-section">
            <h2 className="td-section-title">
              <Bell size={18} /> Notifications
            </h2>
            <ul className="td-list">
              {notifications.map((note) => (
                <li key={note.id} className="td-list-item">
                  <MessageSquare size={16} />
                  <span>{note.text}</span>
                  <small>{note.time}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="td-section">
            <h2 className="td-section-title">
              <Calendar size={18} /> Upcoming Events
            </h2>
            <ul className="td-list">
              {events.map((event) => (
                <li key={event.id} className="td-list-item">
                  <Clock size={16} />
                  <span>{event.title}</span>
                  <small>{event.date}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts Section */}
        <div className="td-flex">
          <div className="td-section">
            <h2 className="td-section-title">
              <BarChart3 size={18} /> Attendance Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6a11cb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="td-section">
            <h2 className="td-section-title">
              <Star size={18} /> Student Performance
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="td-section">
          <h2 className="td-section-title">
            <Star size={18} /> Quick Actions
          </h2>
          <div className="td-actions">
            <button>
              <Upload size={18} /> Upload Assignment
            </button>
            <button>
              <BarChart3 size={18} /> View Reports
            </button>
            <button>
              <Eye size={18} /> Review Submissions
            </button>
            <button>
              <Brain size={18} /> Create Quiz
            </button>
            <button>
              <UserCheck size={18} /> Mark Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
