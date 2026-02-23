import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";

function CourseDetails() {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const submissions =
    JSON.parse(localStorage.getItem("submissions")) || [];

  const course = courses.find(
    (c) => c.id === Number(id)
  );

  const [selectedFile, setSelectedFile] = useState(null);

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="container">
          <h2>Course not found</h2>
        </div>
      </>
    );
  }

  // Check submission
  const getSubmission = (taskId) => {
    return submissions.find(
      (s) =>
        s.user === user.email &&
        s.courseId === course.id &&
        s.taskId === taskId
    );
  };

  // Countdown timer
  const getTimeRemaining = (deadline) => {
    const diff = new Date(deadline) - new Date();
    if (diff <= 0) return "Deadline Passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
      (diff / (1000 * 60)) % 60
    );

    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, PDF allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile({
        name: file.name,
        type: file.type,
        data: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  // Submit assignment
  const handleSubmit = (taskId) => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const task = course.tasks.find(
      (t) => t.id === taskId
    );

    if (new Date(task.deadline) < new Date()) {
      alert("Deadline passed!");
      return;
    }

    const newSubmission = {
      user: user.email,
      courseId: course.id,
      taskId,
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      fileData: selectedFile.data,
      submittedAt: new Date().toISOString(),
      grade: null
    };

    const updatedSubmissions = [
      ...submissions,
      newSubmission
    ];

    localStorage.setItem(
      "submissions",
      JSON.stringify(updatedSubmissions)
    );

    alert("Assignment submitted successfully!");
    window.location.reload();
  };

  // Delete submission
  const handleDelete = (taskId) => {
    const updatedSubmissions = submissions.filter(
      (s) =>
        !(
          s.user === user.email &&
          s.courseId === course.id &&
          s.taskId === taskId
        )
    );

    localStorage.setItem(
      "submissions",
      JSON.stringify(updatedSubmissions)
    );

    alert("Submission deleted!");
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="container">

        <div className="card">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>

        <h3>Assignments</h3>

        {course.tasks.length === 0 && (
          <p>No tasks available.</p>
        )}

        {course.tasks.map((task) => {
          const submission = getSubmission(task.id);
          const expired =
            new Date(task.deadline) < new Date();

          return (
            <div key={task.id} className="card">
              <h4>{task.title}</h4>

              <p>
                Deadline:{" "}
                {new Date(
                  task.deadline
                ).toLocaleString()}
              </p>

              <p style={{ color: "red" }}>
                {getTimeRemaining(task.deadline)}
              </p>

              {/* If Submitted */}
              {submission ? (
                <>
                  <p>
                    <strong>Submitted File:</strong>{" "}
                    {submission.fileName}
                  </p>

                  {submission.grade !== null && (
                    <p>
                      <strong>Grade:</strong>{" "}
                      {submission.grade}
                    </p>
                  )}

                  <button
                    className="logout-btn"
                    onClick={() =>
                      handleDelete(task.id)
                    }
                  >
                    Delete Submission
                  </button>
                </>
              ) : expired ? (
                <button
                  className="logout-btn"
                  disabled
                >
                  Deadline Passed
                </button>
              ) : (
                <>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />

                  {selectedFile && (
                    <p>
                      Selected:{" "}
                      {selectedFile.name}
                    </p>
                  )}

                  <button
                    className="btn"
                    onClick={() =>
                      handleSubmit(task.id)
                    }
                  >
                    Submit Assignment
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CourseDetails;