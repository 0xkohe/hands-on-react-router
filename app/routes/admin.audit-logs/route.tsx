import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "監査ログ - CloudDriver 管理者" },
    { name: "description", content: "不正アクセス・操作の監視" },
  ];
}

export default function AdminAuditLogs() {
  const logs = [
    { id: 1, user: "山田太郎", action: "テナント作成", resource: "株式会社DEF", timestamp: "2025-02-28 14:30", ip: "192.168.1.1" },
    { id: 2, user: "管理者", action: "ユーザーロック", resource: "佐藤次郎", timestamp: "2025-02-28 13:15", ip: "192.168.1.100" },
    { id: 3, user: "鈴木花子", action: "テンプレート削除", resource: "RDS設定", timestamp: "2025-02-28 11:45", ip: "192.168.1.50" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">監査ログ</h1>
        <p className="mt-2 text-gray-600">プラットフォーム全体の操作ログ</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ユーザー</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">操作</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">対象リソース</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">タイムスタンプ</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IP アドレス</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.action}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.resource}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
