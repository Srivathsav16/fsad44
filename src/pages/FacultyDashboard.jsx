import Navbar from "../components/Navbar";

function FacultyDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const courses = JSON.parse(localStorage.getItem("courses")) || [];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Faculty Dashboard</h2>
          <p>Welcome, {user?.name}</p>
        </div>

        <h3>Your Created Courses</h3>
        <div className="course-grid">
          {courses.length === 0 && <p>No courses created yet.</p>}

          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <h4>{course.title}</h4>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FacultyDashboard;
