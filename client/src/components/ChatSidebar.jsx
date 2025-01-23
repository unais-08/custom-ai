import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChatSidebar = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
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
    const newChatId = `chat-${Date.now()}`;
    navigate(`/dashboard/chats/${newChatId}`);
    setIsOpen(false); // Close sidebar on mobile after new chat
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 w-56 bg-gray-900 border-r border-gray-800 
        transform transition-transform duration-300 ease-in-out z-40
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <button
          onClick={handleNewChat}
          className="m-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 tracking-wide"
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
                onClick={() => setIsOpen(false)}
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

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default ChatSidebar;
