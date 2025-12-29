import type { Route } from "./+types/route";
import { MessageSquare, Clock } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "サポート管理 - CloudDriver 管理者" },
    { name: "description", content: "ユーザーサポートチケット管理" },
  ];
}

export default function AdminSupport() {
  const tickets = [
    { id: 1, subject: "ログイン時のエラー", user: "山田太郎", priority: "高", status: "開封中", createdAt: "2025-02-28" },
    { id: 2, subject: "試験結果が表示されない", user: "鈴木花子", priority: "中", status: "未対応", createdAt: "2025-02-27" },
    { id: 3, subject: "UI の改善提案", user: "佐藤次郎", priority: "低", status: "完了", createdAt: "2025-02-25" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">サポートチケット管理</h1>
        <p className="mt-2 text-gray-600">ユーザーからの問い合わせに対応</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">未対応</p>
          <p className="text-3xl font-bold text-red-600">5</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">対応中</p>
          <p className="text-3xl font-bold text-yellow-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">完了</p>
          <p className="text-3xl font-bold text-green-600">42</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">平均対応時間</p>
          <p className="text-3xl font-bold text-blue-600">3h</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">件名</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ユーザー</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">優先度</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">作成日</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition cursor-pointer">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.user}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    ticket.priority === "高" ? "bg-red-100 text-red-700" :
                    ticket.priority === "中" ? "bg-yellow-100 text-yellow-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    ticket.status === "完了" ? "bg-green-100 text-green-700" :
                    ticket.status === "開封中" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
