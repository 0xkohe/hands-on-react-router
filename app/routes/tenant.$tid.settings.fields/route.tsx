import type { Route } from "./+types/route";
import { Plus, Trash2 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "カスタムフィールド - CloudDriver テナント" },
    { name: "description", content: "ユーザー属性の追加" },
  ];
}

export default function TenantSettingsFields() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">カスタムフィールド</h1>
          <p className="mt-2 text-gray-600">独自の属性項目を追加</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> フィールド追加
        </button>
      </div>
      <div className="space-y-4">
        {["社員番号", "部門"].map((field, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-between items-center">
            <p className="font-medium text-gray-900">{field}</p>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
              <Trash2 width={18} height={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
