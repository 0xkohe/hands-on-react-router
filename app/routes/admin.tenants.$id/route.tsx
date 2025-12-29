import type { Route } from "./+types/route";
import { useNavigate } from "react-router";
import { ArrowLeft, Edit, Pause, Download } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "テナント詳細 - CloudDriver 管理者" },
    { name: "description", content: "テナント詳細情報の確認・管理" },
  ];
}

export default function AdminTenantDetail() {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={() => navigate("/admin/tenants")}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium"
      >
        <ArrowLeft width={20} height={20} /> テナント一覧に戻る
      </button>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">株式会社ABC</h1>
        <p className="mt-2 text-gray-600">テナント詳細情報</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">企業名</p>
                <p className="text-base font-medium text-gray-900">株式会社ABC</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">プラン</p>
                <p className="text-base font-medium text-gray-900">プロ</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">ユーザー数</p>
                <p className="text-base font-medium text-gray-900">45名</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">加入日</p>
                <p className="text-base font-medium text-gray-900">2025年1月15日</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">契約履歴</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">2025年2月 - プロプランへアップグレード</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">2025年1月 - スターターで契約開始</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition">
            <Edit width={18} height={18} /> 編集
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-50 border border-yellow-200 text-yellow-600 rounded-lg font-medium hover:bg-yellow-100 transition">
            <Pause width={18} height={18} /> 一時停止
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
            <Download width={18} height={18} /> レポート出力
          </button>
        </div>
      </div>
    </div>
  );
}
