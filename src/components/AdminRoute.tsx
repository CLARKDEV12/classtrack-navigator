
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
