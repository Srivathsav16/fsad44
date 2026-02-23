import Navbar from "../components/Navbar";

function Courses() {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const user = JSON.parse(localStorage.getItem("user"));
  const enrollments =
    JSON.parse(localStorage.getItem("enrollments")) || [];

  const isEnrolled = (courseId) => {
    return enrollments.some(
      (e) => e.user === user.email && e.courseId === courseId
    );
  };

  const handleEnroll = (courseId) => {
    if (isEnrolled(courseId)) return;

    const updatedEnrollments = [
      ...enrollments,
      { user: user.email, courseId }
    ];

    localStorage.setItem(
      "enrollments",
      JSON.stringify(updatedEnrollments)
    );

    window.location.reload(); // refresh to update button
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Available Courses</h2>

        <div className="course-grid">
          {courses.length === 0 && <p>No courses available.</p>}

          {courses.map((course) => {
            const enrolled = isEnrolled(course.id);

            return (
              <div className="course-card" key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>

                {user?.role === "student" && (
                  <button
                    className={`btn ${enrolled ? "enrolled-btn" : ""}`}
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolled}
                  >
                    {enrolled ? "Enrolled" : "Enroll"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Courses;