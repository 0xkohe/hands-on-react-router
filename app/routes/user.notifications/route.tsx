import type { Route } from "./+types/route";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notifications - CloudDriver" },
    { name: "description", content: "Your notifications and updates" },
  ];
}

export default function UserNotifications() {
  const notifications = [
    { id: 1, type: "success", title: "Project Completed", message: "Great job completing VPC Architecture!", time: "2 hours ago", read: false },
    { id: 2, type: "info", title: "New Project Available", message: "Check out the new Lambda Functions project", time: "1 day ago", read: false },
    { id: 3, type: "alert", title: "Deadline Approaching", message: "Complete EC2 Management by tomorrow", time: "2 days ago", read: true },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case "success": return <CheckCircle className="text-green-500" width={20} height={20} />;
      case "alert": return <AlertCircle className="text-orange-500" width={20} height={20} />;
      default: return <Info className="text-blue-500" width={20} height={20} />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">Stay updated on your learning journey</p>
        </div>
        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className={`rounded-lg border p-4 flex gap-4 ${notif.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
            {getIcon(notif.type)}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900">{notif.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
              <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
            </div>
            {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
