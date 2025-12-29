import type { Route } from "./+types/route";
import { Save } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "プロフィール設定 - CloudDriver テナント" },
    { name: "description", content: "組織情報の管理" },
  ];
}

export default function TenantSettingsProfile() {
  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">プロフィール設定</h1>
        <p className="mt-2 text-gray-600">組織情報を管理</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">組織名</label>
          <input type="text" defaultValue="株式会社ABC" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">説明</label>
          <textarea defaultValue="AWSを学習する組織です" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            <Save width={18} height={18} /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}
