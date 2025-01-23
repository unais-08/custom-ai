import { Outlet } from "react-router-dom";
import { ChatList, ChatSidebar } from "../components";

const DashboardLayout = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ChatSidebar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
