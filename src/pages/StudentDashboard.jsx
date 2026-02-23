import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const enrollments =
    JSON.parse(localStorage.getItem("enrollments")) || [];
  const submissions =
    JSON.parse(localStorage.getItem("submissions")) || [];

  // Get enrolled courses
  const myCourses = enrollments
    .filter((e) => e.user === user?.email)
    .map((e) => courses.find((c) => c.id === e.courseId))
    .filter(Boolean);

  // Calculate progress %
  const getProgress = (course) => {
    const totalTasks = course.tasks?.length || 0;

    const completedTasks = submissions.filter(
      (s) =>
        s.user === user?.email &&
        s.courseId === course.id
    ).length;

    if (totalTasks === 0) return 0;

    return Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Student Dashboard</h2>
          <p>
            Welcome, <strong>{user?.name}</strong>
          </p>
        </div>

        <h3>My Enrolled Courses</h3>

        {myCourses.length === 0 && (
          <div className="card">
            <p>You have not enrolled in any courses yet.</p>
          </div>
        )}

        <div className="course-grid">
          {myCourses.map((course) => {
            const progress = getProgress(course);
            const totalTasks = course.tasks?.length || 0;

            return (
              <div
                key={course.id}
                className="course-card"
                onClick={() =>
                  navigate(`/course/${course.id}`)
                }
                style={{ cursor: "pointer" }}
              >
                <h3>{course.title}</h3>
                <p>{course.description}</p>

                <p>
                  <strong>Total Tasks:</strong> {totalTasks}
                </p>

                <p>
                  <strong>Progress:</strong> {progress}%
                </p>

                {/* Progress Bar */}
                <div
                  style={{
                    background: "#eee",
                    borderRadius: "8px",
                    overflow: "hidden",
                    height: "10px",
                    marginTop: "8px"
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      background:
                        progress === 100
                          ? "#2ecc71"
                          : "#118ab2",
                      height: "100%",
                      transition: "0.4s"
                    }}
                  />
                </div>

                <button
                  className="btn"
                  style={{ marginTop: "12px" }}
                >
                  Open Course
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;