
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If logged in but not an admin, redirect to student dashboard
  if (currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
