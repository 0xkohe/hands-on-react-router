import type { Route } from "./+types/route";
import { useNavigate } from "react-router";
import { BarChart3, CheckCircle, AlertCircle, Award, Download } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test Results - CloudDriver" },
    { name: "description", content: "Your test results and feedback" },
  ];
}

export default function TestResults() {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8">
      {/* Score Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-gray-600 mb-2">Test Results</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">87%</h1>
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle width={20} height={20} /> PASSED
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="text-center">
              <p className="text-sm text-gray-600">Completion Time</p>
              <p className="text-2xl font-bold text-gray-900">1h 23m</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="text-green-500" width={24} height={24} />
            <span className="text-sm text-gray-600">Passed Checks</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">13/15</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="text-orange-500" width={24} height={24} />
            <span className="text-sm text-gray-600">Failed Checks</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">2/15</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-blue-500" width={24} height={24} />
            <span className="text-sm text-gray-600">Points Earned</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">870/1000</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detailed Feedback */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Feedback</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900">✓ VPC Configuration</h3>
              <p className="text-sm text-gray-600 mt-1">Your VPC setup is correctly configured with proper CIDR blocks.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900">✓ Subnets Setup</h3>
              <p className="text-sm text-gray-600 mt-1">Public and private subnets are correctly distributed across AZs.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-medium text-gray-900">✗ Route Table Configuration</h3>
              <p className="text-sm text-gray-600 mt-1">The private subnet's route table should route traffic through NAT Gateway, not Internet Gateway.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-medium text-gray-900">✗ Security Group Rules</h3>
              <p className="text-sm text-gray-600 mt-1">HTTPS (443) inbound rule is missing from the web server security group.</p>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Correct Configuration</h2>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2 mb-4">
            <div className="text-gray-600">
              <span className="text-green-600">✓ Private Route Table</span>
              <div className="ml-4 text-xs text-gray-700 mt-1">
                Destination: 0.0.0.0/0<br/>
                Target: nat-xxxxx
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition">
              View Full Solution
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Download width={18} height={18} /> Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={() => navigate("/user/home")}
          className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Back to Dashboard
        </button>
        <button className="flex-1 px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition">
          Retry Project
        </button>
      </div>
    </div>
  );
}
