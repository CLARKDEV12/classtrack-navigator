
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from '@/hooks/use-toast';

type UserRole = 'student' | 'admin' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  approved: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  verifyEmail: (otp: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('classroomTracker_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('classroomTracker_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock functions for authentication (to be replaced with Supabase)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - Replace with Supabase
      const mockUsers = [
        { id: '1', email: 'admin@example.com', role: 'admin', name: 'Admin User', approved: true },
        { id: '2', email: 'student@example.com', role: 'student', name: 'Student User', approved: true }
      ];
      
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') {
        setCurrentUser(user as User);
        localStorage.setItem('classroomTracker_user', JSON.stringify(user));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Mock registration - Replace with Supabase
      // In a real app, we would create the user in the database
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        approved: false
      };
      
      // Simulate email verification step
      toast({
        title: "Registration Successful",
        description: "An OTP has been sent to your email for verification.",
      });
      
      // Store pending registration in local storage for demo purposes
      localStorage.setItem('classroomTracker_pendingUser', JSON.stringify({ ...newUser, password }));
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (otp: string) => {
    setIsLoading(true);
    try {
      // Mock OTP verification - Replace with Supabase
      const pendingUserStr = localStorage.getItem('classroomTracker_pendingUser');
      
      if (!pendingUserStr) {
        throw new Error('No pending registration found');
      }
      
      const pendingUser = JSON.parse(pendingUserStr);
      
      // For demo purposes, any 6-digit OTP is valid
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        // In a real app, we would verify the OTP with the backend
        // and mark the user as verified
        
        toast({
          title: "Email Verified",
          description: "Your account is pending admin approval.",
        });
        
        // Clear the pending user from local storage
        localStorage.removeItem('classroomTracker_pendingUser');
      } else {
        throw new Error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('classroomTracker_user');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
