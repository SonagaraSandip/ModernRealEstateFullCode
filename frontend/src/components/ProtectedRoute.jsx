import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || {});

  if (!token) return <Navigate to="/login" replace />; //redirect to login if no token found in localstorage/>;
  if (requireRole && user.role !== requireRole)
    return <Navigate to="/login" replace />; //redirect to login if user is not admin
  return children;
};

export default ProtectedRoute;
