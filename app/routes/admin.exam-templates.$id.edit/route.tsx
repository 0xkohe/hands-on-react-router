import type { Route } from "./+types/route";
import { Save, Play, X } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "試験エディタ - CloudDriver 管理者" },
    { name: "description", content: "シミュレーション環境の構成定義" },
  ];
}

export default function ExamEditor() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">試験エディタ</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
            <Play width={18} height={18} /> プレビュー
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-medium transition">
            <Save width={18} height={18} /> 保存
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <X width={20} height={20} />
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Resources */}
        <div className="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">AWSリソース</h3>
          <div className="space-y-2">
            {["EC2", "S3", "RDS", "VPC", "Lambda", "IAM"].map(resource => (
              <div 
                key={resource}
                className="p-3 bg-gray-100 rounded-lg cursor-move hover:bg-gray-200 transition text-sm font-medium text-gray-700"
              >
                {resource}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 p-8 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-12 min-h-full flex items-center justify-center">
            <p className="text-gray-500 text-center">リソースをドラッグして配置してください</p>
          </div>
        </div>

        {/* Right Panel - Settings */}
        <div className="w-56 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">判定ルール</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">VPC設定</p>
              <p className="text-xs text-gray-600 mt-1">CIDR: 10.0.0.0/16 であること</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">セキュリティグループ</p>
              <p className="text-xs text-gray-600 mt-1">インバウンド: HTTP/HTTPS のみ許可</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
