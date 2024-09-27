import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
    const { isInitialized, isAuthenticated } = useAuth();
    const location = useLocation();
  
  
    if (!isInitialized) {
      return <div>Loading...</div>;
    }
  
    if (!isAuthenticated) {

      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }
  
  

export default AuthRequire;