
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Mail, ArrowLeft, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, currentUser, isAuthenticated } = useAuth();

  // Redirect if already authenticated and verification was successful
  useEffect(() => {
    if (verificationSuccess && isAuthenticated && currentUser) {
      console.log("Verification successful, redirecting based on role:", currentUser.role);
      redirectBasedOnRole(currentUser.role);
    } else if (isAuthenticated && currentUser && !verificationSuccess) {
      // If already authenticated but not from this verification process
      console.log("User already authenticated, redirecting based on role:", currentUser.role);
      redirectBasedOnRole(currentUser.role);
    }
  }, [verificationSuccess, isAuthenticated, currentUser]);

  // Extract token from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token_hash') || params.get('token');
    
    if (urlToken) {
      console.log("Token found in URL:", urlToken);
      setToken(urlToken);
      handleVerification(urlToken);
    }
  }, [location]);

  const redirectBasedOnRole = (role: string | null) => {
    console.log("Redirecting after verification based on role:", role);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleVerification = async (verificationToken: string) => {
    if (!verificationToken) return;

    setIsSubmitting(true);
    try {
      await verifyEmail(verificationToken);
      setVerificationSuccess(true);
      toast({
        title: "Verification Successful", 
        description: "You'll be redirected to your dashboard."
      });
      
      // Redirection will happen in the useEffect
    } catch (error) {
      console.error("Verification error:", error);
      // Error is handled in the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleVerification(token);
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <School className="h-10 w-10 text-blue-600" />
            <CardTitle className="text-2xl font-bold text-gray-800">ClassTrack</CardTitle>
          </div>
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            {verificationSuccess ? (
              <Check className="h-6 w-6 text-green-600" />
            ) : (
              <Mail className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <CardTitle className="text-xl">
            {verificationSuccess ? "Email Verified" : "Verify Your Email"}
          </CardTitle>
          <CardDescription>
            {verificationSuccess 
              ? "Your email has been verified successfully!" 
              : "Enter the verification token from your email"}
          </CardDescription>
        </CardHeader>
        {!verificationSuccess && (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="token" className="text-sm font-medium">
                  Verification Token
                </label>
                <Input
                  id="token"
                  type="text"
                  placeholder="Enter verification token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="text-center"
                  disabled={isSubmitting}
                  required
                />
                <p className="text-sm text-gray-500 text-center">
                  Please check your email for the verification token and enter it above.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting || !token}
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </CardFooter>
          </form>
        )}
        {verificationSuccess && (
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-gray-700">
              You will be redirected to your dashboard automatically.
            </p>
            <Button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
              onClick={() => redirectBasedOnRole(currentUser?.role)}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default VerifyEmail;
