
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-edu-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <School className="h-6 w-6" />
          <span className="font-bold text-xl">ClassTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link 
                to={isAdmin ? "/admin" : "/dashboard"}
                className="text-white hover:text-gray-200"
              >
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </Link>
              
              {isAdmin ? (
                <>
                  <Link to="/admin/rooms" className="text-white hover:text-gray-200">
                    Rooms
                  </Link>
                  <Link to="/admin/schedules" className="text-white hover:text-gray-200">
                    Schedules
                  </Link>
                  <Link to="/admin/users" className="text-white hover:text-gray-200">
                    Users
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-white hover:text-gray-200">
                    Find Rooms
                  </Link>
                </>
              )}
              
              <Link to="/chat" className="text-white hover:text-gray-200">
                Chat
              </Link>
              
              <div className="ml-4 flex items-center gap-2">
                <span className="text-sm">{currentUser.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-edu-dark hover:border-transparent"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">
                Log in
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to={isAdmin ? "/admin" : "/dashboard"}
                className="text-white hover:text-gray-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </Link>
              
              {isAdmin ? (
                <>
                  <Link 
                    to="/admin/rooms" 
                    className="text-white hover:text-gray-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rooms
                  </Link>
                  <Link 
                    to="/admin/schedules" 
                    className="text-white hover:text-gray-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Schedules
                  </Link>
                  <Link 
                    to="/admin/users" 
                    className="text-white hover:text-gray-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Users
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-white hover:text-gray-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find Rooms
                  </Link>
                </>
              )}
              
              <Link 
                to="/chat" 
                className="text-white hover:text-gray-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Chat
              </Link>
              
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-edu-dark hover:border-transparent mt-2"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Log out ({currentUser.name})
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-white hover:text-gray-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link 
                to="/register" 
                className="text-white hover:text-gray-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
