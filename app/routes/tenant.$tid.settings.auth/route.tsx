import type { Route } from "./+types/route";
import { Save } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SSO設定 - CloudDriver テナント" },
    { name: "description", content: "SAML/OIDC連携設定" },
  ];
}

export default function TenantSettingsAuth() {
  const [provider, setProvider] = useState("saml");

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SSO設定</h1>
        <p className="mt-2 text-gray-600">シングルサインオンを設定</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">プロバイダ</label>
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option value="saml">SAML 2.0</option>
            <option value="oidc">OpenID Connect</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">エンドポイントURL</label>
          <input type="url" placeholder="https://idp.example.com/saml/endpoint" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            <Save width={18} height={18} /> 保存
          </button>
        </div>
      </div>
    </div>
  );
}
