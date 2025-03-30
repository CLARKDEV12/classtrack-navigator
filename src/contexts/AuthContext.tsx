import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
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
  verifyEmail: (token: string) => Promise<void>;
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

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        
        if (currentSession?.user) {
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();
              
              if (error) {
                console.error('Error fetching user profile:', error);
                setCurrentUser(null);
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
              } else {
                console.log('No profile found for user:', currentSession.user.id);
                setCurrentUser(null);
              }
            } catch (error) {
              console.error('Error in auth state change:', error);
              setCurrentUser(null);
            }
          }, 0);
        } else {
          setCurrentUser(null);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        console.log("Checking for existing session");
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Initial session:", initialSession ? "exists" : "none");
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
          } else {
            console.log('No profile found for user:', initialSession.user.id);
            setCurrentUser(null);
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
      console.log("Registering with:", { email, name, role });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
          emailRedirectTo: undefined,
        }
      });

      if (error) throw error;

      console.log("Registration response:", data);
      
      toast({
        title: "Registration Successful",
        description: "Please check your email for the verification code. Enter the 6-digit code on the verification page.",
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
  
  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      console.log("Verifying email with token:", token);
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });

      if (error) throw error;

      console.log("Verification response:", data);

      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile after verification:', profileError);
        } else if (profileData) {
          setCurrentUser({
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
            role: profileData.role,
            approved: profileData.approved
          });
          console.log('Profile loaded after verification:', profileData);
        } else {
          console.log('No profile found after verification for user:', data.user.id);
        }
      }

      toast({
        title: "Email Verified",
        description: "Your account is now verified.",
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
