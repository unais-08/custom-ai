import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 font-bold"
          aria-label="Home"
        >
          <img
            src="/primary-logo.webp"
            alt="Mini GPT Logo"
            className="w-9 h-9 transition-transform group-hover:scale-110"
          />
          <span className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mini GPT
          </span>
          <span className="text-xs text-gray-400 transition-opacity">
            Go Home
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 border-2 border-blue-500/80",
                  userButtonPopoverCard: "bg-gray-900 border border-gray-700",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
