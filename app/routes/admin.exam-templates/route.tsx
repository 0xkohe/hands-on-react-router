import type { Route } from "./+types/route";
import { Plus, Search, Trash2, Edit } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "試験テンプレート - CloudDriver 管理者" },
    { name: "description", content: "共通問題ライブラリの管理" },
  ];
}

export default function AdminExamTemplates() {
  const [searchQuery, setSearchQuery] = useState("");

  const templates = [
    { id: 1, title: "VPC構築基礎", category: "ネットワーク", difficulty: "初級", author: "管理者", status: "公開" },
    { id: 2, title: "EC2とオートスケーリング", category: "コンピュート", difficulty: "中級", author: "管理者", status: "公開" },
    { id: 3, title: "S3バケット設定", category: "ストレージ", difficulty: "初級", author: "管理者", status: "下書き" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">試験テンプレート</h1>
          <p className="mt-2 text-gray-600">共通問題ライブラリの管理</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
          <Plus width={20} height={20} /> 新規テンプレート作成
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" width={20} height={20} />
        <input 
          type="text"
          placeholder="テンプレート検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">テンプレート名</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">カテゴリ</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">難易度</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ステータス</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">作成者</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {templates.map(template => (
              <tr key={template.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{template.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{template.category}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    template.difficulty === "初級" ? "bg-green-100 text-green-700" :
                    template.difficulty === "中級" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {template.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    template.status === "公開" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {template.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{template.author}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                      <Edit width={18} height={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                      <Trash2 width={18} height={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
