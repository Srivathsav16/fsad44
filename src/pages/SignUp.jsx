import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const [name, setName] = useState("");

  const handleGoogleSuccess = (credentialResponse) => {
    if (!role) {
      alert("Please select a role first");
      return;
    }

    const user = jwtDecode(credentialResponse.credential);

    setGoogleUser(user);
    setName(user.name || "");
  };

  const handleRegister = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = existingUsers.find(
      (u) => u.email === googleUser.email
    );

    if (alreadyExists) {
      alert("Account already exists. Please Sign In.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: googleUser.email,
      role: role
    };

    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

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
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <h3 style={{ color: "var(--text-main)", marginBottom: "0.5rem" }}>Create Account</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>Select your role to get started</p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginBottom: "1rem" }}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google Login Failed")}
            />
          </div>
        ) : (
          <div style={{ textAlign: "left" }}>
            <h3 style={{ color: "var(--text-main)", marginBottom: "1.5rem", textAlign: "center" }}>Complete Registration</h3>

            <label style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: "4px" }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />

            <button
              className="btn"
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={handleRegister}
            >
              Finish Registration
            </button>
          </div>
        )}

        <p style={{ marginTop: "2.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Already have an account? <Link to="/" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;