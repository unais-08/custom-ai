import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook
import { ChatSidebar } from "../components";
import { Spinner } from "../components/Spinner"; // Assuming you have a Spinner component

const DashboardLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser(); // Get user state from Clerk

  // Show a loading spinner while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redirect to login if no user is signed in
  if (!isSignedIn || !user) {
    return <Navigate to="/sign-in" />; // Redirect to your login page
  }

  // Render the dashboard layout if the user is authenticated
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
