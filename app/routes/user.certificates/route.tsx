import type { Route } from "./+types/route";
import { Download, Share2, Award } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Certificates - CloudDriver" },
    { name: "description", content: "Your digital certificates" },
  ];
}

export default function UserCertificates() {
  const certificates = [
    { id: 1, title: "AWS VPC Architect", date: "2025-12-28", score: 87 },
    { id: 2, title: "EC2 Master", date: "2025-12-27", score: 92 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
        <p className="mt-2 text-gray-600">Your earned certifications and badges</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-sm border border-purple-200 p-8">
            <div className="flex items-start justify-between mb-6">
              <Award className="text-purple-600" width={32} height={32} />
              <span className="text-sm font-semibold text-purple-900">{cert.date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
            <p className="text-sm text-gray-600 mb-6">Score: {cert.score}%</p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-300 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
                <Download width={16} height={16} /> Download
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-300 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
                <Share2 width={16} height={16} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
