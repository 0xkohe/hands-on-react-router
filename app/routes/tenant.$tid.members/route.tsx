import type { Route } from "./+types/route";
import { Plus, Search, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "メンバー管理 - CloudDriver テナント" },
    { name: "description", content: "従業員アカウントの管理" },
  ];
}

export default function TenantMembers() {
  const [searchQuery, setSearchQuery] = useState("");

  const members = [
    { id: 1, name: "山田太郎", email: "yamada@example.com", role: "管理者", status: "アクティブ", joinDate: "2025-01-15" },
    { id: 2, name: "鈴木花子", email: "suzuki@example.com", role: "メンバー", status: "アクティブ", joinDate: "2025-01-20" },
    { id: 3, name: "佐藤次郎", email: "sato@example.com", role: "メンバー", status: "招待待ち", joinDate: "2025-02-28" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">メンバー管理</h1>
          <p className="mt-2 text-gray-600">従業員アカウントの管理</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> メンバー招待
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" width={20} height={20} />
        <input 
          type="text"
          placeholder="メンバー名またはメールで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">名前</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">メール</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">役割</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">加入日</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    member.status === "アクティブ" ? "bg-green-100 text-green-700" :
                    member.status === "招待待ち" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.joinDate}</td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                    <Trash2 width={18} height={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
