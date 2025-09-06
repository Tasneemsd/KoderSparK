import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Bell, 
  Settings, 
  Search,
  UserCheck,
  Clock,
  Award,
  MessageSquare,
  Home,
  FileText,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Star,
  Edit,
  Eye,
  Send,
  Brain,
  Upload,
  PenTool,
  ClipboardList,
  BarChart3
} from 'lucide-react';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Teacher information
  const teacherInfo = {
    name: "Prof. Sarah Wilson",
    subjects: ["Mathematics", "Physics"],
    classes: ["Grade 10A", "Grade 11B", "Grade 12C"],
    totalStudents: 247,
    pendingEvaluations: 12
  };

  // Quick actions for teacher card
  const quickActions = [
    { title: 'Upcoming Classes', icon: Clock, count: 3 },
    { title: 'Pending Evaluations', icon: CheckCircle, count: 12 }
  ];

  // Main sections/buttons
  const mainSections = [
    { id: 'attendance', title: 'Attendance', icon: UserCheck, description: 'Mark & edit student attendance' },
    { id: 'reports', title: 'Reports', icon: FileText, description: 'Add academic/behavioral remarks' },
    { id: 'schedule', title: 'Schedule', icon: Calendar, description: 'View & modify teaching schedules' },
    { id: 'exams', title: 'Exams', icon: Award, description: 'Upload results, assign exams' },
    { id: 'papers', title: 'Previous Papers', icon: Upload, description: 'Upload/manage past papers' }
  ];

  // AI insights
  const aiInsights = [
    { 
      message: "Class 10A has low average in Math → Plan revision session",
      type: "warning",
      icon: Brain
    },
    { 
      message: "Grade 12C showing excellent progress in Physics",
      type: "success", 
      icon: Star
    },
    {
      message: "Attendance rate dropped 5% this week - consider follow-up",
      type: "info",
      icon: BarChart3
    }
  ];

  // Notifications (pending admin approval)
  const pendingNotifications = [
    { message: "Request to announce Math test postponement", status: "pending" },
    { message: "Parent-teacher meeting schedule update", status: "approved" }
  ];

  // Events (view only - cannot edit)
  const upcomingEvents = [
    { title: "Annual Science Fair", date: "March 15, 2024", time: "10:00 AM" },
    { title: "Parent-Teacher Conference", date: "March 20, 2024", time: "2:00 PM" },
    { title: "Mid-term Examinations", date: "March 25, 2024", time: "9:00 AM" }
  ];

  return (
    <div className="teacher-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-icon">
              <GraduationCap size={32} />
            </div>
            <div className="logo-text">
              <h1>Koder Spark</h1>
              <p>Teacher Portal</p>
            </div>
          </div>
        </div>
        <div className="header-center">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search students, classes, assignments..." 
              className="search-input"
            />
          </div>
        </div>
        <div className="header-right">
          <button className="header-btn">
            <Bell />
            <span className="notification-badge">7</span>
          </button>
          <button className="header-btn">
            <Settings />
          </button>
          <div className="teacher-profile">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Teacher Profile" 
            />
            <div className="profile-info">
              <span className="profile-name">{teacherInfo.name}</span>
              <span className="profile-role">Mathematics & Physics Teacher</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeSection === 'dashboard' && (
          <div className="dashboard-content">
            {/* Teacher Card */}
            <section className="teacher-card-section">
              <div className="teacher-card">
                <div className="teacher-card-header">
                  <div className="teacher-avatar">
                    <img 
                      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Teacher Profile" 
                    />
                  </div>
                  <div className="teacher-details">
                    <h2>{teacherInfo.name}</h2>
                    <div className="teacher-info">
                      <div className="info-item">
                        <span className="info-label">Subjects Assigned:</span>
                        <span className="info-value">{teacherInfo.subjects.join(', ')}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Classes Handled:</span>
                        <span className="info-value">{teacherInfo.classes.join(', ')}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Total Students:</span>
                        <span className="info-value">{teacherInfo.totalStudents}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="teacher-card-actions">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions-grid">
                    {quickActions.map((action, index) => (
                      <div key={index} className="quick-action-item">
                        <action.icon size={20} />
                        <div className="action-info">
                          <span className="action-title">{action.title}</span>
                          <span className="action-count">{action.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Main Sections */}
            <section className="main-sections">
              <h3>Dashboard Sections</h3>
              <div className="sections-grid">
                {mainSections.map((section) => (
                  <button 
                    key={section.id}
                    className="section-card"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className="section-icon">
                      <section.icon size={32} />
                    </div>
                    <div className="section-content">
                      <h4>{section.title}</h4>
                      <p>{section.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* AI Insights */}
            <section className="ai-insights-section">
              <div className="section-header">
                <h3>
                  <Brain size={20} />
                  AI-Driven Insights
                </h3>
              </div>
              <div className="insights-grid">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`insight-card ${insight.type}`}>
                    <insight.icon size={20} />
                    <p>{insight.message}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Notifications & Events */}
            <section className="notifications-events-section">
              <div className="notifications-events-grid">
                <div className="notifications-card">
                  <div className="card-header">
                    <h3>Notifications to Students</h3>
                    <span className="subtitle">(Pending Admin Approval)</span>
                  </div>
                  <div className="notifications-list">
                    {pendingNotifications.map((notification, index) => (
                      <div key={index} className={`notification-item ${notification.status}`}>
                        <MessageSquare size={16} />
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <span className={`status ${notification.status}`}>
                            {notification.status === 'pending' ? 'Pending Approval' : 'Approved'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="events-card">
                  <div className="card-header">
                    <h3>Upcoming Events</h3>
                    <span className="subtitle">(View Only)</span>
                  </div>
                  <div className="events-list">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="event-item">
                        <Calendar size={16} />
                        <div className="event-content">
                          <h4>{event.title}</h4>
                          <div className="event-details">
                            <span>{event.date}</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <Eye size={16} className="view-only-icon" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Section Content */}
        {activeSection !== 'dashboard' && (
          <div className="section-content">
            <div className="section-header">
              <button 
                className="back-btn"
                onClick={() => setActiveSection('dashboard')}
              >
                ← Back to Dashboard
              </button>
              <div className="section-title">
                <h2>{mainSections.find(s => s.id === activeSection)?.title} Management</h2>
                <p>Manage your {activeSection} efficiently and effectively</p>
              </div>
            </div>
            <div className="section-placeholder">
              <div className="placeholder-content">
                <BookOpen size={64} />
                <h3>{mainSections.find(s => s.id === activeSection)?.title} Interface</h3>
                <p>{mainSections.find(s => s.id === activeSection)?.description}</p>
                <button className="get-started-btn">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;