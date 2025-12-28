import { Outlet } from "react-router";

export default function TenantLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* サイドバーナビゲーション */}
      <div className="w-64 bg-white shadow-lg">
      </div>
      
      {/* メインコンテンツエリア */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}


