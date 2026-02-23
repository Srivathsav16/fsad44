import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

function Admin() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  // Load courses once
  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  // Save courses to localStorage whenever updated
  const saveCourses = (updatedCourses) => {
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  // CREATE COURSE
  const handleCreateCourse = () => {
    if (!title || !desc) {
      alert("Fill all fields");
      return;
    }

    const newCourse = {
      id: Date.now(),
      title,
      description: desc,
      tasks: []   // IMPORTANT
    };

    const updatedCourses = [...courses, newCourse];
    saveCourses(updatedCourses);

    setTitle("");
    setDesc("");
    alert("Course created successfully!");
  };

  // ADD TASK
  const handleAddTask = () => {
    if (!selectedCourseId) {
      alert("Select a course");
      return;
    }

    if (!taskTitle || !deadline) {
      alert("Fill all task fields");
      return;
    }

    const updatedCourses = courses.map((course) => {
      if (course.id === Number(selectedCourseId)) {

        // Ensure tasks array exists
        const updatedTasks = course.tasks
          ? [...course.tasks]
          : [];

        updatedTasks.push({
          id: Date.now(),
          title: taskTitle,
          deadline: deadline
        });

        return {
          ...course,
          tasks: updatedTasks
        };
      }

      return course;
    });

    saveCourses(updatedCourses);

    setTaskTitle("");
    setDeadline("");

    alert("Task added successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="container">

        {/* CREATE COURSE */}
        <div className="card">
          <h2>Create Course</h2>

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Course Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button className="btn" onClick={handleCreateCourse}>
            Create Course
          </button>
        </div>

        {/* ADD TASK */}
        <div className="card">
          <h2>Add Task (Date + Time)</h2>

          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button className="btn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

      </div>
    </>
  );
}

export default Admin;