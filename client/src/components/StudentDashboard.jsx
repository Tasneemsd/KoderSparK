import React, { useState, useEffect } from 'react';
import { 
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
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Star,
  Play,
  User,
  Target,
  Bookmark,
  Users,
  QrCode,
  CreditCard,
  Calendar as CalendarIcon,
  BookMarked,
  Trophy,
  Brain,
  Lightbulb,
  Newspaper,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  ClipboardList,
  Eye,
  ChevronRight,
  Activity
} from 'lucide-react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [aiContent, setAiContent] = useState({
    studyTip: "Break down complex problems into smaller, manageable parts. This helps improve understanding and retention.",
    motivationalQuote: "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    educationalNews: "New research shows that active learning techniques improve student performance by 40%"
  });

  // Student Data
  const studentData = {
    name: "Emma Johnson",
    rollNo: "2024-CS-001",
    class: "Grade 12",
    section: "A",
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "emma.johnson@school.edu",
      address: "123 Student Lane, Education City"
    },
    attendance: 96,
    upcomingExam: "Physics Mid-term - March 25, 2025",
    feeDueDate: "March 30, 2025",
    qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMDAiLz4KICA8dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iOCI+UVI8L3RleHQ+Cjwvc3ZnPg=="
  };

  const attendanceData = {
    daily: [
      { date: "2025-01-20", status: "Present", subject: "Mathematics" },
      { date: "2025-01-20", status: "Present", subject: "Physics" },
      { date: "2025-01-20", status: "Present", subject: "Chemistry" },
      { date: "2025-01-19", status: "Present", subject: "English" },
      { date: "2025-01-19", status: "Absent", subject: "History" }
    ],
    monthly: {
      totalDays: 20,
      presentDays: 19,
      absentDays: 1,
      percentage: 95
    }
  };

  const academicReports = [
    { subject: "Mathematics", grade: "A+", percentage: 95, remarks: "Excellent performance in calculus" },
    { subject: "Physics", grade: "A", percentage: 88, remarks: "Strong understanding of concepts" },
    { subject: "Chemistry", grade: "A-", percentage: 85, remarks: "Good lab work, improve theory" },
    { subject: "English", grade: "B+", percentage: 82, remarks: "Creative writing skills developing well" },
    { subject: "Computer Science", grade: "A+", percentage: 97, remarks: "Outstanding programming skills" }
  ];

  const upcomingEvents = [
    { title: "Science Fair", date: "2025-02-15", type: "Competition", description: "Annual science project exhibition" },
    { title: "Sports Day", date: "2025-02-20", type: "Sports", description: "Inter-house athletics competition" },
    { title: "Cultural Festival", date: "2025-03-05", type: "Cultural", description: "Music, dance, and drama performances" },
    { title: "Parent-Teacher Meeting", date: "2025-03-10", type: "Academic", description: "Quarterly progress discussion" }
  ];

  const classSchedule = [
    { time: "8:00 AM - 9:00 AM", subject: "Mathematics", teacher: "Prof. Wilson", room: "Room 205" },
    { time: "9:00 AM - 10:00 AM", subject: "Physics", teacher: "Dr. Johnson", room: "Lab 3" },
    { time: "10:30 AM - 11:30 AM", subject: "Chemistry", teacher: "Prof. Davis", room: "Lab 1" },
    { time: "11:30 AM - 12:30 PM", subject: "English", teacher: "Ms. Brown", room: "Room 101" },
    { time: "1:30 PM - 2:30 PM", subject: "Computer Science", teacher: "Mr. Smith", room: "Computer Lab" },
    { time: "2:30 PM - 3:30 PM", subject: "History", teacher: "Mrs. Taylor", room: "Room 302" }
  ];

  const examSchedule = [
    { subject: "Mathematics", date: "2025-03-25", time: "9:00 AM - 12:00 PM", room: "Hall A", type: "Mid-term" },
    { subject: "Physics", date: "2025-03-27", time: "9:00 AM - 12:00 PM", room: "Hall B", type: "Mid-term" },
    { subject: "Chemistry", date: "2025-03-29", time: "9:00 AM - 12:00 PM", room: "Hall A", type: "Mid-term" },
    { subject: "English", date: "2025-04-01", time: "9:00 AM - 12:00 PM", room: "Hall C", type: "Mid-term" }
  ];

  const examResults = [
    { subject: "Mathematics", marks: "95/100", grade: "A+", rank: 2 },
    { subject: "Physics", marks: "88/100", grade: "A", rank: 5 },
    { subject: "Chemistry", marks: "85/100", grade: "A-", rank: 7 },
    { subject: "English", marks: "82/100", grade: "B+", rank: 12 }
  ];

  const previousPapers = [
    { subject: "Mathematics", year: "2024", term: "Final", type: "PDF", size: "2.5 MB" },
    { subject: "Physics", year: "2024", term: "Mid-term", type: "PDF", size: "1.8 MB" },
    { subject: "Chemistry", year: "2023", term: "Final", type: "PDF", size: "3.2 MB" },
    { subject: "English", year: "2024", term: "Final", type: "PDF", size: "1.5 MB" }
  ];

  useEffect(() => {
    // Simulate loading notifications
    setNotifications([
      { id: 1, title: "Assignment Due", message: "Mathematics homework due tomorrow", time: "2 hours ago", type: "warning" },
      { id: 2, title: "Exam Schedule", message: "Mid-term exam timetable updated", time: "1 day ago", type: "info" },
      { id: 3, title: "Fee Reminder", message: "Monthly fee due in 5 days", time: "2 days ago", type: "alert" },
      { id: 4, title: "Event Notification", message: "Science Fair registration open", time: "3 days ago", type: "success" }
    ]);
  }, []);

  const renderStudentCard = () => (
    <div className="student-card">
      <div className="student-card-header">
        <div className="student-avatar">
          <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Student" />
        </div>
        <div className="student-info">
          <h2>{studentData.name}</h2>
          <div className="student-details">
            <span><strong>Roll No:</strong> {studentData.rollNo}</span>
            <span><strong>Class:</strong> {studentData.class}</span>
            <span><strong>Section:</strong> {studentData.section}</span>
          </div>
        </div>
        <div className="qr-code-section">
          <div className="qr-code">
            <QrCode size={80} />
            <span>Student QR</span>
          </div>
        </div>
      </div>
      
      <div className="student-card-body">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="contact-details">
            <div className="contact-item">
              <Phone size={16} />
              <span>{studentData.contactInfo.phone}</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>{studentData.contactInfo.email}</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>{studentData.contactInfo.address}</span>
            </div>
          </div>
        </div>
        
        <div className="highlights">
          <div className="highlight-item attendance">
            <div className="highlight-icon">
              <UserCheck size={24} />
            </div>
            <div className="highlight-content">
              <span className="highlight-value">{studentData.attendance}%</span>
              <span className="highlight-label">Attendance</span>
            </div>
          </div>
          
          <div className="highlight-item exam">
            <div className="highlight-icon">
              <BookOpen size={24} />
            </div>
            <div className="highlight-content">
              <span className="highlight-value">Upcoming</span>
              <span className="highlight-label">{studentData.upcomingExam}</span>
            </div>
          </div>
          
          <div className="highlight-item fee">
            <div className="highlight-icon">
              <DollarSign size={24} />
            </div>
            <div className="highlight-content">
              <span className="highlight-value">Due Date</span>
              <span className="highlight-label">{studentData.feeDueDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboardButtons = () => (
    <div className="dashboard-buttons">
      <button className="dashboard-btn attendance-btn" onClick={() => setActiveTab('attendance')}>
        <UserCheck size={24} />
        <span>Attendance</span>
        <p>Daily & Monthly Reports</p>
      </button>
      
      <button className="dashboard-btn reports-btn" onClick={() => setActiveTab('reports')}>
        <BarChart3 size={24} />
        <span>Reports</span>
        <p>Academic Performance</p>
      </button>
      
      <button className="dashboard-btn events-btn" onClick={() => setActiveTab('events')}>
        <Calendar size={24} />
        <span>Events</span>
        <p>School Events & Competitions</p>
      </button>
      
      <button className="dashboard-btn schedule-btn" onClick={() => setActiveTab('schedule')}>
        <Clock size={24} />
        <span>Schedule</span>
        <p>Class Timetable</p>
      </button>
      
      <button className="dashboard-btn exams-btn" onClick={() => setActiveTab('exams')}>
        <Award size={24} />
        <span>Exams</span>
        <p>Timetable & Results</p>
      </button>
      
      <button className="dashboard-btn papers-btn" onClick={() => setActiveTab('papers')}>
        <FileText size={24} />
        <span>Previous Papers</span>
        <p>Past Exam Repository</p>
      </button>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-section">
      <h3>Recent Notifications</h3>
      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-item ${notification.type}`}>
            <div className="notification-icon">
              <Bell size={16} />
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIContent = () => (
    <div className="ai-content-section">
      <h3>AI Learning Assistant</h3>
      <div className="ai-content-grid">
        <div className="ai-card study-tip">
          <div className="ai-card-header">
            <Brain size={20} />
            <span>Study Tip</span>
          </div>
          <p>{aiContent.studyTip}</p>
        </div>
        
        <div className="ai-card motivation">
          <div className="ai-card-header">
            <Lightbulb size={20} />
            <span>Motivation</span>
          </div>
          <p>{aiContent.motivationalQuote}</p>
        </div>
        
        <div className="ai-card news">
          <div className="ai-card-header">
            <Newspaper size={20} />
            <span>Education News</span>
          </div>
          <p>{aiContent.educationalNews}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-section">
            <GraduationCap size={32} />
            <div className="logo-text">
              <h1>Koder Spark</h1>
              <p>Student Portal</p>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="search-container">
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        
        <div className="header-right">
          <button className="header-btn notification-btn">
            <Bell size={20} />
            <span className="notification-badge">{notifications.length}</span>
          </button>
          <button className="header-btn">
            <Settings size={20} />
          </button>
          <div className="user-profile">
            <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Profile" />
            <span>{studentData.name}</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'attendance', label: 'Attendance', icon: UserCheck },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'schedule', label: 'Schedule', icon: Clock },
          { id: 'exams', label: 'Exams', icon: Award },
          { id: 'papers', label: 'Previous Papers', icon: FileText }
        ].map(tab => (
          <button 
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={20} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            {renderStudentCard()}
            {renderDashboardButtons()}
            <div className="dashboard-extras">
              {renderNotifications()}
              {renderAIContent()}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="attendance-content">
            <div className="content-header">
              <h2>Attendance Records</h2>
              <p>Track your daily and monthly attendance</p>
            </div>
            
            <div className="attendance-summary">
              <div className="summary-card">
                <h3>Monthly Summary</h3>
                <div className="summary-stats">
                  <div className="stat">
                    <span className="stat-value">{attendanceData.monthly.totalDays}</span>
                    <span className="stat-label">Total Days</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{attendanceData.monthly.presentDays}</span>
                    <span className="stat-label">Present</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{attendanceData.monthly.absentDays}</span>
                    <span className="stat-label">Absent</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{attendanceData.monthly.percentage}%</span>
                    <span className="stat-label">Percentage</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="attendance-records">
              <h3>Daily Records</h3>
              <div className="records-table">
                {attendanceData.daily.map((record, index) => (
                  <div key={index} className="record-row">
                    <span className="record-date">{record.date}</span>
                    <span className="record-subject">{record.subject}</span>
                    <span className={`record-status ${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-content">
            <div className="content-header">
              <h2>Academic Reports</h2>
              <p>Your academic performance and teacher remarks</p>
            </div>
            
            <div className="reports-grid">
              {academicReports.map((report, index) => (
                <div key={index} className="report-card">
                  <div className="report-header">
                    <h3>{report.subject}</h3>
                    <span className={`grade ${report.grade.replace('+', 'plus').replace('-', 'minus')}`}>
                      {report.grade}
                    </span>
                  </div>
                  <div className="report-body">
                    <div className="percentage">
                      <span>{report.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${report.percentage}%`}}></div>
                    </div>
                    <p className="remarks">{report.remarks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-content">
            <div className="content-header">
              <h2>School Events</h2>
              <p>Upcoming events, competitions, and activities</p>
            </div>
            
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-card">
                  <div className="event-date">
                    <span className="month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="day">{new Date(event.date).getDate()}</span>
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <span className={`event-type ${event.type.toLowerCase()}`}>{event.type}</span>
                    <p>{event.description}</p>
                  </div>
                  <button className="event-action">
                    <Eye size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="schedule-content">
            <div className="content-header">
              <h2>Class Schedule</h2>
              <p>Your daily class timetable and upcoming activities</p>
            </div>
            
            <div className="schedule-table">
              {classSchedule.map((classItem, index) => (
                <div key={index} className="schedule-row">
                  <div className="schedule-time">
                    <Clock size={16} />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="schedule-subject">
                    <BookOpen size={16} />
                    <span>{classItem.subject}</span>
                  </div>
                  <div className="schedule-teacher">
                    <User size={16} />
                    <span>{classItem.teacher}</span>
                  </div>
                  <div className="schedule-room">
                    <MapPin size={16} />
                    <span>{classItem.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="exams-content">
            <div className="content-header">
              <h2>Examinations</h2>
              <p>Exam timetable and results</p>
            </div>
            
            <div className="exams-sections">
              <div className="exam-schedule-section">
                <h3>Upcoming Exams</h3>
                <div className="exam-schedule-list">
                  {examSchedule.map((exam, index) => (
                    <div key={index} className="exam-item">
                      <div className="exam-subject">{exam.subject}</div>
                      <div className="exam-details">
                        <span><Calendar size={14} /> {exam.date}</span>
                        <span><Clock size={14} /> {exam.time}</span>
                        <span><MapPin size={14} /> {exam.room}</span>
                        <span className="exam-type">{exam.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="exam-results-section">
                <h3>Recent Results</h3>
                <div className="results-list">
                  {examResults.map((result, index) => (
                    <div key={index} className="result-item">
                      <div className="result-subject">{result.subject}</div>
                      <div className="result-marks">{result.marks}</div>
                      <div className={`result-grade ${result.grade.replace('+', 'plus').replace('-', 'minus')}`}>
                        {result.grade}
                      </div>
                      <div className="result-rank">Rank: {result.rank}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'papers' && (
          <div className="papers-content">
            <div className="content-header">
              <h2>Previous Papers</h2>
              <p>Repository of past examination papers</p>
            </div>
            
            <div className="papers-grid">
              {previousPapers.map((paper, index) => (
                <div key={index} className="paper-card">
                  <div className="paper-icon">
                    <FileText size={32} />
                  </div>
                  <div className="paper-info">
                    <h3>{paper.subject}</h3>
                    <div className="paper-details">
                      <span>Year: {paper.year}</span>
                      <span>Term: {paper.term}</span>
                      <span>Size: {paper.size}</span>
                    </div>
                  </div>
                  <button className="paper-download">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;