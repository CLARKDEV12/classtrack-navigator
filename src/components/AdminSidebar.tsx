
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  DoorClosed, 
  Calendar, 
  Users, 
  MessageSquare
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Rooms", path: "/admin/rooms", icon: DoorClosed },
  { name: "Schedules", path: "/admin/schedules", icon: Calendar },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Chat", path: "/chat", icon: MessageSquare },
];

const AdminSidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="bg-edu-dark text-white w-64 flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md transition duration-150 ease-in-out",
                location.pathname === item.path
                  ? "bg-edu-primary text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
