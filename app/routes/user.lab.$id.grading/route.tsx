import type { Route } from "./+types/route";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Grading Progress - CloudDriver" },
    { name: "description", content: "Automatic grading in progress" },
  ];
}

export default function GradingProgress() {
  const checks = [
    { name: "VPC Creation", status: "completed", time: "0.2s" },
    { name: "Subnet Configuration", status: "completed", time: "0.3s" },
    { name: "Internet Gateway Attachment", status: "in-progress", time: "..." },
    { name: "Route Table Configuration", status: "pending", time: "..." },
    { name: "Security Group Rules", status: "pending", time: "..." },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <TrendingUp className="text-blue-600" width={32} height={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Grading in Progress</h1>
          <p className="text-gray-600 mt-2">Your configuration is being evaluated...</p>
        </div>

        <div className="space-y-4 mb-8">
          {checks.map((check, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{check.name}</h3>
              </div>
              <div className="text-sm text-gray-600 min-w-12">{check.time}</div>
              <div className="min-w-fit">
                {check.status === "completed" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle width={16} height={16} /> Done
                  </span>
                )}
                {check.status === "in-progress" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <div className="w-4 h-4 border-2 border-transparent border-t-blue-600 rounded-full animate-spin" />
                  </span>
                )}
                {check.status === "pending" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm font-medium">
                    Waiting...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> This process typically takes 2-3 minutes. We'll redirect you to the results page once grading is complete.
          </p>
        </div>
      </div>
    </div>
  );
}
