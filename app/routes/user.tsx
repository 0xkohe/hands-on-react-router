import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Home,
  BookOpen,
  History,
  BarChart3,
  Heart,
  Award,
  Bell,
  Users,
  FileText,
  Settings,
  HelpCircle,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { icon: Home, label: "Home", path: "/user/home" },
    { icon: BookOpen, label: "Projects", path: "/user/projects" },
    { icon: History, label: "History", path: "/user/history" },
    { icon: BarChart3, label: "Analytics", path: "/user/analytics" },
    { icon: Heart, label: "Bookmarks", path: "/user/bookmarks" },
    { icon: Award, label: "Certificates", path: "/user/certificates" },
    { icon: Bell, label: "Notifications", path: "/user/notifications" },
    { icon: Users, label: "Community", path: "/user/community" },
    { icon: FileText, label: "Resources", path: "/user/resources" },
  ];

  const settingsItems = [
    { icon: Settings, label: "Profile", path: "/user/settings/profile" },
    { icon: Settings, label: "Security", path: "/user/settings/security" },
    { icon: Settings, label: "Organizations", path: "/user/settings/tenants" },
    { icon: Bell, label: "Notifications", path: "/user/settings/notifications" },
    { icon: Settings, label: "Appearance", path: "/user/settings/appearance" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {isSidebarOpen && <h2 className="font-bold text-lg text-gray-900">CloudDriver</h2>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isSidebarOpen ? <X width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon width={20} height={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          <div className={`text-xs font-semibold text-gray-600 uppercase tracking-wide ${isSidebarOpen ? "px-4 mb-2" : "text-center"}`}>
            {isSidebarOpen && "Settings"}
          </div>
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon width={20} height={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          <button
            onClick={() => navigate("/user/help")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-gray-700 hover:bg-gray-100"
          >
            <HelpCircle width={20} height={20} />
            {isSidebarOpen && <span>Help</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-red-600 hover:bg-red-50">
            <LogOut width={20} height={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
