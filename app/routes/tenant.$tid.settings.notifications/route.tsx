import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "通知設定 - CloudDriver テナント" },
    { name: "description", content: "組織内通知の制御" },
  ];
}

export default function TenantSettingsNotifications() {
  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">通知設定</h1>
        <p className="mt-2 text-gray-600">組織全体の通知を制御</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        {["合格通知", "期限リマインド", "新機能告知"].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-900">{item}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
