
import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, Pencil, Trash2 } from "lucide-react";

// Mock data for schedules
const initialSchedules = [
  { id: '1', roomName: 'Room 101', subject: 'Mathematics', instructor: 'Dr. Smith', day: 'Monday', startTime: '09:00', endTime: '10:30' },
  { id: '2', roomName: 'Room 102', subject: 'Physics', instructor: 'Prof. Johnson', day: 'Tuesday', startTime: '11:00', endTime: '12:30' },
  { id: '3', roomName: 'Lab 201', subject: 'Computer Science', instructor: 'Ms. Davis', day: 'Wednesday', startTime: '14:00', endTime: '16:00' },
  { id: '4', roomName: 'Conference A', subject: 'Faculty Meeting', instructor: 'Dean Wilson', day: 'Friday', startTime: '15:00', endTime: '16:00' },
];

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter schedules based on search query
  const filteredSchedules = schedules.filter(schedule => 
    schedule.roomName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    schedule.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSchedule = () => {
    // In a real app, this would open a modal form
    console.log("Add schedule functionality to be implemented");
  };

  const handleEditSchedule = (id: string) => {
    // In a real app, this would open a modal with the schedule data
    console.log(`Edit schedule ${id}`);
  };

  const handleDeleteSchedule = (id: string) => {
    // In a real app, this would show a confirmation dialog
    console.log(`Delete schedule ${id}`);
    // Mock deletion
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Schedules</h1>
              <p className="text-gray-600 mt-1">Add, edit, or remove classroom schedules</p>
            </div>
            <Button onClick={handleAddSchedule} className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Schedule
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Schedule List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search schedules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-2 px-4 text-left">Room</th>
                      <th className="py-2 px-4 text-left">Subject</th>
                      <th className="py-2 px-4 text-left">Instructor</th>
                      <th className="py-2 px-4 text-left">Day</th>
                      <th className="py-2 px-4 text-left">Time</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedules.map((schedule) => (
                      <tr key={schedule.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{schedule.roomName}</td>
                        <td className="py-3 px-4">{schedule.subject}</td>
                        <td className="py-3 px-4">{schedule.instructor}</td>
                        <td className="py-3 px-4">{schedule.day}</td>
                        <td className="py-3 px-4">{schedule.startTime} - {schedule.endTime}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditSchedule(schedule.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteSchedule(schedule.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredSchedules.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-gray-500">
                          No schedules found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminSchedules;
