import type { Route } from "./+types/route";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "メンテナンス設定 - CloudDriver 管理者" },
    { name: "description", content: "計画停止・告知の管理" },
  ];
}

export default function AdminMaintenance() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">メンテナンス設定</h1>
        <p className="mt-2 text-gray-600">計画停止・告知の管理</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-900">メンテナンスモードを有効にする</span>
          </label>
          <p className="text-xs text-gray-600 mt-2 ml-7">有効にするとユーザーにメンテナンス画面を表示します</p>
        </div>

        {maintenanceMode && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">開始日時</label>
              <input type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">終了日時</label>
              <input type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">告知メッセージ</label>
              <textarea 
                rows={4}
                placeholder="ユーザーに表示するメッセージを入力..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
