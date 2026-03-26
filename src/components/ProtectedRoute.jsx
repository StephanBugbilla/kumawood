import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If the user isn't logged in, send them back to the sign in page
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
