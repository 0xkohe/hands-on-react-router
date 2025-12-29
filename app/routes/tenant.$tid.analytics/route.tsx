import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "学習進捗分析 - CloudDriver テナント" },
    { name: "description", content: "成長推移の可視化" },
  ];
}

export default function TenantAnalytics() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">学習進捗分析</h1>
        <p className="mt-2 text-gray-600">組織全体のスキル推移を可視化</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">スキルレーダー</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">グラフの読み込み中...</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">推奨学習項目</h2>
          <div className="space-y-3">
            {["IAM セキュリティ", "RDS 管理", "Lambda 関数"].map((item, idx) => (
              <div key={idx} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
