import { ChatList } from "../components";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <div className="flex gap-12 pt-5 h-full md:gap-8 sm:gap-4 sm:flex-col">
      <div className="flex-1 min-w-[260px] sm:min-w-full">
        <ChatList />
      </div>
      <div className="flex-[4] bg-[#12101b] rounded-xl p-6 sm:p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
