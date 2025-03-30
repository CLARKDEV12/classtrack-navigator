
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
      console.log("PrivateRoute - Current user role:", currentUser.role);
      console.log("PrivateRoute - Current path:", location.pathname);
      
      // For student routes, redirect admin to admin dashboard
      if (location.pathname === '/dashboard' && currentUser.role === 'admin') {
        console.log("PrivateRoute - Redirecting admin to admin dashboard");
        navigate('/admin');
      }
      
      // For regular routes that both roles can access
      // No additional redirects needed
    }
  }, [isLoading, isAuthenticated, currentUser, location.pathname, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("PrivateRoute - Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
