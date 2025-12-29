import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Skill Analysis - CloudDriver" },
    { name: "description", content: "Your skill progression and analytics" },
  ];
}

export default function UserAnalytics() {
  const skills = [
    { name: "VPC Networking", score: 85 },
    { name: "EC2 Management", score: 78 },
    { name: "S3 Storage", score: 82 },
    { name: "IAM Security", score: 70 },
    { name: "RDS Databases", score: 65 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Skill Analysis</h1>
        <p className="mt-2 text-gray-600">Monitor your progress across different AWS services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Skills Breakdown</h2>
          <div className="space-y-4">
            {skills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                  <span className="text-sm font-semibold text-gray-600">{skill.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${skill.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recommendations</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="font-medium text-orange-900">Focus on IAM Security</p>
              <p className="text-xs mt-1">Your weakest area - start with IAM basics</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-900">RDS Intermediate</p>
              <p className="text-xs mt-1">Ready to advance - try advanced RDS project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
