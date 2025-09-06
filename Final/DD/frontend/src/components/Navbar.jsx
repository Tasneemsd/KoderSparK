import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-200 flex gap-4">
      <Link to="/student">Student</Link>
      <Link to="/teacher">Teacher</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/">Logout</Link>
    </nav>
  );
}
