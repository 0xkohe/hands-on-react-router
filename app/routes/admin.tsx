import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Users,
  Zap,
  BarChart3,
  ClipboardList,
  LifeBuoy,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: "ダッシュボード", path: "/admin/dashboard" },
    { icon: Building2, label: "テナント管理", path: "/admin/tenants" },
    { icon: BookOpen, label: "試験テンプレート", path: "/admin/exam-templates" },
    { icon: Users, label: "全ユーザー検索", path: "/admin/users" },
    { icon: Zap, label: "インフラコスト", path: "/admin/infra/costs" },
    { icon: BarChart3, label: "請求・入金管理", path: "/admin/billing" },
    { icon: ClipboardList, label: "監査ログ", path: "/admin/audit-logs" },
    { icon: LifeBuoy, label: "サポート管理", path: "/admin/support" },
  ];

  const settingsItems = [
    { icon: Settings, label: "メンテナンス", path: "/admin/settings/maintenance" },
    { icon: Settings, label: "権限管理", path: "/admin/settings/roles" },
    { icon: Settings, label: "機能フラグ", path: "/admin/settings/features" },
    { icon: Settings, label: "API連携", path: "/admin/settings/integrations" },
    { icon: Settings, label: "基本設定", path: "/admin/settings/general" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {isSidebarOpen && <h2 className="font-bold text-lg text-gray-900">CloudDriver</h2>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isSidebarOpen ? <X width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon width={20} height={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          <div className={`text-xs font-semibold text-gray-600 uppercase tracking-wide ${isSidebarOpen ? "px-4 mb-2" : "text-center"}`}>
            {isSidebarOpen && "設定"}
          </div>
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon width={20} height={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-gray-200 p-4 space-y-1">
          <button
            onClick={() => navigate("/admin/help")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-gray-700 hover:bg-gray-100"
          >
            <HelpCircle width={20} height={20} />
            {isSidebarOpen && <span>ヘルプ</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-red-600 hover:bg-red-50">
            <LogOut width={20} height={20} />
            {isSidebarOpen && <span>ログアウト</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
