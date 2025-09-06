
import { useState, useEffect } from "react";
import api from "../api/axios";




export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [attendance, setAttendance] = useState({}); // { studentId: 'present' | 'absent' }
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [paperForm, setPaperForm] = useState({ title: "", className: "", subject: "" });
  const [paperFile, setPaperFile] = useState(null);
  const [paperMessage, setPaperMessage] = useState("");
  const [papers, setPapers] = useState([]);
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teacherRes, announcementsRes, papersRes] = await Promise.all([
          api.get("/teachers/students", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/teachers/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/announcements", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/previous-papers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStudents(studentsRes.data);
        setTeacher(teacherRes.data);
        setAnnouncements(announcementsRes.data);
        setPapers(papersRes.data);
      } catch (err) {
        setMessage("Failed to fetch data");
      }
    };
    fetchData();
  }, [token]);

  const handlePaperInput = (e) => {
    setPaperForm({ ...paperForm, [e.target.name]: e.target.value });
  };
  const handlePaperFile = (e) => {
    setPaperFile(e.target.files[0]);
  };
  const handlePaperUpload = async (e) => {
    e.preventDefault();
    setPaperMessage("");
    const formData = new FormData();
    formData.append("title", paperForm.title);
    formData.append("className", paperForm.className);
    formData.append("subject", paperForm.subject);
    formData.append("file", paperFile);
    try {
      await api.post("/previous-papers", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPaperMessage("Paper uploaded successfully!");
      setShowPaperModal(false);
      setPaperForm({ title: "", className: "", subject: "" });
      setPaperFile(null);
      // Refresh papers
      const papersRes = await api.get("/previous-papers", { headers: { Authorization: `Bearer ${token}` } });
      setPapers(papersRes.data);
    } catch (err) {
      setPaperMessage(err.response?.data?.message || "Upload failed");
    }
  };


  const handleMark = async (e) => {
    e.preventDefault();
    try {
      const results = await Promise.all(
        students.map((student) =>
          api.post(
            "/attendance/mark",
            {
              studentId: student._id,
              date: today,
              status: attendance[student._id] || "absent"
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      setMessage("Attendance marked for all students.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  // --- MARKS ENTRY STATE ---
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState(today);
  const [maxMarks, setMaxMarks] = useState(100);
  const [subjects, setSubjects] = useState([""]);
  const [marks, setMarks] = useState({}); // { studentId: { subject: mark } }

  const handleMarksChange = (studentId, subject, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [subject]: value
      }
    }));
  };

  const handleAddSubject = () => setSubjects((prev) => [...prev, ""]);
  const handleSubjectChange = (idx, value) => setSubjects((prev) => prev.map((s, i) => i === idx ? value : s));
  const handleRemoveSubject = (idx) => setSubjects((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmitMarks = async (e) => {
    e.preventDefault();
    try {
      const reports = [];
      students.forEach((student) => {
        subjects.forEach((subject) => {
          if (subject && marks[student._id]?.[subject] !== undefined && marks[student._id][subject] !== "") {
            reports.push({
              studentId: student._id,
              subject,
              marks: Number(marks[student._id][subject])
            });
          }
        });
      });
      await api.post(
        "/teachers/bulk-reports",
        {
          examName,
          examDate,
          maxMarks,
          reports
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Marks uploaded successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error uploading marks");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teacher Dashboard</h2>

      <div className="flex gap-4 mb-4">
        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={() => setShowPaperModal(true)}>
          Upload Previous Year Paper
        </button>
      </div>
      {paperMessage && <div className="mb-2 text-green-700">{paperMessage}</div>}
      {showPaperModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPaperModal(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Upload Previous Year Paper</h3>
            <form onSubmit={handlePaperUpload}>
              <div className="mb-2">
                <label className="block mb-1">Title</label>
                <input name="title" value={paperForm.title} onChange={handlePaperInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Class Name</label>
                <input name="className" value={paperForm.className} onChange={handlePaperInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Subject</label>
                <input name="subject" value={paperForm.subject} onChange={handlePaperInput} className="w-full border px-2 py-1" required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">File</label>
                <input type="file" accept=".pdf,.jpeg,.jpg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.7z,.gif,.bmp,.svg,.webp,.mp4,.avi,.mkv,.mov,.csv" onChange={handlePaperFile} className="w-full border px-2 py-1" required />
              </div>
              <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded mt-2 w-full">Upload</button>
            </form>
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">Previous Year Papers</h3>
      {papers.length === 0 ? (
        <p>No previous year papers uploaded.</p>
      ) : (
        <ul className="mb-4">
          {papers.map((p) => (
            <li key={p._id} className="mb-2 p-2 border rounded bg-blue-50">
              <div className="font-semibold">{p.title}</div>
              <div>Class: {p.className} | Subject: {p.subject}</div>
              <a href={p.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Download/View</a>
              <div className="text-xs text-gray-500">{new Date(p.uploadDate).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-semibold mb-2">Announcements</h3>
      {announcements.length === 0 ? (
        <p>No announcements.</p>
      ) : (
        <ul className="mb-4">
          {announcements.map((a) => (
            <li key={a._id} className="mb-2 p-2 border rounded bg-yellow-50">
              <div className="font-semibold">{a.title}</div>
              <div>{a.message}</div>
              <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}

      {teacher && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Your Details</h3>
          <p><b>Name:</b> {teacher.name}</p>
          <p><b>Subjects:</b> {teacher.subjects.join(', ')}</p>
          <p><b>Classes Handled:</b> {teacher.classesHandled.join(', ')}</p>
          <div>
            <b>Upcoming Classes:</b>
            <ul className="list-disc ml-6">
              {teacher.upcomingClasses.map((cls, idx) => (
                <li key={idx}>{cls.day} - {cls.className} - {cls.subject} ({cls.startTime} - {cls.endTime})</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Attendance Section (existing) */}
      <h3 className="text-lg font-semibold mb-2">Students in Your Sections</h3>
      <form onSubmit={handleMark} className="flex flex-col gap-4">
        {students.length === 0 && <p>No students found.</p>}
        {students.map((student) => (
          <div key={student._id} className="flex flex-col md:flex-row gap-2 items-center border p-2 rounded">
            <span className="flex-1">{student.user?.name || student.name} ({student.className} {student.section})</span>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={attendance[student._id] === "present"}
                onChange={(e) =>
                  setAttendance((prev) => ({
                    ...prev,
                    [student._id]: e.target.checked ? "present" : "absent"
                  }))
                }
              />
              Present
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={attendance[student._id] === "absent"}
                onChange={(e) =>
                  setAttendance((prev) => ({
                    ...prev,
                    [student._id]: e.target.checked ? "absent" : "present"
                  }))
                }
              />
              Absent
            </label>
          </div>
        ))}
        <button className="bg-green-500 text-white p-2 self-end" type="submit">Mark Attendance</button>
        {message && <p className="mt-2">{message}</p>}
      </form>

      {/* Marks Upload Section */}
      <h3 className="text-lg font-semibold mt-8 mb-2">Upload Marks for Exam</h3>
      <form onSubmit={handleSubmitMarks} className="flex flex-col gap-4 border p-4 rounded bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Exam Name (e.g., Unit Test 1)"
            value={examName}
            onChange={e => setExamName(e.target.value)}
            className="border p-2 flex-1"
            required
          />
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            className="border p-2"
            required
          />
          <input
            type="number"
            placeholder="Max Marks"
            value={maxMarks}
            onChange={e => setMaxMarks(e.target.value)}
            className="border p-2 w-32"
            required
          />
        </div>
        <div>
          <b>Subjects:</b>
          {subjects.map((subject, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 ml-2">
              <input
                type="text"
                value={subject}
                onChange={e => handleSubjectChange(idx, e.target.value)}
                className="border p-1 w-28"
                required
              />
              <button type="button" onClick={() => handleRemoveSubject(idx)} className="text-red-500">&times;</button>
            </span>
          ))}
          <button type="button" onClick={handleAddSubject} className="ml-2 text-blue-500">+ Add Subject</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border mt-2">
            <thead>
              <tr>
                <th className="border p-2">Student</th>
                {subjects.map((subject, idx) => (
                  <th key={idx} className="border p-2">{subject}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="border p-2">{student.user?.name || student.name}</td>
                  {subjects.map((subject, idx) => (
                    <td key={idx} className="border p-2">
                      <input
                        type="number"
                        min="0"
                        max={maxMarks}
                        value={marks[student._id]?.[subject] || ""}
                        onChange={e => handleMarksChange(student._id, subject, e.target.value)}
                        className="border p-1 w-16"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="bg-blue-500 text-white p-2 self-end" type="submit">Submit Marks</button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}

