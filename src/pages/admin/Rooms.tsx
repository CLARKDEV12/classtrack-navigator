
import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DoorClosed, Plus, Pencil, Trash2 } from "lucide-react";

// Mock data for rooms
const initialRooms = [
  { id: '1', name: 'Room 101', building: 'Main Building', capacity: 30, features: 'Projector, Whiteboard' },
  { id: '2', name: 'Room 102', building: 'Main Building', capacity: 25, features: 'Whiteboard' },
  { id: '3', name: 'Lab 201', building: 'Science Building', capacity: 20, features: 'Computers, Projector' },
  { id: '4', name: 'Conference A', building: 'Admin Building', capacity: 15, features: 'Video Conferencing' },
];

const AdminRooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter rooms based on search query
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    room.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRoom = () => {
    // In a real app, this would open a modal form
    console.log("Add room functionality to be implemented");
  };

  const handleEditRoom = (id: string) => {
    // In a real app, this would open a modal with the room data
    console.log(`Edit room ${id}`);
  };

  const handleDeleteRoom = (id: string) => {
    // In a real app, this would show a confirmation dialog
    console.log(`Delete room ${id}`);
    // Mock deletion
    setRooms(rooms.filter(room => room.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Rooms</h1>
              <p className="text-gray-600 mt-1">Add, edit, or remove classrooms</p>
            </div>
            <Button onClick={handleAddRoom} className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Room
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <DoorClosed className="h-5 w-5" /> Classroom List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-2 px-4 text-left">Room Name</th>
                      <th className="py-2 px-4 text-left">Building</th>
                      <th className="py-2 px-4 text-left">Capacity</th>
                      <th className="py-2 px-4 text-left">Features</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map((room) => (
                      <tr key={room.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{room.name}</td>
                        <td className="py-3 px-4">{room.building}</td>
                        <td className="py-3 px-4">{room.capacity}</td>
                        <td className="py-3 px-4">{room.features}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditRoom(room.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteRoom(room.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredRooms.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                          No rooms found
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

export default AdminRooms;
