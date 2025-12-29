import type { Route } from "./+types/route";
import { Download } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "支払い履歴 - CloudDriver テナント" },
    { name: "description", content: "請求書と支払い状況" },
  ];
}

export default function TenantBilling() {
  const invoices = [
    { id: 1, date: "2025-02-01", amount: "¥15,000", status: "支払済み", dueDate: "2025-02-15" },
    { id: 2, date: "2025-01-01", amount: "¥15,000", status: "支払済み", dueDate: "2025-01-15" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">支払い履歴</h1>
        <p className="mt-2 text-gray-600">請求書と支払い状況を確認</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">請求日</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">金額</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">支払期限</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{inv.date}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{inv.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{inv.dueDate}</td>
                <td className="px-6 py-4 text-sm"><span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{inv.status}</span></td>
                <td className="px-6 py-4 text-center"><button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Download width={18} height={18} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
