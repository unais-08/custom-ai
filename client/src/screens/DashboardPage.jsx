import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: "💬",
      title: "New Chat",
      action: () => navigate("/chat/new"),
    },
    {
      icon: "🖼️",
      title: "Image Analysis",
      action: () => navigate("/image-analysis"),
    },
    {
      icon: "💻",
      title: "Code Assistant",
      action: () => navigate("/code-help"),
    },
    {
      icon: "📚",
      title: "Knowledge Base",
      action: () => navigate("/knowledge"),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(input);
    if (input.trim()) {
      // Navigate to a new chat with the initial message
      // const newChatId = `chat-${Date.now()}`;
      // navigate(
      //   `/chat/${newChatId}?initialMessage=${encodeURIComponent(input)}`
      // );
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1a162b]">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="AI Assistant Logo"
            className="w-20 h-20 mx-auto mb-4 filter brightness-125"
          />
          <h1 className="text-4xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How can I help you today?
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors flex items-center gap-3"
            >
              <span className="text-2xl">{action.icon}</span>
              <span>{action.title}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start a conversation..."
              className="w-full p-4 pr-14 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
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
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DashboardPage;
