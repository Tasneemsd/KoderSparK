
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [reports, setReports] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [showPapers, setShowPapers] = useState(false);
  const [papers, setPapers] = useState([]);
  const [papersLoading, setPapersLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/students/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendance(res.data);
      } catch (err) {
        setAttendance([]);
      }
    };
    const fetchReports = async () => {
      try {
        const res = await api.get("/students/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
      } catch (err) {
        setReports([]);
      }
    };
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get("/announcements", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnnouncements(res.data);
      } catch (err) {
        setAnnouncements([]);
      }
    };
    fetchAttendance();
    fetchReports();
    fetchAnnouncements();
  }, [token]);

  const handleShowPapers = async () => {
    setShowPapers((prev) => !prev);
    if (!showPapers) {
      setPapersLoading(true);
      try {
        const res = await api.get("/previous-papers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPapers(res.data);
      } catch (err) {
        setPapers([]);
      }
      setPapersLoading(false);
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Student Dashboard</h2>

      <button
        className="bg-blue-700 text-white px-4 py-2 rounded mb-4"
        onClick={handleShowPapers}
      >
        {showPapers ? "Hide Previous Year Papers" : "Previous Year Papers"}
      </button>
      {showPapers && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Previous Year Papers</h3>
          {papersLoading ? (
            <p>Loading...</p>
          ) : papers.length === 0 ? (
            <p>No previous year papers available.</p>
          ) : (
            <ul>
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
        </div>
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

      <h3 className="text-lg font-semibold mb-2">Attendance</h3>
      <ul>
        {attendance.map((a) => (
          <li key={a._id}>
            {a.date} - {a.status}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">Marks / Reports</h3>
      {reports.length === 0 ? (
        <p>No marks available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 border">Subject</th>
                <th className="px-2 py-1 border">Marks</th>
                <th className="px-2 py-1 border">Max Marks</th>
                <th className="px-2 py-1 border">Grade</th>
                <th className="px-2 py-1 border">Exam Date</th>
                <th className="px-2 py-1 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td className="px-2 py-1 border">{r.subject}</td>
                  <td className="px-2 py-1 border">{r.marks}</td>
                  <td className="px-2 py-1 border">{r.maxMarks}</td>
                  <td className="px-2 py-1 border">{r.grade || '-'}</td>
                  <td className="px-2 py-1 border">{r.examDate ? new Date(r.examDate).toLocaleDateString() : '-'}</td>
                  <td className="px-2 py-1 border">{r.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
