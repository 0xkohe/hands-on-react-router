import type { Route } from "./+types/route";
import { useNavigate } from "react-router";
import { BarChart3, BookOpen, Award, Zap } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - CloudDriver" },
    { name: "description", content: "Your learning dashboard" },
  ];
}

export default function UserHome() {
  const navigate = useNavigate();

  const inProgressProjects = [
    { id: 1, title: "VPC Architecture Setup", progress: 65, timeLeft: "2h 30m" },
    { id: 2, title: "EC2 and Auto Scaling", progress: 30, timeLeft: "4h 15m" },
  ];

  const recommendedProjects = [
    { id: 3, title: "S3 Configuration Basics", difficulty: "Beginner", time: "45min" },
    { id: 4, title: "RDS Database Setup", difficulty: "Intermediate", time: "1h 30m" },
  ];

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, User</h1>
        <p className="mt-2 text-gray-600">Continue your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Zap} label="Active Projects" value="2" color="blue" />
        <StatCard icon={Award} label="Completed" value="8" color="green" />
        <StatCard icon={BookOpen} label="Hours Learned" value="24" color="purple" />
        <StatCard icon={BarChart3} label="Avg Score" value="87%" color="orange" />
      </div>

      {/* In Progress Projects */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">In Progress</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {inProgressProjects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <span className="text-sm text-gray-600">{project.timeLeft} left</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => navigate(`/user/lab/${project.id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Projects */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {recommendedProjects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{project.difficulty}</span>
                <span className="text-xs text-gray-600">{project.time}</span>
              </div>
              <button 
                onClick={() => navigate(`/user/projects/${project.id}`)}
                className="w-full px-3 py-2 border border-blue-500 text-blue-500 rounded-md text-sm font-medium hover:bg-blue-50 transition"
              >
                Start Project
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    orange: "bg-orange-50 border-orange-200",
  };

  const iconColors = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-6`}>
      <Icon className={`${iconColors[color as keyof typeof iconColors]} mb-2`} width={24} height={24} />
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
