import type { Route } from "./+types/route";
import { Send } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "サポート - CloudDriver テナント" },
    { name: "description", content: "運営への問い合わせ" },
  ];
}

export default function TenantSupport() {
  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">サポート</h1>
        <p className="mt-2 text-gray-600">運営チームに問い合わせ</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">件名</label>
          <input type="text" placeholder="お問い合わせ内容" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">メッセージ</label>
          <textarea rows={6} placeholder="詳細を入力..." className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            <Send width={18} height={18} /> 送信
          </button>
        </div>
      </div>
    </div>
  );
}
