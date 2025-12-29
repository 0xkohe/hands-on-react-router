import type { Route } from "./+types/route";
import { LinkIcon, Check, X } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "API連携設定 - CloudDriver 管理者" },
    { name: "description", content: "外部サービスとの接続管理" },
  ];
}

export default function AdminIntegrations() {
  const integrations = [
    { id: 1, name: "Stripe", status: "接続済み", icon: "💳" },
    { id: 2, name: "SendGrid", status: "接続済み", icon: "📧" },
    { id: 3, name: "Slack", status: "未設定", icon: "💬" },
    { id: 4, name: "Google Analytics", status: "接続済み", icon: "📊" },
  ];

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">API連携設定</h1>
        <p className="mt-2 text-gray-600">外部サービスとの接続を管理</p>
      </div>

      <div className="space-y-4">
        {integrations.map(integration => (
          <div key={integration.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{integration.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    {integration.status === "接続済み" ? (
                      <>
                        <Check width={16} height={16} className="text-green-600" /> 接続済み
                      </>
                    ) : (
                      <>
                        <X width={16} height={16} className="text-gray-400" /> 未設定
                      </>
                    )}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
                {integration.status === "接続済み" ? "設定変更" : "設定"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
