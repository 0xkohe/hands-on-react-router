import type { Route } from "./+types/route";
import { Lock, Smartphone, AlertCircle } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Security Settings - CloudDriver" },
    { name: "description", content: "Manage your security preferences" },
  ];
}

export default function SecuritySettings() {
  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
        <p className="mt-2 text-gray-600">Keep your account safe and secure</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <Lock className="text-blue-600 flex-shrink-0 mt-1" width={24} height={24} />
            <div>
              <h3 className="font-semibold text-gray-900">Password</h3>
              <p className="text-sm text-gray-600 mt-1">Change your password regularly to keep your account secure</p>
            </div>
          </div>
          <button className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
            Change
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Smartphone className="text-green-600 flex-shrink-0 mt-1" width={24} height={24} />
            <div>
              <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}
