import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import chatService from "../libs/chat_service";
import { useUser } from "@clerk/clerk-react";

const ChatSidebar = () => {
  const { user } = useUser();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;
      try {
        const userChats = await chatService.getUserChats(user.id);
        setChats(userChats);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch chats", error);
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [user]);

  const handleNewChat = () => {
    navigate("/dashboard/chats/new");
  };

  return (
    <div className="w-64 bg-gray-900 p-4 border-r border-gray-800">
      <button
        onClick={handleNewChat}
        className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        + New Chat
      </button>

      <div className="overflow-y-auto h-[calc(100vh-160px)]">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">
            Loading chats...
          </div>
        ) : (
          chats.map((chat) => (
            <Link
              key={chat._id} // This should already be unique
              to={`/dashboard/chats/${chat._id}`}
              className="block p-3 mb-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <p className="text-gray-300 truncate">
                {chat.title || "Untitled Chat"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(chat.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
