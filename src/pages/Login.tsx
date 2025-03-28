
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser, isAuthenticated } = useAuth();

  // Redirect based on role if already authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      console.log("Login page: User authenticated with role", currentUser.role);
      redirectBasedOnRole(currentUser.role);
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Function to redirect based on user role
  const redirectBasedOnRole = (role: string | null) => {
    console.log("Redirecting based on role:", role);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'student') {
      navigate('/dashboard');
    } else {
      // Default route if role is not recognized
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      console.log("Login successful, waiting for auth state to update");
      // The useEffect hook will handle the redirect once the currentUser is set
    } catch (error) {
      // Error handling is done in AuthContext
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <School className="h-10 w-10 text-edu-primary" />
            <CardTitle className="text-2xl font-bold text-edu-dark">ClassTrack</CardTitle>
          </div>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-edu-primary hover:underline">
                Register here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
