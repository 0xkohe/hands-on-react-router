import type { Route } from "./+types/route";
import { Building2, LogOut } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tenant Management - CloudDriver" },
    { name: "description", content: "Manage your organization memberships" },
  ];
}

export default function TenantManagement() {
  const tenants = [
    { id: 1, name: "Acme Corp", role: "Member", joinedDate: "2025-01-01" },
    { id: 2, name: "Tech Startup", role: "Admin", joinedDate: "2025-06-15" },
  ];

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
        <p className="mt-2 text-gray-600">Manage your organization memberships</p>
      </div>

      <div className="space-y-4">
        {tenants.map(tenant => (
          <div key={tenant.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Building2 className="text-blue-600" width={24} height={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">{tenant.name}</h3>
                  <p className="text-sm text-gray-600">Role: {tenant.role} • Joined {tenant.joinedDate}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg text-sm font-medium hover:bg-red-50 transition flex items-center gap-2">
                <LogOut width={16} height={16} /> Leave
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
