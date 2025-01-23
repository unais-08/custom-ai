// DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import { ChatList } from "../components";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 min-w-[220px] border-r border-gray-700 bg-gray-900/95 backdrop-blur-lg">
        <ChatList />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="max-w-4xl mx-auto p-4 md:p-6 h-full flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
