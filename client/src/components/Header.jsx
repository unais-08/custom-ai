import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
const Header = () => {
  return (
    <header className="px-4 md:px-6 lg:px-8 py-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link
          to="/"
          className="group flex items-center gap-2 font-bold transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 transition-transform group-hover:scale-110"
          />
          <span className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Custom AI
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10 border-2 border-blue-500/80",
                  userButtonPopoverCard: "bg-gray-900 border border-gray-700",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
