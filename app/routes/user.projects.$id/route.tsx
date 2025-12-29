import type { Route } from "./+types/route";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Clock, BarChart3, Users, FileText } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Project Details - CloudDriver" },
    { name: "description", content: "Project overview and details" },
  ];
}

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-8 space-y-8">
      <button 
        onClick={() => navigate("/user/projects")}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium"
      >
        <ArrowLeft width={20} height={20} /> Back to Projects
      </button>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">VPC Architecture Basics</h1>
        <p className="mt-2 text-gray-600">Learn the fundamentals of AWS VPC design and configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock width={20} height={20} className="text-gray-500" />
            <span className="text-sm text-gray-600">Estimated Time</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1h 30m</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 width={20} height={20} className="text-gray-500" />
            <span className="text-sm text-gray-600">Difficulty</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">Beginner</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users width={20} height={20} className="text-gray-500" />
            <span className="text-sm text-gray-600">Participants</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1.2K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
          <div className="prose prose-sm text-gray-700 space-y-3">
            <p>In this project, you will learn the core concepts of AWS VPC and how to configure a production-ready virtual network.</p>
            <h3 className="font-semibold text-gray-900 mt-4">What You'll Learn:</h3>
            <ul className="space-y-2">
              <li>VPC creation and CIDR block allocation</li>
              <li>Subnet design and availability zones</li>
              <li>Route tables and internet gateways</li>
              <li>Security groups and network ACLs</li>
              <li>NAT gateways and VPN connections</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">AWS account with VPC access</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">Basic networking knowledge</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">30-60 minutes of time</span>
            </div>
          </div>
          <button 
            onClick={() => navigate(`/user/lab/${id}`)}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Start Project
          </button>
        </div>
      </div>
    </div>
  );
}
