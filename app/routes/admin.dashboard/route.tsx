import type { Route } from "./+types/route";
import { BarChart3, Users, TrendingUp, AlertCircle } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ダッシュボード - CloudDriver 管理者" },
    { name: "description", content: "プラットフォーム全体のKPI監視" },
  ];
}

export default function AdminDashboard() {
  const stats = [
    { label: "登録テナント数", value: "42", change: "+3", icon: Users, color: "blue" },
    { label: "総ユーザー数", value: "1,248", change: "+127", icon: Users, color: "green" },
    { label: "今月の売上", value: "¥2.4M", change: "+18%", icon: TrendingUp, color: "purple" },
    { label: "完了試験数", value: "3,847", change: "+512", icon: BarChart3, color: "orange" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="mt-2 text-gray-600">プラットフォーム全体の状況を監視</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-50 border-blue-200",
            green: "bg-green-50 border-green-200",
            purple: "bg-purple-50 border-purple-200",
            orange: "bg-orange-50 border-orange-200",
          };
          const iconColors = {
            blue: "text-blue-500",
            green: "text-green-500",
            purple: "text-purple-500",
            orange: "text-orange-500",
          };
          return (
            <div key={idx} className={`${colorClasses[stat.color as keyof typeof colorClasses]} border rounded-lg p-6`}>
              <div className="flex justify-between items-start mb-3">
                <Icon className={`${iconColors[stat.color as keyof typeof iconColors]}`} width={24} height={24} />
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">月別登録数</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">グラフの読み込み中...</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">プランの内訳</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">スターター</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }} />
              </div>
              <span className="text-sm font-semibold text-gray-900">15社</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">プロ</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }} />
              </div>
              <span className="text-sm font-semibold text-gray-900">19社</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">エンタープライズ</span>
              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }} />
              </div>
              <span className="text-sm font-semibold text-gray-900">8社</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">システム状態</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-sm text-green-900">API サーバー</span>
            <span className="text-sm font-semibold text-green-600">稼働中</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-sm text-green-900">データベース</span>
            <span className="text-sm font-semibold text-green-600">稼働中</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <span className="text-sm text-yellow-900">キャッシュ</span>
            <span className="text-sm font-semibold text-yellow-600">ディスク使用率 78%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
