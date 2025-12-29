import type { Route } from "./+types/route";
import { Plus, Edit, Trash2 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "権限管理 - CloudDriver 管理者" },
    { name: "description", content: "プラットフォーム管理者の権限管理" },
  ];
}

export default function AdminRoles() {
  const roles = [
    { id: 1, name: "スーパー管理者", permissions: 15, users: 2 },
    { id: 2, name: "テナント管理者", permissions: 8, users: 5 },
    { id: 3, name: "サポート担当", permissions: 5, users: 3 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">権限管理</h1>
          <p className="mt-2 text-gray-600">プラットフォーム管理者の権限を設定</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> 新規ロール作成
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map(role => (
          <div key={role.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{role.name}</h3>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                  <Edit width={16} height={16} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                  <Trash2 width={16} height={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">権限数: {role.permissions}</p>
              <p className="text-sm text-gray-600">割り当てユーザー: {role.users}名</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
