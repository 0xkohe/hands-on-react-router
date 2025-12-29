import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "基本設定 - CloudDriver 管理者" },
    { name: "description", content: "プラットフォームの基本設定" },
  ];
}

export default function AdminGeneralSettings() {
  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">基本設定</h1>
        <p className="mt-2 text-gray-600">プラットフォームの基本情報を管理</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">サービス名</label>
          <input 
            type="text" 
            defaultValue="CloudDriver"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">サポートメール</label>
          <input 
            type="email" 
            defaultValue="support@clouddriver.example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">ロゴ画像</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600">クリックしてアップロード、またはドラッグ&ドロップ</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">プラットフォームの説明</label>
          <textarea 
            rows={4}
            defaultValue="AWSスキルをシミュレーション環境で測定・育成するプラットフォーム"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
