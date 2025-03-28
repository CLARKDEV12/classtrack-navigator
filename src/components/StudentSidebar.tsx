
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Find Rooms", path: "/dashboard", icon: Search }, // Same path for now as we'll show this on dashboard
  { name: "Chat with Admin", path: "/chat", icon: MessageSquare },
];

const StudentSidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="bg-edu-primary text-white w-64 flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-edu-accent">
          <h2 className="text-xl font-bold">Student Panel</h2>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md transition duration-150 ease-in-out",
                location.pathname === item.path
                  ? "bg-white text-edu-primary"
                  : "text-white hover:bg-edu-accent hover:text-white"
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

export default StudentSidebar;
