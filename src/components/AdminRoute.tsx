
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { currentUser, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Admin route check:", { isAuthenticated, role: currentUser?.role });
  }, [currentUser, isAuthenticated]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If logged in but not an admin, redirect to student dashboard
  if (currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
