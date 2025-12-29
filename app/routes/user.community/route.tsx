import type { Route } from "./+types/route";
import { MessageCircle, Heart, Share2 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Community - CloudDriver" },
    { name: "description", content: "Community forum and Q&A" },
  ];
}

export default function UserCommunity() {
  const threads = [
    { id: 1, author: "John Doe", title: "How to set up NAT Gateway properly?", replies: 5, likes: 12, time: "2 hours ago" },
    { id: 2, author: "Jane Smith", title: "Best practices for IAM roles", replies: 8, likes: 24, time: "1 day ago" },
    { id: 3, author: "Bob Wilson", title: "Lambda cold start optimization", replies: 3, likes: 7, time: "2 days ago" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <p className="mt-2 text-gray-600">Learn from others and share knowledge</p>
        </div>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          New Discussion
        </button>
      </div>

      <div className="space-y-4">
        {threads.map(thread => (
          <div key={thread.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{thread.title}</h3>
              <span className="text-xs text-gray-500">{thread.time}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">by {thread.author}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MessageCircle width={16} height={16} /> {thread.replies}
              </span>
              <span className="flex items-center gap-1">
                <Heart width={16} height={16} /> {thread.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
