import type { Route } from "./+types/route";
import { Search, Heart, Clock, BarChart3 } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "試験カタログ - CloudDriver テナント" },
    { name: "description", content: "利用可能な試験の検索" },
  ];
}

export default function TenantExams() {
  const [searchQuery, setSearchQuery] = useState("");

  const exams = [
    { id: 1, title: "VPC構築基礎", category: "ネットワーク", difficulty: "初級", time: "1h", bookmarked: true },
    { id: 2, title: "EC2とオートスケーリング", category: "コンピュート", difficulty: "中級", time: "1.5h", bookmarked: false },
    { id: 3, title: "S3バケット設定", category: "ストレージ", difficulty: "初級", time: "1h", bookmarked: false },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">試験カタログ</h1>
        <p className="mt-2 text-gray-600">利用可能な試験から選択</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" width={20} height={20} />
        <input 
          type="text"
          placeholder="試験を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">{exam.title}</h3>
              <button className="text-gray-400 hover:text-red-500">
                <Heart width={20} height={20} fill={exam.bookmarked ? "currentColor" : "none"} />
              </button>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded inline-block mb-3">{exam.category}</span>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 width={16} height={16} />
                <span className="capitalize">{exam.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock width={16} height={16} />
                <span>{exam.time}</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">
              割り当て
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
