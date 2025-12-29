import type { Route } from "./+types/route";
import { Heart } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bookmarks - CloudDriver" },
    { name: "description", content: "Your saved projects" },
  ];
}

export default function UserBookmarks() {
  const bookmarks = [
    { id: 2, title: "EC2 Instance Management", difficulty: "beginner" },
    { id: 5, title: "Lambda Functions & API Gateway", difficulty: "intermediate" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
        <p className="mt-2 text-gray-600">Your saved projects for later</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 flex-1">{bookmark.title}</h3>
              <Heart width={20} height={20} className="text-red-500 fill-current flex-shrink-0" />
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">{bookmark.difficulty}</span>
          </div>
        ))}
      </div>

      {bookmarks.length === 0 && (
        <div className="text-center py-12">
          <Heart width={48} height={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No bookmarks yet. Start bookmarking projects!</p>
        </div>
      )}
    </div>
  );
}
