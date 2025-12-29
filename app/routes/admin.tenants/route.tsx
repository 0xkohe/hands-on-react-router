import type { Route } from "./+types/route";
import { Plus, Search, MoreVertical } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "テナント管理 - CloudDriver 管理者" },
    { name: "description", content: "契約企業の一覧管理" },
  ];
}

export default function AdminTenants() {
  const [searchQuery, setSearchQuery] = useState("");

  const tenants = [
    { id: 1, name: "株式会社ABC", plan: "プロ", users: 45, status: "アクティブ", joinDate: "2025-01-15" },
    { id: 2, name: "TechXYZ", plan: "エンタープライズ", users: 120, status: "アクティブ", joinDate: "2024-12-01" },
    { id: 3, name: "デジタル革命", plan: "スターター", users: 8, status: "一時停止", joinDate: "2025-02-10" },
    { id: 4, name: "Innovation Inc", plan: "プロ", users: 67, status: "アクティブ", joinDate: "2025-01-20" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">テナント管理</h1>
          <p className="mt-2 text-gray-600">契約企業アカウントの管理</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> 新規テナント作成
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" width={20} height={20} />
        <input 
          type="text"
          placeholder="テナント名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">テナント名</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">プラン</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ユーザー数</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">状態</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">加入日</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tenants.map(tenant => (
              <tr key={tenant.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{tenant.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{tenant.plan}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{tenant.users}名</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    tenant.status === "アクティブ" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {tenant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{tenant.joinDate}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600 transition">
                    <MoreVertical width={20} height={20} />
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
