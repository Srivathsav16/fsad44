import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    try {
      const user = jwtDecode(credentialResponse.credential);

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || storedUser.email !== user.email) {
        alert("Account not found. Please Sign Up first.");
        return;
      }

      if (storedUser.role === "faculty") {
        navigate("/faculty-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>TealEdge Learning</h2>
        <h3>Sign In</h3>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Google Login Failed")}
        />

        <p style={{ marginTop: "20px" }}>
          New user? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;