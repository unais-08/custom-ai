import { Link, Outlet } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
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
      <div className="h-screen flex flex-col py-4 px-4 md:px-5 lg:px-12 bg-gradient-to-b from-[#0e0c16] to-[#1a162b]">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/"
            className="group flex items-center gap-2 font-bold transition-opacity hover:opacity-80"
            aria-label="Home"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110"
            />
            <span className="text-sm md:text-base lg:text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CustomGPT AI
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-9 h-9 border-2 border-blue-500/80 hover:border-blue-400 transition-colors",
                    userButtonTrigger:
                      "hover:bg-gray-700/50 rounded-full backdrop-blur-lg",
                    userButtonPopoverCard:
                      "bg-gray-900/95 backdrop-blur-xl border border-gray-700",
                    userPreviewText: "text-gray-200",
                    userButtonPopoverActionButtonText:
                      "text-gray-300 hover:text-white hover:bg-gray-800/50",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="flex items-center gap-2 rounded-lg bg-[#217bfe] text-white px-4 py-2 text-sm transition-all 
                         duration-300 hover:bg-white hover:text-[#217bfe] hover:shadow-xl md:text-base"
              >
                <span>Sign In</span>
              </Link>
            </SignedOut>
          </div>
        </header>

        <main className="flex-1 pt-6 md:pt-2">
          <div className="mx-auto h-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
