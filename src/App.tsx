
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRooms from "./pages/admin/Rooms";
import AdminSchedules from "./pages/admin/Schedules";
import AdminUsers from "./pages/admin/Users";
import StudentDashboard from "./pages/student/Dashboard";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/rooms" element={<AdminRoute><AdminRooms /></AdminRoute>} />
            <Route path="/admin/schedules" element={<AdminRoute><AdminSchedules /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            
            {/* Student Routes */}
            <Route path="/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
            
            {/* Chat */}
            <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
