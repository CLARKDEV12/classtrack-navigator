import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { Profile } from '@/types/supabase';

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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication and set up listener
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Fetch user profile after a slight delay to avoid Supabase auth deadlocks
            setTimeout(async () => {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();
              
              if (error) {
                console.error('Error fetching user profile:', error);
                return;
              }
              
              if (data) {
                const profile = data as Profile;
                setCurrentUser({
                  id: profile.id,
                  email: profile.email,
                  name: profile.name,
                  role: profile.role,
                  approved: profile.approved
                });
                console.log('User profile loaded:', profile);
              }
            }, 0);
          } catch (error) {
            console.error('Error in auth state change:', error);
          }
        } else {
          setCurrentUser(null);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        
        if (initialSession?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', initialSession.user.id)
            .single();
          
          if (error) {
            console.error('Error fetching user profile:', error);
            setCurrentUser(null);
          } else if (data) {
            const profile = data as Profile;
            setCurrentUser({
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role,
              approved: profile.approved
            });
            console.log('Initial user profile loaded:', profile);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // User profile will be set via the onAuthStateChange listener
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        }
      });

      if (error) throw error;
      
      toast({
        title: "Registration Successful",
        description: "Please check your email for verification.",
      });
      
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
      // Assuming the OTP is passed in the URL as a token
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: otp,
        type: 'email',
      });

      if (error) throw error;

      toast({
        title: "Email Verified",
        description: "Your account is pending admin approval.",
      });
      
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid or expired verification code",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setCurrentUser(null);
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
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
