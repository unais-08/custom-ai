import { useEffect, useRef, useState, React } from "react";
import { useParams } from "react-router-dom";
import model from "../libs/gemini";
import { Conversation } from "../components";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { initialMessage } = useParams();
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialMessage) {
      const decodedMessage = decodeURIComponent(initialMessage);
      handleInitialMessage(decodedMessage);
    }
  }, [initialMessage]);

  const handleInitialMessage = async (message) => {
    const userMessage = { role: "user", content: message };
    setMessages([userMessage]);
    await generateAIResponse(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    await generateAIResponse(input);
  };
  // AI response testing
  const generateGeminiResponse = async (prompt) => {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text(); // Return the actual response text
    } catch (error) {
      console.error("Generation error:", error);
      return "Sorry, I couldn't process that request. Please try again."; // Return error message
    }
  };

  const generateAIResponse = async (userInput) => {
    setIsLoading(true);

    try {
      // Get actual AI response
      const aiResponse = await generateGeminiResponse(userInput);

      // Add AI message to chat
      const aiMessage = {
        role: "assistant",
        content: aiResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Handle any unexpected errors
      const errorMessage = {
        role: "assistant",
        content: "An error occurred while generating the response.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Always remove loading state
    }
  };
  return (
    <div className="h-full flex flex-col bg-[#1a162b] text-gray-100">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500">
              Start a conversation
            </div>
          )}

          <Conversation messages={messages} />

          {isLoading && (
            <div className="flex justify-start">
              <div className="p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${dot * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-800 bg-[#1a162b]/50 backdrop-blur-lg">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-4 pr-14 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
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

export default ChatPage;
