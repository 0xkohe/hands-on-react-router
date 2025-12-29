import type { Route } from "./+types/route";
import { Palette, Globe } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Appearance Settings - CloudDriver" },
    { name: "description", content: "Customize your interface" },
  ];
}

export default function AppearanceSettings() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Appearance Settings</h1>
        <p className="mt-2 text-gray-600">Customize how CloudDriver looks</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Globe width={18} height={18} /> Language
          </label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="en">English</option>
            <option value="ja">Japanese (日本語)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Palette width={18} height={18} /> Theme
          </label>
          <div className="space-y-3">
            {[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "auto", label: "Auto (System)" },
            ].map(option => (
              <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="radio" name="theme" value={option.value} checked={theme === option.value} onChange={(e) => setTheme(e.target.value)} className="w-4 h-4 text-blue-600" />
                <span className="ml-3 font-medium text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex gap-3">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
