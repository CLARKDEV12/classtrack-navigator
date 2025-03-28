
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import StudentSidebar from "@/components/StudentSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, DoorClosed, Check, X, MessageSquare } from "lucide-react";

// Mock room data
const mockRooms = [
  { id: "1", name: "Room 101", capacity: 30, building: "Main Building", floor: 1, available: true },
  { id: "2", name: "Lab 201", capacity: 25, building: "Science Block", floor: 2, available: true },
  { id: "3", name: "Conference Room", capacity: 15, building: "Admin Block", floor: 1, available: false },
  { id: "4", name: "Auditorium", capacity: 100, building: "Main Building", floor: 0, available: true },
];

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState(mockRooms);

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader />
      <div className="flex">
        <StudentSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome, Student</h1>
            <p className="text-gray-600">Find available rooms and check schedules</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for rooms by name or building..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <Card key={room.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {room.name}
                    {room.available ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <Check className="mr-1 h-3 w-3" />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        <X className="mr-1 h-3 w-3" />
                        Booked
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {room.building}, Floor {room.floor}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <DoorClosed className="mr-1 h-4 w-4 text-gray-500" />
                      <span>Capacity: {room.capacity}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                      <span>Check schedule</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full" disabled={!room.available}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Need Help?
              </CardTitle>
              <CardDescription>
                Can't find what you're looking for? Chat with an administrator.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/chat">Start Chat</a>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
