import type { Route } from "./+types/route";
import { Calendar, BarChart3, Award } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Achievement History - CloudDriver" },
    { name: "description", content: "Your project history and achievements" },
  ];
}

export default function UserHistory() {
  const history = [
    { id: 1, title: "VPC Architecture Basics", date: "2025-12-28", score: 87, status: "passed" },
    { id: 2, title: "EC2 Instance Management", date: "2025-12-27", score: 92, status: "passed" },
    { id: 3, title: "S3 Configuration", date: "2025-12-25", score: 78, status: "passed" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Achievement History</h1>
        <p className="mt-2 text-gray-600">Review your past projects and scores</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Project</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Completed</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {history.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.score}%</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    <Award width={14} height={14} /> Passed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
