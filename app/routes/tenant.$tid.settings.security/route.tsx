import type { Route } from "./+types/route";
import { Save } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "セキュリティ設定 - CloudDriver テナント" },
    { name: "description", content: "IP制限・パスワードポリシー" },
  ];
}

export default function TenantSettingsSecurity() {
  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">セキュリティ設定</h1>
        <p className="mt-2 text-gray-600">セキュリティポリシーを管理</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">許可IP</label>
          <textarea placeholder="192.168.1.0/24&#10;10.0.0.0/8" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">パスワード有効期限（日）</label>
          <input type="number" defaultValue="90" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
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
