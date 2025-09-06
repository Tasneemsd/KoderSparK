
import { useEffect, useState } from "react";
import api from "../api/axios";


export default function AdminDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    // Student fields
    rollNumber: "",
    className: "",
    section: "",
    // Teacher fields
    subjects: "",
    classesHandled: "",
  });
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    message: "",
    audience: "all",
  });
  const [message, setMessage] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/attendance/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(res.data);
    };
    fetchData();
  }, [token]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    let payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      contactNumber: form.contactNumber,
      role,
    };
    if (role === "student") {
      payload = {
        ...payload,
        rollNumber: form.rollNumber,
        className: form.className,
        section: form.section,
      };
    } else if (role === "teacher") {
      payload = {
        ...payload,
        subjects: form.subjects.split(",").map((s) => s.trim()),
        classesHandled: form.classesHandled
          .split(";")
          .map((c) => {
            const [className, section] = c.split(",");
            return { className: className?.trim() || "", section: section?.trim() || "" };
          }),
      };
    }
    try {
      await api.post("/auth/register", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("User registered successfully!");
      setShowModal(false);
      setForm({
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        rollNumber: "",
        className: "",
        section: "",
        subjects: "",
        classesHandled: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  const handleAnnouncementInput = (e) => {
    setAnnouncementForm({ ...announcementForm, [e.target.name]: e.target.value });
  };

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    setAnnouncementMessage("");
    try {
      await api.post("/announcements", announcementForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncementMessage("Announcement posted successfully!");
      setShowAnnouncementModal(false);
      setAnnouncementForm({ title: "", message: "", audience: "all" });
    } catch (err) {
      setAnnouncementMessage(err.response?.data?.message || "Announcement failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Admin Dashboard</h2>
      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Register a User
        </button>
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAnnouncementModal(true)}
        >
          Make Announcement
        </button>
      </div>
      {message && <div className="mb-2 text-green-700">{message}</div>}
      {announcementMessage && <div className="mb-2 text-green-700">{announcementMessage}</div>}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowAnnouncementModal(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Make Announcement</h3>
            <form onSubmit={handleAnnouncement}>
              <div className="mb-2">
                <label className="block mb-1">Title</label>
                <input name="title" value={announcementForm.title} onChange={handleAnnouncementInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Message</label>
                <textarea name="message" value={announcementForm.message} onChange={handleAnnouncementInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Audience</label>
                <select name="audience" value={announcementForm.audience} onChange={handleAnnouncementInput} className="w-full border px-2 py-1">
                  <option value="all">All</option>
                  <option value="students">Students</option>
                  <option value="teachers">Teachers</option>
                </select>
              </div>
              <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded mt-2 w-full">Announce</button>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Register a {role.charAt(0).toUpperCase() + role.slice(1)}</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-2">
                <label className="block mb-1">Role</label>
                <select name="role" value={role} onChange={e => setRole(e.target.value)} className="w-full border px-2 py-1">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Contact Number</label>
                <input name="contactNumber" value={form.contactNumber} onChange={handleInput} className="w-full border px-2 py-1" />
              </div>
              {role === "student" && (
                <>
                  <div className="mb-2">
                    <label className="block mb-1">Roll Number</label>
                    <input name="rollNumber" value={form.rollNumber} onChange={handleInput} className="w-full border px-2 py-1" required />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Class Name</label>
                    <input name="className" value={form.className} onChange={handleInput} className="w-full border px-2 py-1" required />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Section</label>
                    <select name="section" value={form.section} onChange={handleInput} className="w-full border px-2 py-1" required>
                      <option value="">Select Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                </>
              )}
              {role === "teacher" && (
                <>
                  <div className="mb-2">
                    <label className="block mb-1">Subjects (comma separated)</label>
                    <input name="subjects" value={form.subjects} onChange={handleInput} className="w-full border px-2 py-1" required />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Classes Handled (format: ClassName,Section;ClassName,Section)</label>
                    <input name="classesHandled" value={form.classesHandled} onChange={handleInput} className="w-full border px-2 py-1" required />
                  </div>
                </>
              )}
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-full">Register</button>
            </form>
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">All Attendance Records</h3>
      <ul>
        {attendance.map((a) => (
          <li key={a._id}>
            {a.student?.name} ({a.student?.rollNo}) - {a.date} - {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
