import type { Route } from "./+types/route";
import { Search, Lock, RotateCcw } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "全ユーザー検索 - CloudDriver 管理者" },
    { name: "description", content: "全ユーザーの横断検索" },
  ];
}

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    { id: 1, name: "山田太郎", email: "yamada@example.com", tenant: "株式会社ABC", lastLogin: "2025-02-28", status: "アクティブ" },
    { id: 2, name: "鈴木花子", email: "suzuki@example.com", tenant: "TechXYZ", lastLogin: "2025-02-27", status: "アクティブ" },
    { id: 3, name: "佐藤次郎", email: "sato@example.com", tenant: "デジタル革命", lastLogin: "2025-02-10", status: "非アクティブ" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">全ユーザー検索</h1>
        <p className="mt-2 text-gray-600">プラットフォーム全体のユーザーを横断検索</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" width={20} height={20} />
        <input 
          type="text"
          placeholder="ユーザー名、メール、テナント名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ユーザー名</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">メール</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">所属テナント</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">最終ログイン</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.tenant}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    user.status === "アクティブ" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-orange-600 hover:bg-orange-50 rounded transition" title="ロック">
                      <Lock width={18} height={18} />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition" title="パスワードリセット">
                      <RotateCcw width={18} height={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
