import Navbar from "../components/Navbar";

function FacultyDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const courses = JSON.parse(localStorage.getItem("courses")) || [];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card glass-card">
          <h2 className="text-gradient">Faculty Dashboard</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Welcome back, <strong style={{ color: "var(--text-main)" }}>{user?.name}</strong>. Manage your courses and track student progress.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "2.5rem 0 1rem 0" }}>
          <h3 style={{ fontSize: "1.5rem" }}>Your Created Courses</h3>
        </div>

        <div className="course-grid">
          {courses.length === 0 && (
            <div className="card" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "var(--text-muted)" }}>No courses created yet.</p>
            </div>
          )}

          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <h4 style={{ marginBottom: "0.5rem", color: "var(--text-main)" }}>{course.title}</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{course.description}</p>
              <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
                <button className="btn" style={{ flex: 1, fontSize: "0.85rem" }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FacultyDashboard;
