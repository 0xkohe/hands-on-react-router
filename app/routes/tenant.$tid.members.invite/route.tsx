import type { Route } from "./+types/route";
import { Send, X } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "メンバー招待 - CloudDriver テナント" },
    { name: "description", content: "新規ユーザーの一括招待" },
  ];
}

export default function TenantMembersInvite() {
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("member");

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">メンバー招待</h1>
        <p className="mt-2 text-gray-600">新規ユーザーを一括招待</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">メールアドレス（1行に1つ）</label>
          <textarea 
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="user1@example.com&#10;user2@example.com&#10;user3@example.com"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">{emails.split('\n').filter(e => e.trim()).length}個のメールアドレス</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">ロール</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="member">メンバー</option>
            <option value="manager">マネージャー</option>
            <option value="admin">管理者</option>
          </select>
        </div>

        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            <Send width={18} height={18} /> 招待メール送信
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition">
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
