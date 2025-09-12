import React, { useState } from "react";
import "./AdminDashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [date, setDate] = useState(new Date());

  // Earnings area chart (Line with fill)
  const earningsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Earnings",
        data: [12000, 22000, 18000, 25000, 32000, 28000, 36000],
        fill: true,
        backgroundColor: "rgba(217, 70, 239, 0.12)", // subtle fill
        borderColor: "#ef4444", // red-ish
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Collection",
        data: [9000, 16000, 12000, 21000, 24000, 20000, 30000],
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        borderColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const earningsOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f1f5f9" }, ticks: { beginAtZero: true } },
    },
  };

  // Expenses bar chart
  const expensesData = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Expenses",
        data: [12000, 19000, 15000],
        backgroundColor: ["#60a5fa", "#34d399", "#f59e0b"],
      },
    ],
  };
  const expensesOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f1f5f9" }, beginAtZero: true },
    },
  };

  // Students donut
  const studentsData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [82000, 65000, 15000],
        backgroundColor: ["#f97316", "#60a5fa", "#a78bfa"],
      },
    ],
  };

  // Website Traffic sample
  const traffic = [
    { label: "Direct", value: 1290, percent: "45%" },
    { label: "Search", value: 7245, percent: "27%" },
    { label: "Referrals", value: 3245, percent: "16%" },
    { label: "Social", value: 1260, percent: "12%" },
  ];

  // Notifications (notice board)
  const notices = [
    { title: "Great School manage news", time: "3 min ago" },
    { title: "Exam schedule published", time: "1 hour ago" },
    { title: "New event added", time: "2 days ago" },
  ];

  return (
    <div className="admin-app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">KODER SPARK</div>
        </div>
        <nav className="side-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Students</li>
            <li>Teachers</li>
            <li>Parents</li>
            <li>Library</li>
            <li>Account</li>
            <li>Transport</li>
            <li>Hostel</li>
            <li>Notice</li>
            <li>Messages</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main-area">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="search-area">
            <input placeholder="Find something..." />
          </div>
          <div className="top-actions">
            <div className="top-icons">👤 Admin</div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="page-content">
          {/* Header Stats */}
          <section className="stats-row">
            <div className="stat-card">
              <div className="stat-title">Students</div>
              <div className="stat-value">150000</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Teachers</div>
              <div className="stat-value">2250</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Parents</div>
              <div className="stat-value">5890</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Earnings</div>
              <div className="stat-value">$1,920,000</div>
            </div>
          </section>

          {/* Charts Row (earnings + expenses) */}
          <section className="charts-row">
            <div className="card earnings-card">
              <div className="card-header">
                <h4>Earnings</h4>
                <div className="card-sub">Total Collections • Fees Collection</div>
              </div>
              <div className="chart-area" style={{ height: 220 }}>
                <Line data={earningsData} options={earningsOptions} />
              </div>
            </div>

            <div className="card expenses-card">
              <div className="card-header">
                <h4>Expenses</h4>
                <div className="card-sub">Jan 2019 - Mar 2019</div>
              </div>
              <div className="chart-area" style={{ height: 220 }}>
                <Bar data={expensesData} options={expensesOptions} />
              </div>
            </div>
          </section>

          {/* Middle Row: donut + calendar + traffic + notice */}
          <section className="middle-row">
            <div className="card donut-card">
              <h4>Students</h4>
              <div className="donut-wrap">
                <Doughnut data={studentsData} />
              </div>
              <div className="donut-legend">
                <div><span className="dot" style={{background:"#f97316"}}></span> Male 82,000</div>
                <div><span className="dot" style={{background:"#60a5fa"}}></span> Female 65,000</div>
                <div><span className="dot" style={{background:"#a78bfa"}}></span> Other 15,000</div>
              </div>
            </div>

            <div className="card calendar-card">
              <h4>Event Calendar</h4>
              <Calendar onChange={setDate} value={date} />
            </div>

            <div className="card traffic-card">
              <h4>Website Traffic</h4>
              <div className="traffic-list">
                {traffic.map((t, i) => (
                  <div key={i} className="traffic-row">
                    <div className="traffic-left">
                      <div className="traffic-label">{t.label}</div>
                      <div className="traffic-value">{t.value}</div>
                    </div>
                    <div className="traffic-right">
                      <div className="traffic-percent">{t.percent}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card notice-card">
              <h4>Notice Board</h4>
              <div className="notice-list">
                {notices.map((n, i) => (
                  <div key={i} className="notice-item">
                    <div className="notice-title">{n.title}</div>
                    <div className="notice-time">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
