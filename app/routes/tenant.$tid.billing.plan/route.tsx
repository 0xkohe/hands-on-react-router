import type { Route } from "./+types/route";
import { Check } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "サブスクリプション - CloudDriver テナント" },
    { name: "description", content: "プランの変更・解約" },
  ];
}

export default function TenantBillingPlan() {
  const plans = [
    { name: "スターター", users: 10, price: "¥5,000/月", current: false },
    { name: "プロ", users: 50, price: "¥15,000/月", current: true },
    { name: "エンタープライズ", users: "無制限", price: "お問い合わせ", current: false },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">サブスクリプション</h1>
        <p className="mt-2 text-gray-600">現在のプラン: <span className="font-semibold">プロ</span></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className={`rounded-lg p-8 border-2 ${plan.current ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</p>
            <p className="text-sm text-gray-600 mb-6">最大{plan.users}ユーザー</p>
            <button className={`w-full py-2 rounded-lg font-medium transition ${plan.current ? "bg-blue-500 text-white hover:bg-blue-600" : "border border-gray-300 text-gray-900 hover:bg-gray-50"}`}>
              {plan.current ? "現在のプラン" : "変更"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
