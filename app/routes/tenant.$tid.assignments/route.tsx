import type { Route } from "./+types/route";
import { Plus, Calendar, Users } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "試験割り当て - CloudDriver テナント" },
    { name: "description", content: "指定プロジェクトの受講指示" },
  ];
}

export default function TenantAssignments() {
  const assignments = [
    { id: 1, title: "VPC構築基礎", target: "全メンバー", deadline: "2025-03-15", passRate: "75%", status: "進行中" },
    { id: 2, title: "EC2基礎", target: "開発部", deadline: "2025-03-20", passRate: "68%", status: "進行中" },
    { id: 3, title: "S3設定", target: "営業部", deadline: "2025-02-28", passRate: "100%", status: "完了" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">試験割り当て</h1>
          <p className="mt-2 text-gray-600">メンバーへプロジェクトを割り当て</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> 新規割り当て
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">プロジェクト</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">対象者</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">期限</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">合格率</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map(assign => (
              <tr key={assign.id} className="hover:bg-gray-50 transition cursor-pointer">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{assign.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{assign.target}</td>
                <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                  <Calendar width={16} height={16} /> {assign.deadline}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{assign.passRate}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    assign.status === "完了" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {assign.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
