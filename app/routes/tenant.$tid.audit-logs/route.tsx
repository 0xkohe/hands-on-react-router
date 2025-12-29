import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "監査ログ - CloudDriver テナント" },
    { name: "description", content: "組織内操作の追跡" },
  ];
}

export default function TenantAuditLogs() {
  const logs = [
    { user: "山田太郎", action: "メンバー追加", resource: "鈴木花子", timestamp: "2025-02-28 14:30" },
    { user: "テナント管理者", action: "試験割り当て", resource: "VPC構築基礎", timestamp: "2025-02-28 13:00" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">監査ログ</h1>
        <p className="mt-2 text-gray-600">組織内の操作ログを確認</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ユーザー</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">操作</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">対象</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">日時</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.action}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.resource}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
