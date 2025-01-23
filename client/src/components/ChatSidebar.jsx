import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChatSidebar = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching chat history
    const fetchChats = async () => {
      try {
        // Replace with actual API call
        const mockChats = [
          { id: "1", title: "Python Programming" },
          { id: "2", title: "Web Development" },
        ];
        setChats(mockChats);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch chats", error);
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleNewChat = () => {
    // Generate a new chat ID and navigate to it
    const newChatId = `chat-${Date.now()}`;
    navigate(`/dashboard/chats/${newChatId}`);
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <button
        onClick={handleNewChat}
        className="m-4 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2"
      >
        <span>+ New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto px-2 space-y-2">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">
            Loading chats...
          </div>
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              className="block p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {chat.title}
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500">No chat history</div>
        )}
      </div>
    </div>
  );
};
export default ChatSidebar;
