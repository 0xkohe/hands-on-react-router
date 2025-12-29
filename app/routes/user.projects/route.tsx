import type { Route } from "./+types/route";
import { useNavigate } from "react-router";
import { Heart, Clock, BarChart3 } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects Catalog - CloudDriver" },
    { name: "description", content: "Browse all available projects" },
  ];
}

export default function UserProjects() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const projects = [
    { id: 1, title: "VPC Architecture Basics", category: "networking", difficulty: "beginner", time: "1h", bookmarked: false },
    { id: 2, title: "EC2 Instance Management", category: "compute", difficulty: "beginner", time: "1.5h", bookmarked: true },
    { id: 3, title: "S3 Bucket Configuration", category: "storage", difficulty: "intermediate", time: "1h 30m", bookmarked: false },
    { id: 4, title: "RDS Database Setup", category: "database", difficulty: "intermediate", time: "2h", bookmarked: false },
    { id: 5, title: "Lambda Functions & API Gateway", category: "serverless", difficulty: "intermediate", time: "2h", bookmarked: true },
    { id: 6, title: "CloudFormation Templates", category: "iac", difficulty: "advanced", time: "2.5h", bookmarked: false },
  ];

  const categories = ["all", "networking", "compute", "storage", "database", "serverless", "iac"];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const filtered = projects.filter(p => 
    (selectedCategory === "all" || p.category === selectedCategory) &&
    (selectedDifficulty === "all" || p.difficulty === selectedDifficulty)
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Projects Catalog</h1>
        <p className="mt-2 text-gray-600">Choose a project to start learning</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Difficulty</label>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <button className="text-gray-400 hover:text-red-500 transition">
                  <Heart width={20} height={20} fill={project.bookmarked ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BarChart3 width={16} height={16} />
                  <span className="capitalize">{project.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock width={16} height={16} />
                  <span>{project.time}</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button 
                onClick={() => navigate(`/user/projects/${project.id}`)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
