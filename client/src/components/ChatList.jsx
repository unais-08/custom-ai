import { useState } from "react";
import { Link } from "react-router-dom";
const ChatList = () => {
  const [isPending, setIsPending] = useState(true);
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        DASHBOARD
      </span>

      <div className="flex flex-col gap-2">
        <Link
          to="/dashboard"
          className="px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Create a new Chat
        </Link>
        <Link
          to="/"
          className="px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Explore Lama AI
        </Link>
        <Link
          to="/"
          className="px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          Contact
        </Link>
      </div>

      <hr className="border-0 h-px bg-gray-400 bg-opacity-10 rounded-sm my-5" />

      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        RECENT CHATS
      </span>

      <div className="flex flex-col gap-2 overflow-auto">
        {isPending ? (
          <span className="text-gray-500 text-sm">Loading...</span>
        ) : error ? (
          <span className="text-red-400 text-sm">Something went wrong!</span>
        ) : (
          data?.map((chat) => (
            <Link
              to={`/dashboard/chats/${chat._id}`}
              key={chat._id}
              className="px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm truncate"
            >
              {chat.title}
            </Link>
          ))
        )}
      </div>

      <hr className="border-0 h-px bg-gray-400 bg-opacity-10 rounded-sm my-5" />
      <div className="mt-auto flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
        <img src="/logo.png" alt="Pro Version" className="w-6 h-6" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Upgrade to Lama AI Pro</span>
          <span className="text-xs text-gray-500">
            Get unlimited access to all features
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
