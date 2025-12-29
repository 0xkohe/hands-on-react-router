import type { Route } from "./+types/route";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, AlertCircle, Download } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "成績詳細 - CloudDriver テナント" },
    { name: "description", content: "詳細な解答情報の確認" },
  ];
}

export default function TenantResultDetail() {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={() => navigate("/tenant")}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium"
      >
        <ArrowLeft width={20} height={20} /> 成績一覧に戻る
      </button>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">山田太郎 - VPC構築基礎</h1>
        <p className="mt-2 text-gray-600">2025年2月28日 実施</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg border border-green-200 p-6 text-center">
          <p className="text-sm text-green-900 mb-2">スコア</p>
          <p className="text-4xl font-bold text-green-600">87点</p>
          <p className="text-sm text-green-700 mt-2">合格</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">合格チェック数</p>
          <p className="text-3xl font-bold text-gray-900">13/15</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">所要時間</p>
          <p className="text-3xl font-bold text-gray-900">1h 23m</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">評価フィードバック</h2>
        <div className="space-y-3">
          <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="text-green-600 flex-shrink-0" width={20} height={20} />
            <div>
              <p className="font-medium text-green-900">VPC設定が正しく構成されています</p>
              <p className="text-sm text-green-700 mt-1">CIDR、サブネット、ルートテーブルが完璧です</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertCircle className="text-orange-600 flex-shrink-0" width={20} height={20} />
            <div>
              <p className="font-medium text-orange-900">セキュリティグループの設定に改善が必要</p>
              <p className="text-sm text-orange-700 mt-1">HTTPS ポートを許可してください</p>
            </div>
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition">
        <Download width={20} height={20} /> 詳細レポートを出力
      </button>
    </div>
  );
}
