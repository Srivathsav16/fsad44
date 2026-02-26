import Navbar from "../components/Navbar";

function Assignments() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const enrollments =
    JSON.parse(localStorage.getItem("enrollments")) || [];
  const submissions =
    JSON.parse(localStorage.getItem("submissions")) || [];

  const myCourses = enrollments
    .filter((e) => e.user === user.email)
    .map((e) => courses.find((c) => c.id === e.courseId))
    .filter(Boolean);

  const handleSubmit = (courseId, taskId) => {
    const today = new Date().toISOString().split("T")[0];

    submissions.push({
      user: user.email,
      courseId,
      taskId,
      submittedOn: today,
    });

    localStorage.setItem(
      "submissions",
      JSON.stringify(submissions)
    );

    alert("Assignment submitted!");
    window.location.reload();
  };

  const isSubmitted = (courseId, taskId) => {
    return submissions.some(
      (s) =>
        s.user === user.email &&
        s.courseId === courseId &&
        s.taskId === taskId
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>My Assignments</h2>

        {myCourses.map((course) => (
          <div key={course.id} className="card">
            <h3>{course.title}</h3>

            {course.tasks.length === 0 && <p>No tasks added.</p>}

            {course.tasks.map((task) => {
              const expired =
                new Date(task.deadline) < new Date();

              const submitted = isSubmitted(
                course.id,
                task.id
              );

              return (
                <div key={task.id}>
                  <p>
                    <strong>{task.title}</strong>
                  </p>
                  <p>
  Deadline: {new Date(task.deadline).toLocaleString()}
</p>

                  {submitted ? (
                    <button className="btn enrolled-btn" disabled>
                      Submitted
                    </button>
                  ) : expired ? (
                    <button className="logout-btn" disabled>
                      Deadline Passed
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() =>
                        handleSubmit(course.id, task.id)
                      }
                    >
                      Submit
                    </button>
                  )}

                  <hr />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Assignments;