import type { Route } from "./+types/route";
import { Plus, Copy, Trash2 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "APIキー管理 - CloudDriver テナント" },
    { name: "description", content: "外部連携用トークン発行" },
  ];
}

export default function TenantSettingsApi() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">APIキー管理</h1>
          <p className="mt-2 text-gray-600">外部連携用キーを管理</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> 新規キー生成
        </button>
      </div>
      <div className="space-y-4">
        {[1, 2].map(idx => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">API キー {idx}</p>
                <p className="text-xs text-gray-600 mt-1 font-mono">sk_test_abcd1234efgh5678...</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition">
                  <Copy width={18} height={18} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                  <Trash2 width={18} height={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
