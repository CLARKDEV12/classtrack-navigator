
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DoorClosed, Calendar } from "lucide-react";

const AdminDashboard = () => {
  // In a real app, these would come from API calls
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRooms: 0,
    totalSchedules: 0
  });

  // Mock data loading
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setStats({
        totalUsers: 42,
        totalRooms: 15,
        totalSchedules: 78
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to the ClassTrack admin panel</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <CardDescription>Registered users in the system</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                <DoorClosed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRooms}</div>
                <CardDescription>Available classrooms</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Total Schedules</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSchedules}</div>
                <CardDescription>Active room schedules</CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium">Room 101 scheduled</p>
                  <p className="text-sm text-muted-foreground">2 hours ago by Admin</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">Schedule updated for Room 203</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 4:30 PM by Admin</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
