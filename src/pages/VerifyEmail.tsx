
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Mail } from "lucide-react";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsSubmitting(true);
    try {
      await verifyEmail(otp);
      navigate("/login");
    } catch (error) {
      // Error handling is done in AuthContext
      console.error("Verification error:", error);
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
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            <Mail className="h-6 w-6 text-edu-primary" />
          </div>
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <CardDescription>
            Enter the OTP code sent to your email address
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                OTP Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                required
              />
              <p className="text-sm text-gray-500 text-center">
                The OTP code is valid for 10 minutes
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
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
