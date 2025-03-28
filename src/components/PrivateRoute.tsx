
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // For student routes, redirect admin to admin dashboard
  if (location.pathname === '/dashboard' && currentUser?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
