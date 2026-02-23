import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

function FacultySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const courses =
    JSON.parse(localStorage.getItem("courses")) || [];

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("submissions")) || [];
    setSubmissions(stored);
  }, []);

  const handleGradeChange = (index, grade) => {
    const updated = [...submissions];
    updated[index].grade = grade;

    setSubmissions(updated);
    localStorage.setItem(
      "submissions",
      JSON.stringify(updated)
    );
  };

  const handleDelete = (index) => {
    const updated = submissions.filter(
      (_, i) => i !== index
    );

    setSubmissions(updated);
    localStorage.setItem(
      "submissions",
      JSON.stringify(updated)
    );
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Faculty - Student Submissions</h2>
        </div>

        {submissions.length === 0 && (
          <div className="card">
            <p>No submissions yet.</p>
          </div>
        )}

        {submissions.map((submission, index) => {
          const course = courses.find(
            (c) => c.id === submission.courseId
          );

          return (
            <div key={index} className="card">
              <p>
                <strong>Student:</strong>{" "}
                {submission.user}
              </p>

              <p>
                <strong>Course:</strong>{" "}
                {course?.title}
              </p>

              <p>
                <strong>File:</strong>{" "}
                {submission.fileName}
              </p>

              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(
                  submission.submittedAt
                ).toLocaleString()}
              </p>

              {/* Download file */}
              <a
                href={submission.fileData}
                download={submission.fileName}
                className="btn"
                style={{ marginRight: "10px" }}
              >
                Download File
              </a>

              {/* Grade Input */}
              <input
                type="number"
                placeholder="Enter Grade"
                value={submission.grade || ""}
                onChange={(e) =>
                  handleGradeChange(
                    index,
                    e.target.value
                  )
                }
                style={{
                  width: "120px",
                  marginLeft: "10px"
                }}
              />

              <button
                className="logout-btn"
                onClick={() =>
                  handleDelete(index)
                }
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FacultySubmissions;