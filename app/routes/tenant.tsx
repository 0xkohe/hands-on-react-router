import { Outlet, useNavigate, useLocation, useParams } from "react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Award,
  BarChart3,
  CreditCard,
  ClipboardList,
  Settings,
  LifeBuoy,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function TenantLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Extract tenant ID from URL or use default
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const tid = pathSegments[1] || "1";

  const navItems = [
    { icon: LayoutDashboard, label: "ダッシュボード", path: `dashboard` },
    { icon: Users, label: "メンバー管理", path: `members` },
    { icon: BookOpen, label: "試験割り当て", path: `assignments` },
    { icon: Award, label: "成績確認", path: `results` },
    { icon: BarChart3, label: "分析", path: `analytics` },
    { icon: CreditCard, label: "請求・プラン", path: `billing` },
    { icon: ClipboardList, label: "監査ログ", path: `audit-logs` },
  ];

  const settingsItems = [
    { icon: Settings, label: "認証設定", path: `settings/auth` },
    { icon: Settings, label: "通知設定", path: `settings/notifications` },
    { icon: Settings, label: "APIキー", path: `settings/api` },
    { icon: Settings, label: "セキュリティ", path: `settings/security` },
    { icon: Settings, label: "プロフィール", path: `settings/profile` },
  ];

  const isActiveNav = (path: string) => location.pathname.includes(`/${tid}/${path}`);

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
                onClick={() => navigate(`/tenant/${tid}/${item.path}`)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActiveNav(item.path)
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
                onClick={() => navigate(`/tenant/${tid}/${item.path}`)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActiveNav(item.path)
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
            onClick={() => navigate(`/tenant/${tid}/support`)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActiveNav('support')
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LifeBuoy width={20} height={20} />
            {isSidebarOpen && <span>サポート</span>}
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
