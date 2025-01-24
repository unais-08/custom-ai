import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import model from "../libs/gemini";
import { Conversation } from "../components";
import chatService from "../libs/chat_service";

const ChatPage = () => {
  const { user } = useUser();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  const [state, setState] = useState({
    messages: [],
    input: "",
    isGenerating: false,
    isLoadingChat: true,
  });

  // Destructure state for cleaner access
  const { messages, input, isGenerating, isLoadingChat } = state;

  // Scroll to bottom when messages change
  useEffect(() => {
    const scroll = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };

    // Add slight delay for smooth scroll
    const timeout = setTimeout(scroll, 50);
    return () => clearTimeout(timeout);
  }, [messages]);
  // Add this useEffect

  useEffect(() => {
    let isMounted = true;

    const loadChat = async () => {
      if (!chatId || !user) {
        if (isMounted) updateState({ messages: [], isLoadingChat: false });
        return;
      }

      try {
        updateState({ isLoadingChat: true });
        const chatDetails = await chatService.getChatDetails(chatId);
        console.log(chatDetails);
        if (isMounted) {
          updateState({
            messages: chatDetails.messages.map(mapMessage),
            isLoadingChat: false,
          });
        }
      } catch (error) {
        console.error("Failed to load chat:", error);
        if (isMounted) navigate("/dashboard/chats");
      }
    };
    loadChat();
    return () => {
      isMounted = false;
    };
  }, [chatId, user, navigate]);

  const mapMessage = (msg) => ({
    role: msg.role === "model" ? "assistant" : "user",
    content: msg.parts?.[0]?.text || "Empty message",
  });

  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const generateGeminiResponse = async (prompt) => {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Generation error:", error);
      return "Sorry, I couldn't process that request. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userInput = input.trim();
    let currentChat = chatId;

    try {
      updateState({ input: "", isGenerating: true });
      const newMessages = [...messages, { role: "user", content: userInput }];
      updateState({ messages: newMessages });

      // Create new chat if needed
      if (!currentChat) {
        const newChat = await chatService.createChat(user.id, userInput);
        currentChat = newChat._id;
        navigate(`/dashboard/chats/${newChat._id}`);
      }

      // Save user message
      await chatService.addMessageToChat(currentChat, {
        role: "user",
        text: userInput,
      });

      // Generate AI response
      const aiResponse = await generateGeminiResponse(userInput);
      const aiMessage = { role: "assistant", content: aiResponse };

      // Update UI and save AI response
      updateState({ messages: [...newMessages, aiMessage] });
      await chatService.addMessageToChat(currentChat, {
        role: "model",
        text: aiResponse,
      });
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "⚠️ Failed to process your request. Please try again.",
      };
      updateState({ messages: [...messages, errorMessage] });
    } finally {
      updateState({ isGenerating: false });
    }
  };

  const renderLoadingIndicator = () => (
    <div className="flex justify-start animate-fade-in">
      <div className="p-4 bg-gray-800 rounded-xl">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center text-gray-500">
      {messages.length === 0 && !isGenerating && "Start a conversation"}
    </div>
  );

  return (
    <div className="h-full flex bg-[#1a162b] text-gray-100">
      <div className="flex-1 flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            {isLoadingChat ? (
              <div className="text-center text-gray-500 animate-pulse">
                Loading chat history...
              </div>
            ) : (
              <>
                {renderEmptyState()}
                <Conversation messages={messages} />
                {isGenerating && renderLoadingIndicator()}
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 bg-[#1a162b]/50 backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => updateState({ input: e.target.value })}
                placeholder="Type your message..."
                className="w-full p-4 pr-14 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all disabled:opacity-75"
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-75 disabled:hover:bg-blue-600"
                aria-label="Send message"
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
    </div>
  );
};

export default ChatPage;
