import type { Route } from "./+types/route";
import { Plus, Edit, Trash2 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "部署・グループ管理 - CloudDriver テナント" },
    { name: "description", content: "組織の階層構造を管理" },
  ];
}

export default function TenantGroups() {
  const groups = [
    { id: 1, name: "営業部", parent: "本社", members: 12, manager: "田中課長" },
    { id: 2, name: "開発部", parent: "本社", members: 18, manager: "佐々木課長" },
    { id: 3, name: "企画部", parent: "本社", members: 8, manager: "水村課長" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">部署・グループ管理</h1>
          <p className="mt-2 text-gray-600">組織の階層構造を管理</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> 新規グループ作成
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{group.parent}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                  <Edit width={16} height={16} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                  <Trash2 width={16} height={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">メンバー数: <span className="font-semibold">{group.members}名</span></p>
              <p className="text-gray-600">責任者: <span className="font-semibold">{group.manager}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
