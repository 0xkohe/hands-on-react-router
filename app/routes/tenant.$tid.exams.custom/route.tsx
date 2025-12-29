import type { Route } from "./+types/route";
import { Save, X } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "独自試験作成 - CloudDriver テナント" },
    { name: "description", content: "自社特有のインフラ要件試験を作成" },
  ];
}

export default function TenantExamsCustom() {
  return (
    <div className="p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">独自試験作成</h1>
        <p className="mt-2 text-gray-600">自社のセキュリティポリシーに沿った試験を作成</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">試験タイトル</label>
          <input 
            type="text"
            placeholder="例: 社内セキュリティポリシー準拠インフラ構築"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">難易度</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>初級</option>
            <option>中級</option>
            <option>上級</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">要件定義</label>
          <textarea 
            rows={8}
            placeholder="この試験で満たすべき要件を記述..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="private" className="w-4 h-4 text-blue-600" />
          <label htmlFor="private" className="text-sm text-gray-900">この試験を非公開にする</label>
        </div>

        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            <Save width={18} height={18} /> 作成して保存
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition">
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
