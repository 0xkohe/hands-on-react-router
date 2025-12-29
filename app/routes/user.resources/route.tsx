import type { Route } from "./+types/route";
import { FileText, Video, ExternalLink } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Learning Resources - CloudDriver" },
    { name: "description", content: "Educational materials and guides" },
  ];
}

export default function UserResources() {
  const resources = [
    { id: 1, type: "documentation", title: "AWS VPC Fundamentals", category: "Networking" },
    { id: 2, type: "video", title: "EC2 Security Best Practices", category: "Security" },
    { id: 3, type: "documentation", title: "S3 Storage Optimization", category: "Storage" },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case "video": return <Video className="text-red-500" width={24} height={24} />;
      default: return <FileText className="text-blue-500" width={24} height={24} />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
        <p className="mt-2 text-gray-600">Helpful guides and reference materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <a key={resource.id} href="#" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition block">
            <div className="mb-4">{getIcon(resource.type)}</div>
            <span className="text-xs text-blue-600 font-semibold uppercase">{resource.category}</span>
            <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-4">{resource.title}</h3>
            <div className="flex items-center text-blue-500 text-sm font-medium">
              Read More <ExternalLink width={16} height={16} className="ml-2" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
