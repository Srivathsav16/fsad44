import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // Role restriction
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;