
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { currentUser, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("AdminRoute - Auth check:", { 
      isAuthenticated, 
      role: currentUser?.role,
      path: location.pathname
    });
  }, [currentUser, isAuthenticated, location]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!isAuthenticated || !currentUser) {
    console.log("AdminRoute - Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in but not an admin, redirect to student dashboard
  if (currentUser.role !== 'admin') {
    console.log("AdminRoute - Not admin, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
