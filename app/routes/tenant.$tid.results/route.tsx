import type { Route } from "./+types/route";
import { Download } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "成績一覧 - CloudDriver テナント" },
    { name: "description", content: "組織全体の成績確認" },
  ];
}

export default function TenantResults() {
  const results = [
    { id: 1, user: "山田太郎", exam: "VPC構築基礎", score: 87, status: "合格", date: "2025-02-28" },
    { id: 2, user: "鈴木花子", exam: "EC2管理", score: 92, status: "合格", date: "2025-02-27" },
    { id: 3, user: "佐藤次郎", exam: "S3設定", score: 65, status: "不合格", date: "2025-02-26" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">成績一覧</h1>
          <p className="mt-2 text-gray-600">組織全体の成績を確認</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition">
          <Download width={20} height={20} /> CSV出力
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ユーザー</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">試験</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">スコア</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">実施日</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map(result => (
              <tr key={result.id} className="hover:bg-gray-50 transition cursor-pointer">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{result.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{result.exam}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{result.score}点</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    result.status === "合格" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {result.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
