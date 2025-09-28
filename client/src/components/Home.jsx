import { React, useState } from "react";

import "./Home.css";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {

    navigate("/login");
  };
  const handleRegister = () => {

    navigate("/register");
  };
  const [activeIndex, setActiveIndex] = useState(null);


  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Why choose StudyHive Academy?",
      answer:
        "StudyHive Academy provides world-class education with modern labs, expert teachers, and a focus on overall student growth.",
    },
    {
      question: "What programs are offered?",
      answer:
        "We offer classes from Kindergarten to Grade 12, along with extracurricular activities like sports, arts, and coding clubs.",
    },
    {
      question: "How do parents stay updated?",
      answer:
        "Parents can track their child’s progress through our Parent Portal and regular meetings with teachers.",
    },
  ];

  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Study<span>Hive</span></div>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </div>

        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li className="active">Home</li>
          <li><a href="#about" className="active td ">About Us</a></li>
          <li><a href="#academics" className="active td">Academics</a></li>
          <li><a href="#admissions" className="active td">Admissions</a></li>
          <li><a href="#events" className="active td">Events</a></li>
          <li><a href="#contact" className="active td">Contact Us</a></li>
          <li>
            <button className="btn-login1" onClick={handleLogin}>Login</button>
          </li>
          <li>
            <button className="btn-login1" onClick={handleRegister}>Register</button>
          </li>
        </ul>
      </nav>


      {/* 🔹 Hero Section */}
      <section className="hero">
        <div className="overlay">
          <h1>Study<span>Hive</span>Academy</h1>
          <p>
            We provide always our best educational services for our all students
            and always try to achieve our students’ trust and satisfaction
          </p>
          <div className="hero-buttons">
            <button className="btn-orange">Our Service</button>
            <button className="btn-dark">Get a Quote</button>
          </div>
        </div>
      </section>

      {/* 🔹 About Section */}
      <section className="about" id="about">
        <div className="about-left">
          <img
            src="https://html.kodesolution.com/2017/learnpro-html/demo/images/about/1.jpg"
            alt="About StudyHive Academy"
          />
        </div>

        <div className="about-right">
          <h2>
            About <span>StudyHive Academy</span>
          </h2>
          <p>
            At <strong>StudyHive Academy</strong>, we believe education is more than academics.
            Our mission is to empower students with knowledge, creativity, and values that prepare them for life.
          </p>
          <p>
            With a team of highly qualified teachers, state-of-the-art infrastructure, and a focus on both
            academics and extracurricular activities, we ensure holistic growth for every student.
          </p>
          <button className="btn-orange">Learn More</button>
        </div>

        <div className="ad-banner">
          <h3>🎓 Admissions Open for 2026</h3>
          <p>
            <span>Offers</span> for early applicants!
          </p>
          <a href="#" className="btn-dark">Apply Now</a>
        </div>
      </section>

      {/* 🔹 Key Highlights Section */}
      <section className="highlights" id="admissions">
        <h2>Our <span>Key Highlights</span></h2>
        <div className="highlights-container">
          <div className="highlight-card">
            <h3>🎓 20+ Years</h3>
            <p>Excellence in education with a strong academic reputation.</p>
          </div>
          <div className="highlight-card">
            <h3>🌍 5000+ Alumni</h3>
            <p>A global network of successful graduates making an impact worldwide.</p>
          </div>
          <div className="highlight-card">
            <h3>🏆 Top Ranked</h3>
            <p>Recognized among leading institutions for innovation & learning.</p>
          </div>
          <div className="highlight-card">
            <h3>📚 Expert Faculty</h3>
            <p>Dedicated educators guiding students toward excellence and growth.</p>
          </div>
        </div>
      </section>



      {/* 🔹 Events + FAQ */}
      <section className="events" id="events">
        <div className="events-left">
          <h2>Upcoming <span>Events</span></h2>
          <div className="event-card">
            <span className="date">28 Feb</span>
            <div>
              <h4>Admission Fair Spring 2026</h4>
              <p>📍 25 Newyork City | 🕔 5.00pm - 7.30pm</p>
            </div>

          </div>

          <div className="event-card">
            <span className="date">28 Feb</span>
            <div>
              <h4>Learning Spoken English</h4>
              <p>📍 25 Newyork City | 🕔 5.00pm - 7.30pm</p>
            </div>
          </div>
          <div className="event-card">
            <span className="date">28 Feb</span>
            <div>
              <h4>Annual Day</h4>
              <p>📍 25 Newyork City | 🕔 5.00pm - 7.30pm</p>
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 FAQ Section */}
      <section className="faq-section">
        <div className="events-right">
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>
          <div className="faq">
            {faqs.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  {item.question}
                  <span className="faq-toggle">{activeIndex === index ? "−" : "+"}</span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 Teachers Section */}
      <section className="teachers-section">
        <div className="container">
          <h2 className="section-subtitle">
            Meet Our <span className="highlight">Qualified Teachers</span>
          </h2>
          <p className="section-desc">
            Our dedicated and highly experienced teachers nurture students to achieve academic excellence and personal growth.
          </p>
          <div className="teachers" >
            <div className="teacher-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWyjalyGA9iIh6kJBSA2AF66LXL_0N78ILQ&s" alt="teacher" />
              <h4>Priya</h4>
              <p>Mathematics Teacher</p>
            </div>
            <div className="teacher-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHMeXYE_oRrMvogK1YIK72sPPQZHISXxyFQ&s" alt="teacher" />
              <h4>Sravani</h4>
              <p>Hindi Teacher</p>
            </div>
            <div className="teacher-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe68-YUES8GJPe8nGMi_bCUxOB7cTuGnRmww&s" alt="teacher" />
              <h4>Raghav</h4>
              <p>Physics Teacher</p>
            </div>
            <div className="teacher-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTQixVEuAfqIWJGXREPu2PVzLSNpX-qG2a-w&s" alt="teacher" />
              <h4>Maheswari</h4>
              <p>Chemistry Teacher</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Gallery Section */}
      <section className="gallery" id="academics">
        <div className="container">
          <h2 className="section-subtitle">CAMPUS <span className="highlight">GALLERY</span></h2>
          <p className="section-desc">SEE OUR GALLERY PICTURES</p>
          <div className="gallery-tabs">
            <button className="active">All</button>
            <button>Photos</button>
            <button>Campus</button>
            <button>Students</button>
          </div>

          <div className="gallery-grid">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxARfkSbrHZW632FdLjIaGivrNnxc6WFp55Q&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvSOlHArUlA67ub5rCqej3djKY44lFc3_Fw&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXzg3xPR1mT9pKn2zy0iC_VVUqHRRufdWo0Q&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLSNfb5Ty7SNvhj5eN2pMme20Vlr8VmmKRiQ&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3bqHahe6rqrHmU6eDG7KcY2gjSMdK67y1g&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQy0bmuwT6YJe9FtGRI1sZ6fup2Y4RxzQ_yw&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRwjNM7Gq6JfAeGsb7d9NbxlQEGxllG8C38g&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyWoJulmfC2hBS_M_133BPuQVp0nVlIP35uw&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo_TzIxwB9txWN8_vUC1-FR402ZIdSNI7tig&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzoR2PkTg7JbhX8xtBE7SPz7rEm-D2x-K_DQ&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhCWUwmSIMOIJ_EnNGiaMP_7BqiZl4YLiDA&s" alt="gallery" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBEh8Y1RJjsmlMxVI-d3EMVNC6s0UMSGxKzQ&s" alt="gallery" />
          </div>
        </div>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="contact-container">
            <h2>Contact <span>Us</span></h2>
            <p className="contact-subtitle">
              Have questions? Get in touch with us today.
            </p>

            <div className="contact-grid">
              {/* Left: Info */}
              <div className="contact-info">
                <h3>Reach Us</h3>
                <p><strong>Address:</strong> 123 StudyHive School, City, Country</p>
                <p><strong>Email:</strong> info@studyhive.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
              </div>

              {/* Right: Form */}
              <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="btn-orange">Send Message</button>
              </form>
            </div>
          </div>
        </section>

      </section>
      {/* 🔹 Footer */}
      <footer className="footer" id="footer">
        <div className="footer-container">
          <h3 className="footer-logo">Study<span>Hive</span></h3>
          <p>© 2025 StudyHive Pvt. Ltd. | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

