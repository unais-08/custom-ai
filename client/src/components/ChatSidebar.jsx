import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import chatService from "../libs/chat_service";
import { Spinner } from "../components/Spinner";
import { toast } from "react-toastify";

const ChatSidebar = () => {
  const { user } = useUser();
  const [state, setState] = useState({
    chats: [],
    isLoading: true,
    isCreatingNew: false,
  });
  const navigate = useNavigate();

  const fetchChats = async () => {
    if (!user) return;

    try {
      const userChats = await chatService.getUserChats(user.id);
      setState((prev) => ({
        ...prev,
        chats: userChats.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      toast.error("Failed to load chat history");
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    if (user) fetchChats();
  }, [user]);

  const handleNewChat = async () => {
    if (!user || state.isCreatingNew) return;

    try {
      setState((prev) => ({ ...prev, isCreatingNew: true }));

      // Generate a more meaningful title or use a default one

      const initialMessage = "Hello, let's start a new chat!";
      const title = `Chat ${state.chats.length + 1}`;
      // Create new chat with a custom title
      const newChat = await chatService.createChat(
        user.id,
        initialMessage,
        title
      );

      // Update local state
      setState((prev) => ({
        chats: [newChat, ...prev.chats],
        isCreatingNew: false,
      }));

      // Navigate to new chat
      navigate(`/dashboard/chats/${newChat._id}`);
    } catch (error) {
      console.error("Chat creation failed:", error);
      toast.error("Failed to create new chat");
      setState((prev) => ({ ...prev, isCreatingNew: false }));
    }
  };
  const formatChatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <aside className="w-64 bg-gray-900 p-4 border-r border-gray-800 flex flex-col">
      <button
        onClick={handleNewChat}
        disabled={state.isCreatingNew}
        className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg 
                   transition-colors disabled:opacity-70 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
      >
        {state.isCreatingNew ? (
          <>
            <Spinner size="sm" />
            Creating...
          </>
        ) : (
          "+ New Chat"
        )}
      </button>

      <div className="overflow-y-auto flex-1">
        {state.isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size="md" />
          </div>
        ) : state.chats.length > 0 ? (
          <ul className="space-y-1">
            {state.chats.map((chat) => (
              <li key={chat._id}>
                <Link
                  to={`/dashboard/chats/${chat._id}`}
                  className="block p-3 rounded-lg hover:bg-gray-800 transition-colors
                             group relative overflow-hidden"
                >
                  <p className="text-gray-300 truncate pr-8">
                    {chat.title || "New Chat"}
                  </p>
                  <time
                    className="text-xs text-gray-500 mt-1 block"
                    dateTime={chat.createdAt}
                  >
                    {formatChatDate(chat.createdAt)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-4 text-gray-500">
            No previous chats found
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
