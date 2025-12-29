import type { Route } from "./+types/route";
import { Users, TrendingUp, Award, BarChart3 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ダッシュボード - CloudDriver テナント" },
    { name: "description", content: "組織内の学習進捗・成績確認" },
  ];
}

export default function TenantDashboard() {
  const stats = [
    { label: "総メンバー数", value: "45名", change: "+5", icon: Users, color: "blue" },
    { label: "受験率", value: "87%", change: "+8%", icon: TrendingUp, color: "green" },
    { label: "合格者数", value: "28名", change: "+3", icon: Award, color: "purple" },
    { label: "平均スコア", value: "78点", change: "-2", icon: BarChart3, color: "orange" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="mt-2 text-gray-600">組織内の学習進捗を確認</p>
      </div>

      {/* Stats */}
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
              <Icon className={`${iconColors[stat.color as keyof typeof iconColors]} mb-2`} width={24} height={24} />
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">最近の受験</h2>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">ユーザー {i}</p>
                  <p className="text-xs text-gray-600">VPC構築基礎</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">85点</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">スキル別進捗</h2>
          <div className="space-y-3">
            {["ネットワーク", "コンピュート", "ストレージ"].map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{skill}</span>
                  <span className="text-sm text-gray-600">{75 + idx * 5}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${75 + idx * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
