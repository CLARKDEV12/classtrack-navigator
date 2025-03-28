
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { School, UserCheck, Calendar, MessageSquare } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { currentUser } = useAuth();

  // Redirect to appropriate dashboard if logged in
  const dashboardLink = currentUser?.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-edu-light py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold text-edu-dark mb-4">
                  Classroom Tracking Made Simple
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Efficiently manage and find available classrooms at your school.
                  Perfect for students and administrators alike.
                </p>
                {currentUser ? (
                  <Button asChild size="lg" className="bg-edu-primary hover:bg-edu-dark">
                    <Link to={dashboardLink}>Go to Dashboard</Link>
                  </Button>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="bg-edu-primary hover:bg-edu-dark">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="aspect-video bg-edu-accent/10 rounded-md flex items-center justify-center">
                    <School className="h-24 w-24 text-edu-primary/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-edu-light p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-edu-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <p className="text-gray-600">
                  Admin approval system ensures only authorized users can access the platform.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-edu-light p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-edu-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Room Scheduling</h3>
                <p className="text-gray-600">
                  Easy-to-use interface for managing classroom availability and schedules.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-edu-light p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-edu-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
                <p className="text-gray-600">
                  Chat with administrators to inquire about room availability and scheduling.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-edu-dark text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <School className="h-6 w-6 mr-2" />
              <span className="font-semibold">ClassTrack</span>
            </div>
            <p className="text-sm mt-2 md:mt-0">
              &copy; {new Date().getFullYear()} ClassTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
