import type { Route } from "./+types/route";
import { Download, Send } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "請求管理 - CloudDriver 管理者" },
    { name: "description", content: "全テナントへの請求状況確認" },
  ];
}

export default function AdminBilling() {
  const invoices = [
    { id: 1, tenant: "株式会社ABC", amount: "¥15,000", dueDate: "2025-03-15", status: "支払済み" },
    { id: 2, tenant: "TechXYZ", amount: "¥25,000", dueDate: "2025-03-15", status: "未払い" },
    { id: 3, tenant: "デジタル革命", amount: "¥8,000", dueDate: "2025-03-20", status: "支払済み" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">請求・入金管理</h1>
        <p className="mt-2 text-gray-600">全テナントへの請求状況を確認</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">今月の請求額</p>
          <p className="text-3xl font-bold text-gray-900">¥48,000</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">回収済み</p>
          <p className="text-3xl font-bold text-green-600">¥23,000</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">未回収</p>
          <p className="text-3xl font-bold text-red-600">¥25,000</p>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">請求先</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">金額</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">支払期限</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.tenant}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{inv.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{inv.dueDate}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    inv.status === "支払済み" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                    <Download width={18} height={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
