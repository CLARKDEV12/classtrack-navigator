
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && currentUser) {
      // For student routes, redirect admin to admin dashboard
      if (location.pathname === '/dashboard' && currentUser.role === 'admin') {
        navigate('/admin');
      }
    }
  }, [isLoading, isAuthenticated, currentUser, location.pathname, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
