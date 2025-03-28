
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { School, LogOut, User } from "lucide-react";

const AppHeader = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <School className="h-8 w-8 text-edu-primary mr-2" />
                <span className="text-xl font-bold text-edu-dark">ClassTrack</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700 hidden sm:block">
                  <span className="mr-1">Welcome,</span>
                  <span className="text-edu-primary">{currentUser.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login" className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
