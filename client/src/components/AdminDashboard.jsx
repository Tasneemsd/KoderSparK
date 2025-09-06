import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Bell, 
  Settings, 
  Search,
  Filter,
  Download,
  Plus,
  BarChart3,
  PieChart,
  UserCheck,
  Clock,
  Award,
  MessageSquare,
  Home,
  FileText,
  DollarSign
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const statsCards = [
    {
      title: 'Total Students',
      value: '3,247',
      change: '+15%',
      changeType: 'positive',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Total Teachers',
      value: '198',
      change: '+8%',
      changeType: 'positive', 
      icon: GraduationCap,
      color: 'secondary'
    },
    {
      title: 'Active Courses',
      value: '56',
      change: '+12%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'accent'
    },
    {
      title: 'Attendance Rate',
      value: '96.8%',
      change: '+3%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'success'
    }
  ];

  const recentActivities = [
    { 
      type: 'enrollment', 
      message: 'New student Sarah Johnson enrolled in Grade 11', 
      time: '1 hour ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      type: 'grade', 
      message: 'Physics test results published for Grade 12A', 
      time: '3 hours ago',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      type: 'event', 
      message: 'Science Exhibition scheduled for next month', 
      time: '5 hours ago',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      type: 'attendance', 
      message: 'Weekly attendance report generated successfully', 
      time: '1 day ago',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const upcomingEvents = [
    { 
      title: 'Parent-Teacher Conference', 
      date: 'Mar 18, 2025', 
      time: '9:00 AM',
      type: 'meeting',
      participants: '150+ parents'
    },
    { 
      title: 'Annual Science Fair', 
      date: 'Mar 25, 2025', 
      time: '10:00 AM',
      type: 'event',
      participants: '500+ students'
    },
    { 
      title: 'Final Examinations', 
      date: 'Apr 1, 2025', 
      time: '8:00 AM',
      type: 'exam',
      participants: 'All grades'
    },
    { 
      title: 'Spring Vacation', 
      date: 'Apr 15, 2025', 
      time: 'All day',
      type: 'holiday',
      participants: 'School closed'
    }
  ];

  const quickActions = [
    { title: 'Add New Student', icon: Users, color: 'primary' },
    { title: 'Create Course', icon: BookOpen, color: 'secondary' },
    { title: 'Schedule Event', icon: Calendar, color: 'accent' },
    { title: 'Generate Report', icon: FileText, color: 'success' }
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-icon">
              <GraduationCap size={32} />
            </div>
            <div className="logo-text">
              <h1>Koder Spark</h1>
              <p>School Management System</p>
            </div>
          </div>
        </div>
        <div className="header-center">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search students, teachers, courses..." 
              className="search-input"
            />
            <div className="search-suggestions">
              <div className="suggestion-item">
                <Users size={16} />
                <span>Students</span>
              </div>
              <div className="suggestion-item">
                <GraduationCap size={16} />
                <span>Teachers</span>
              </div>
              <div className="suggestion-item">
                <BookOpen size={16} />
                <span>Courses</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-right">
          <button className="header-btn">
            <Bell />
            <span className="notification-badge">5</span>
          </button>
          <button className="header-btn">
            <Settings />
          </button>
          <div className="admin-profile">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Admin Profile" 
            />
            <div className="profile-info">
              <span className="profile-name">Dr. Michael Chen</span>
              <span className="profile-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          {[
            { id: 'overview', label: 'Dashboard', icon: Home },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'teachers', label: 'Teachers', icon: GraduationCap },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'reports', label: 'Analytics', icon: BarChart3 },
            { id: 'finance', label: 'Finance', icon: DollarSign }
          ].map((tab) => (
            <button 
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Welcome Section */}
            <section className="welcome-section">
              <div className="welcome-card">
                <div className="welcome-content">
                  <h2>Welcome back, Dr. Chen! 👋</h2>
                  <p>Here's what's happening at your school today. You have 3 pending approvals and 2 new messages.</p>
                  <div className="welcome-actions">
                    <button className="btn-primary">
                      <Plus size={16} />
                      Quick Actions
                    </button>
                    <button className="btn-secondary">
                      <FileText size={16} />
                      View Reports
                    </button>
                  </div>
                </div>
                <div className="welcome-illustration">
                  <div className="floating-card card-1">
                    <Users size={24} />
                  </div>
                  <div className="floating-card card-2">
                    <BookOpen size={24} />
                  </div>
                  <div className="floating-card card-3">
                    <Award size={24} />
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Cards */}
            <section className="stats-section">
              <div className="stats-grid">
                {statsCards.map((stat, index) => (
                  <div key={index} className={`stat-card ${stat.color}`}>
                    <div className="stat-header">
                      <div className="stat-icon-wrapper">
                        <stat.icon className="stat-icon" />
                      </div>
                      <div className={`stat-change ${stat.changeType}`}>
                        <TrendingUp size={14} />
                        {stat.change}
                      </div>
                    </div>
                    <div className="stat-content">
                      <h3>{stat.value}</h3>
                      <p>{stat.title}</p>
                    </div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions-section">
              <h3>Quick Actions</h3>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <button key={index} className={`quick-action-card ${action.color}`}>
                    <action.icon size={24} />
                    <span>{action.title}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Charts Section */}
            <section className="charts-section">
              <div className="charts-grid">
                <div className="chart-card large">
                  <div className="chart-header">
                    <div className="chart-title">
                      <h3>Student Enrollment Trends</h3>
                      <p>Monthly enrollment data for the current academic year</p>
                    </div>
                    <div className="chart-controls">
                      <select className="chart-select">
                        <option>Last 6 months</option>
                        <option>Last year</option>
                        <option>All time</option>
                      </select>
                      <button className="chart-btn">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="chart-content">
                    <div className="chart-placeholder">
                      <TrendingUp size={48} />
                      <h4>Enrollment Analytics</h4>
                      <p>Interactive chart showing student enrollment patterns and trends</p>
                    </div>
                  </div>
                </div>
                
                <div className="chart-card">
                  <div className="chart-header">
                    <div className="chart-title">
                      <h3>Grade Distribution</h3>
                      <p>Current academic performance</p>
                    </div>
                  </div>
                  <div className="chart-content">
                    <div className="chart-placeholder">
                      <PieChart size={48} />
                      <h4>Performance Overview</h4>
                      <div className="grade-stats">
                        <div className="grade-item">
                          <span className="grade-dot a"></span>
                          <span>A Grade: 35%</span>
                        </div>
                        <div className="grade-item">
                          <span className="grade-dot b"></span>
                          <span>B Grade: 40%</span>
                        </div>
                        <div className="grade-item">
                          <span className="grade-dot c"></span>
                          <span>C Grade: 25%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Activity and Events */}
            <section className="activity-events-section">
              <div className="activity-events-grid">
                <div className="activity-card">
                  <div className="card-header">
                    <div className="header-title">
                      <h3>Recent Activities</h3>
                      <p>Latest updates and notifications</p>
                    </div>
                    <button className="view-all-btn">
                      View All
                    </button>
                  </div>
                  <div className="activity-list">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-avatar">
                          <img src={activity.avatar} alt="User" />
                        </div>
                        <div className="activity-content">
                          <p className="activity-message">{activity.message}</p>
                          <span className="activity-time">
                            <Clock size={12} />
                            {activity.time}
                          </span>
                        </div>
                        <div className={`activity-type ${activity.type}`}>
                          <MessageSquare size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="events-card">
                  <div className="card-header">
                    <div className="header-title">
                      <h3>Upcoming Events</h3>
                      <p>Important dates and schedules</p>
                    </div>
                    <button className="add-event-btn">
                      <Plus size={16} />
                      Add Event
                    </button>
                  </div>
                  <div className="events-list">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="event-item">
                        <div className={`event-date ${event.type}`}>
                          <Calendar size={20} />
                        </div>
                        <div className="event-content">
                          <h4>{event.title}</h4>
                          <div className="event-details">
                            <span className="event-time">
                              <Clock size={12} />
                              {event.date} at {event.time}
                            </span>
                            <span className="event-participants">
                              <Users size={12} />
                              {event.participants}
                            </span>
                          </div>
                        </div>
                        <button className="event-action">
                          <Settings size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="tab-content">
            <div className="content-header">
              <div className="content-title">
                <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
                <p>Manage and monitor {activeTab} data efficiently</p>
              </div>
              <div className="content-actions">
                <button className="filter-btn">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="export-btn">
                  <Download size={16} />
                  Export
                </button>
                <button className="add-btn">
                  <Plus size={16} />
                  Add New
                </button>
              </div>
            </div>
            <div className="data-table-container">
              <div className="data-table-placeholder">
                <div className="placeholder-icon">
                  <BarChart3 size={64} />
                </div>
                <h3>Data Management Interface</h3>
                <p>Comprehensive {activeTab} management tools and data visualization will be displayed here</p>
                <button className="placeholder-btn">
                  <Plus size={16} />
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;