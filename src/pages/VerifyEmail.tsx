
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail } = useAuth();

  // Extract token from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token_hash');
    
    if (urlToken) {
      setToken(urlToken);
      handleVerification(urlToken);
    }
  }, [location]);

  const handleVerification = async (verificationToken: string) => {
    if (!verificationToken) return;

    setIsSubmitting(true);
    try {
      await verifyEmail(verificationToken);
      navigate("/login");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <School className="h-10 w-10 text-edu-primary" />
            <CardTitle className="text-2xl font-bold text-edu-dark">ClassTrack</CardTitle>
          </div>
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            <Mail className="h-6 w-6 text-edu-primary" />
          </div>
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription>
            {token ? "Verifying your email address..." : "Enter the verification token from your email"}
          </CardDescription>
        </CardHeader>
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
                Check your email for the verification link or enter the token manually.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !token}
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default VerifyEmail;
