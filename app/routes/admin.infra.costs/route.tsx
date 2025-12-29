import type { Route } from "./+types/route";
import { AlertTriangle } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "インフラコスト監視 - CloudDriver 管理者" },
    { name: "description", content: "擬似環境の実行コスト監視" },
  ];
}

export default function AdminInfraCosts() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">インフラコスト監視</h1>
        <p className="mt-2 text-gray-600">AWS API消費量とリソース稼働の監視</p>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">今月の予想コスト</p>
          <p className="text-3xl font-bold text-gray-900">¥18,500</p>
          <p className="text-xs text-green-600 mt-2">先月比 -5%</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">実行中のインスタンス</p>
          <p className="text-3xl font-bold text-gray-900">247</p>
          <p className="text-xs text-gray-600 mt-2">アクティブ: 156</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">ストレージ使用量</p>
          <p className="text-3xl font-bold text-gray-900">2.4TB</p>
          <p className="text-xs text-gray-600 mt-2">前月比 +12%</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">アラート設定</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" width={20} height={20} />
            <div className="flex-1">
              <p className="font-medium text-red-900">月額コスト超過の危険</p>
              <p className="text-sm text-red-700 mt-1">現在のペースでは予算上限(¥20,000)を超える見込み</p>
            </div>
            <button className="px-3 py-1 text-sm font-medium text-red-600 border border-red-300 rounded hover:bg-red-50">
              調査
            </button>
          </div>
        </div>
      </div>

      {/* Cost by Tenant */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">テナント別コスト</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">株式会社ABC</span>
            <span className="font-semibold text-gray-900">¥5,200</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">TechXYZ</span>
            <span className="font-semibold text-gray-900">¥8,400</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">その他</span>
            <span className="font-semibold text-gray-900">¥4,900</span>
          </div>
        </div>
      </div>
    </div>
  );
}
