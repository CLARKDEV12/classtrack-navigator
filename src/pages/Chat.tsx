
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppHeader from "@/components/AppHeader";
import AdminSidebar from "@/components/AdminSidebar";
import StudentSidebar from "@/components/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";

// Mock chat data
const initialMessages = [
  { id: "1", sender: "system", content: "Welcome to the support chat! How can we help you today?", timestamp: new Date(Date.now() - 3600000).toISOString() },
];

const Chat = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const isAdmin = currentUser?.role === "admin";

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: currentUser?.role || "user",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate response after a short delay
    if (currentUser?.role !== "admin") {
      setTimeout(() => {
        const adminReply = {
          id: (Date.now() + 1).toString(),
          sender: "admin",
          content: "Thank you for your message. An administrator will respond shortly.",
          timestamp: new Date().toISOString(),
        };
        setMessages(prevMessages => [...prevMessages, adminReply]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader />
      <div className="flex">
        {isAdmin ? <AdminSidebar /> : <StudentSidebar />}
        <main className="flex-1 p-6">
          <Card className="h-[calc(100vh-120px)] flex flex-col">
            <CardHeader className="px-6 pt-6 pb-4 border-b">
              <CardTitle className="flex items-center">
                {isAdmin ? "Support Chat" : "Chat with Admin"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === currentUser?.role ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === "system"
                        ? "bg-gray-100 text-gray-700"
                        : message.sender === currentUser?.role
                        ? "bg-edu-primary text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {message.sender !== currentUser?.role && message.sender !== "system" && (
                      <div className="flex items-center mb-1">
                        <User className="h-3 w-3 mr-1" />
                        <span className="text-xs font-medium capitalize">
                          {message.sender}
                        </span>
                      </div>
                    )}
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Chat;
