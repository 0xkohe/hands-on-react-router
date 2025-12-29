import type { Route } from "./+types/route";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "API接続テスト" },
    { name: "description", content: "Supabase接続確認" },
  ];
}

export default function TestApi() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      const newLogs: string[] = [];

      try {
        newLogs.push("=== 環境変数確認 ===");
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        newLogs.push(`URL: ${url}`);
        newLogs.push(`Key: ${key?.substring(0, 30)}...`);

        newLogs.push("\n=== ヘルスチェック ===");
        const response = await fetch(`${url}/health`, {
          method: "GET",
          headers: {
            "apikey": key || "",
          },
        });
        newLogs.push(`Status: ${response.status}`);
        const data = await response.json();
        newLogs.push(`Response: ${JSON.stringify(data)}`);

        newLogs.push("\n=== Supabase Auth確認 ===");
        const authResponse = await fetch(`${url}/auth/v1/settings`, {
          method: "GET",
          headers: {
            "apikey": key || "",
          },
        });
        newLogs.push(`Auth Status: ${authResponse.status}`);
        if (authResponse.ok) {
          const authData = await authResponse.json();
          newLogs.push(`Auth Available: Yes`);
          newLogs.push(`Providers: ${authData.external?.length || 0}`);
        }
      } catch (error) {
        newLogs.push(`❌ エラー: ${error instanceof Error ? error.message : String(error)}`);
      }

      setLogs(newLogs);
      setLoading(false);
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API接続テスト</h1>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">接続確認中...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {logs.map((log, i) => (
                <div key={i} className="font-mono text-gray-800">
                  {log}
                </div>
              ))}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-bold text-blue-900 mb-2">トラブルシューティング:</h2>
          <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
            <li>URLとキーが正しく表示されていることを確認</li>
            <li>ブラウザの開発者ツール（F12）のネットワークタブで詳細を確認</li>
            <li>Supabaseコンテナが起動しているか確認: <code>docker ps | grep supabase</code></li>
            <li>ローカルホストのみの場合は、ブラウザのセキュリティ設定を確認</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
