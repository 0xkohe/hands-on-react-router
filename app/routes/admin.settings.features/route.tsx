import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "機能フラグ - CloudDriver 管理者" },
    { name: "description", content: "β版機能の公開制御" },
  ];
}

export default function AdminFeatures() {
  const features = [
    { id: 1, name: "AI フィードバック", status: true, target: "全ユーザー" },
    { id: 2, name: "チーム協働モード", status: true, target: "特定テナント" },
    { id: 3, name: "Terraform統合", status: false, target: "未公開" },
  ];

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">機能フラグ管理</h1>
        <p className="mt-2 text-gray-600">β版機能の公開制御</p>
      </div>

      <div className="space-y-4">
        {features.map(feature => (
          <div key={feature.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{feature.name}</h3>
              <p className="text-sm text-gray-600">対象: {feature.target}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={feature.status}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
