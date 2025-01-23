import { Link, Outlet } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Header from "../components/Header";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: {
          elements: {
            footerActionLink: "text-blue-400 hover:text-blue-300",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
            socialButtonsBlockButton: "border-gray-700 hover:bg-gray-800",
          },
        },
      }}
    >
      <div className="h-screen flex flex-col bg-gradient-to-b from-[#0e0c16] to-[#1a162b] text-gray-100">
        <Header />
        <main className="flex-1 overflow-y">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
