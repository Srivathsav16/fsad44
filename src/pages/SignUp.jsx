import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const [name, setName] = useState("");

  // After Google login
  const handleGoogleSuccess = (credentialResponse) => {
    if (!role) {
      alert("Please select a role first");
      return;
    }

    const user = jwtDecode(credentialResponse.credential);

    setGoogleUser(user);
    setName(user.name || "");
  };

  // Final registration
  const handleRegister = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: googleUser.email,
      role: role
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    if (role === "faculty") {
      navigate("/faculty-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>TealEdge Learning</h2>

        {!googleUser ? (
          <>
            <h3>Create Account</h3>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>

            <br /><br />

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Login Failed")}
            />
          </>
        ) : (
          <>
            <h3>Complete Registration</h3>

            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />

            <button
              className="btn"
              style={{ marginTop: "15px" }}
              onClick={handleRegister}
            >
              Finish Registration
            </button>
          </>
        )}

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;