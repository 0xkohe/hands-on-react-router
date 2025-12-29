import type { Route } from "./+types/route";
import { useParams } from "react-router";
import { Play, Save, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Simulation Lab - CloudDriver" },
    { name: "description", content: "AWS infrastructure simulation environment" },
  ];
}

export default function SimulationLab() {
  const { id } = useParams();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleSave = () => {
    setSavedAt(new Date().toLocaleTimeString());
  };

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => setIsValidating(false), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Assets */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">AWS Resources</h3>
          <div className="space-y-2">
            {["EC2", "S3", "RDS", "VPC", "IAM", "Lambda"].map(resource => (
              <div 
                key={resource}
                className="p-3 bg-gray-100 rounded-lg cursor-move hover:bg-gray-200 transition text-sm font-medium text-gray-700"
              >
                {resource}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Networking</h3>
          <div className="space-y-2">
            {["Subnet", "Route Table", "SG", "NACLs"].map(item => (
              <div 
                key={item}
                className="p-3 bg-gray-100 rounded-lg cursor-move hover:bg-gray-200 transition text-sm font-medium text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Canvas</h2>
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-900 transition"
            >
              <Save width={18} height={18} /> Save
            </button>
            <button 
              onClick={handleValidate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-900 transition"
            >
              <CheckCircle width={18} height={18} /> Validate
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium text-white transition">
              <Play width={18} height={18} /> Submit
            </button>
          </div>
        </div>

        {savedAt && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm text-blue-800">
            ✓ Saved at {savedAt}
          </div>
        )}

        <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 p-8 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-12 min-h-full flex items-center justify-center">
            <div className="text-center space-y-3">
              <AlertCircle width={48} height={48} className="text-gray-400 mx-auto" />
              <p className="text-gray-600 font-medium">Drag AWS resources here to start building</p>
              <p className="text-sm text-gray-500">Connect resources with arrows to define relationships</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Requirements & Properties */}
      <div className="w-80 bg-white shadow-lg border-l border-gray-200 flex flex-col">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 p-4">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-200">Requirements</button>
            <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100">Properties</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">VPC Configuration</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>□ Create a VPC with CIDR 10.0.0.0/16</p>
              <p>□ Create public subnet in AZ-a (10.0.1.0/24)</p>
              <p>□ Create private subnet in AZ-b (10.0.2.0/24)</p>
              <p>□ Attach Internet Gateway</p>
              <p>□ Configure NAT Gateway</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Security</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>□ Create security group for web servers</p>
              <p>□ Allow inbound HTTP/HTTPS</p>
              <p>□ Restrict outbound access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
