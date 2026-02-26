import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === user.email
    );

    if (!existingUser) {
      alert("Account not found. Please Sign Up first.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(existingUser)
    );

    if (existingUser.role === "faculty") {
      navigate("/faculty-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>TealEdge Learning</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Sign in to access your courses</p>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>
        <p style={{ marginTop: "2rem", color: "var(--text-muted)" }}>
          New user? <Link to="/signup" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;