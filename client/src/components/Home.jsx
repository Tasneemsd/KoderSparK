import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const BASE_URL = "https://koderspark-backend-2.onrender.com/api/auth/me";

const Home = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/announcements`);
        setAnnouncements(res.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        // Fallback data for demo
        setAnnouncements([
          {
            _id: "1",
            title: "Spring Enrollment Now Open",
            description: "Join us for Spring 2025! Early bird discounts available until January 15th. Don't miss this opportunity to be part of our amazing community.",
            date: new Date().toISOString()
          },
          {
            _id: "2",
            title: "Science Fair Champions",
            description: "Our students won first place at the Regional Science Fair! Congratulations to all participants for their innovative projects.",
            date: new Date(Date.now() - 86400000).toISOString()
          },
          {
            _id: "3",
            title: "New Technology Center",
            description: "State-of-the-art computer lab with VR equipment now open. Students can explore cutting-edge technology and programming.",
            date: new Date(Date.now() - 172800000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogin = () => {
    try {
      navigate("/login");
    } catch (error) {
      console.log("Navigation not available - running in standalone mode");
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            Koder Spark
          </div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
            <li><a href="#academics" onClick={(e) => { e.preventDefault(); scrollToSection('academics'); }}>Academics</a></li>
            <li><a href="#admissions" onClick={(e) => { e.preventDefault(); scrollToSection('admissions'); }}>Admissions</a></li>
            <li><a href="#departments" onClick={(e) => { e.preventDefault(); scrollToSection('departments'); }}>Departments</a></li>
            <li><a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>Events</a></li>
            <li><a href="#news" onClick={(e) => { e.preventDefault(); scrollToSection('news'); }}>Announcements</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Us</a></li>
          </ul>
          <div className="auth-buttons">
            <button className="btn login-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-fade-in-up">Bright Future Starts Here</h1>
          <p className="animate-fade-in-up">
            For 25+ years, shaping confident, creative, and compassionate
            leaders. Join a community of achievers and dreamers.
          </p>
          <div className="cta-buttons animate-fade-in-up">
            <button 
              className="cta-button primary-btn"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
            <button 
              className="cta-button secondary-btn"
              onClick={() => scrollToSection('admissions')}
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="container">
          <h2>Why Families Choose Us</h2>
          <p>
            Bright Future Academy nurtures curiosity, resilience, and lifelong
            learning with tech-powered classrooms, passionate teachers, and
            holistic development.
          </p>
          <div className="stats">
            <div className="stat-box animate-float">
              <div className="stat-icon">👨‍🎓</div>
              <h3>500+</h3>
              <p>Happy Students</p>
            </div>
            <div className="stat-box animate-float">
              <div className="stat-icon">🎯</div>
              <h3>98%</h3>
              <p>College Ready</p>
            </div>
            <div className="stat-box animate-float">
              <div className="stat-icon">🏆</div>
              <h3>25+</h3>
              <p>Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="section departments" id="departments">
        <div className="container">
          <h2>Our Academic Departments</h2>
          <p>Excellence across all disciplines with specialized programs and expert faculty.</p>
          <div className="departments-grid">
            <div className="department-card">
              <div className="dept-icon">🔬</div>
              <h3>Science & Technology</h3>
              <p>Advanced laboratories, robotics, and STEM programs preparing students for the future.</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">📚</div>
              <h3>Languages & Literature</h3>
              <p>Comprehensive language programs fostering communication and critical thinking skills.</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">🎨</div>
              <h3>Arts & Creativity</h3>
              <p>Music, visual arts, drama, and digital media to nurture creative expression.</p>
            </div>
            <div className="department-card">
              <div className="dept-icon">⚽</div>
              <h3>Physical Education</h3>
              <p>Comprehensive sports programs promoting fitness, teamwork, and healthy competition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Academics */}
      <section className="section features" id="academics">
        <div className="container">
          <h2>Our Pillars of Excellence</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Tech-Powered Learning</h3>
              <p>Smart classrooms, VR labs, and digital tools for future-ready learning.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👩‍🏫</div>
              <h3>Dedicated Teachers</h3>
              <p>Passionate educators who mentor, inspire, and guide every child.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏃‍♂️</div>
              <h3>Sports & Activities</h3>
              <p>15+ sports teams and 20+ clubs for teamwork and passions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Modern Library</h3>
              <p>10,000+ books, digital resources, and collaborative learning spaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section events" id="events">
        <div className="container">
          <h2>Upcoming Events</h2>
          <p>Join us for exciting activities and important school events throughout the year.</p>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-date">
                <span className="month">JAN</span>
                <span className="day">15</span>
              </div>
              <div className="event-details">
                <h3>Open House</h3>
                <p>Tour our facilities and meet our amazing faculty. Perfect for prospective families!</p>
                <span className="event-time">10:00 AM - 2:00 PM</span>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="month">JAN</span>
                <span className="day">22</span>
              </div>
              <div className="event-details">
                <h3>Science Fair</h3>
                <p>Students showcase their innovative projects and compete for prizes.</p>
                <span className="event-time">9:00 AM - 4:00 PM</span>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="month">FEB</span>
                <span className="day">05</span>
              </div>
              <div className="event-details">
                <h3>Winter Concert</h3>
                <p>Our music students perform in this spectacular evening concert.</p>
                <span className="event-time">7:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="section news" id="news">
        <div className="container">
          <h2>News & Announcements</h2>
          <div className="news-grid">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading announcements...</p>
              </div>
            ) : announcements.length > 0 ? (
              announcements.map((item) => (
                <div key={item._id} className="news-card">
                  <div className="news-icon">📢</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="news-date">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-announcements">
                <p>No announcements available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials/Admissions */}
      <section className="testimonials" id="admissions">
        <div className="container">
          <h2>What Our Families Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p>"My daughter transformed into a confident leader. Teachers here truly care about each child's growth and development."</p>
              <div className="testimonial-author">
                <div className="author-avatar">👩</div>
                <div>
                  <strong>Sarah Johnson</strong>
                  <span>Parent, Grade 5</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p>"From hating science to winning competitions – this school changed my life and opened doors I never knew existed."</p>
              <div className="testimonial-author">
                <div className="author-avatar">👨</div>
                <div>
                  <strong>Alex Chen</strong>
                  <span>Student, Grade 8</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p>"Amazing programs and communication. Our son loves coming to school every day and can't wait to share what he learned."</p>
              <div className="testimonial-author">
                <div className="author-avatar">👫</div>
                <div>
                  <strong>Michael & Lisa Rodriguez</strong>
                  <span>Parents, Grade 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Your Child's Future Starts Here</h2>
          <p>
            Limited spots available for 2025 admissions. Join our community of
            learners and achievers today.
          </p>
          <button 
            className="cta-btn"
            onClick={() => scrollToSection('contact')}
          >
            Start Learning
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🎓 Koder Spark Pvt Ltd </h3>
              <p>Transforming lives since years.</p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">📧</a>
                <a href="#" className="social-link">📱</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>📍 123 Education Street, Learning City</p>
              <p>📞 (555) 123-SCHOOL</p>
              <p>✉️ hello@brightfuture.edu</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
                <li><a href="#academics" onClick={(e) => { e.preventDefault(); scrollToSection('academics'); }}>Academics</a></li>
                <li><a href="#admissions" onClick={(e) => { e.preventDefault(); scrollToSection('admissions'); }}>Admissions</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Koder Spark Pvt Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;