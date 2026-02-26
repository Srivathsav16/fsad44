import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // If no user (extra safety)
  if (!user) {
    return null;
  }

  // Dynamic dashboard link
  const dashboardLink =
    user.role === "faculty"
      ? "/faculty-dashboard"
      : "/student-dashboard";

  return (
    <nav className="navbar">
      {/* Logo */}
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(dashboardLink)}
      >
        TealEdge Learning
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to={dashboardLink}>Dashboard</Link>

        <Link to="/courses">Courses</Link>

        {/* Faculty Links */}
        {user.role === "faculty" && (
          <>
            <Link to="/admin">Faculty Panel</Link>
            <Link to="/faculty-submissions">
              Submissions
            </Link>
          </>
        )}

        {/* Student Links */}
        {user.role === "student" && (
          <Link to="/assignments">
            My Assignments
          </Link>
        )}

        <Link to="/profile">Profile</Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;