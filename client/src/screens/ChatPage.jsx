import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import model from "../libs/gemini";
import { Conversation } from "../components";
import chatService from "../libs/chat_service";
import { toast } from "react-toastify";

const ChatPage = () => {
  const { user } = useUser();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const isMountedRef = useRef(true);

  const [state, setState] = useState({
    messages: [],
    input: "",
    isGenerating: false,
    isLoadingChat: true,
  });

  const { messages, input, isGenerating, isLoadingChat } = state;

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const scrollToBottom = () => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };

      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  // Load chat history
  const loadChat = useCallback(async () => {
    if (!chatId || !user) return;

    try {
      setState((prev) => ({ ...prev, isLoadingChat: true }));

      const chatDetails = await chatService.getChatDetails(chatId);

      if (isMountedRef.current) {
        setState((prev) => ({
          ...prev,
          messages: chatDetails.messages.map(mapMessage),
          isLoadingChat: false,
        }));
      }
    } catch (error) {
      console.error("Failed to load chat:", error);
      toast.error("Failed to load chat history");
      navigate("/dashboard/chats");
    }
  }, [chatId, user, navigate]);

  // Trigger chat load on chatId or user change
  useEffect(() => {
    isMountedRef.current = true;
    loadChat();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadChat]);

  const mapMessage = (msg) => ({
    role: msg.role === "model" ? "assistant" : "user",
    content: msg.parts?.[0]?.text || "Empty message",
  });

  const generateGeminiResponse = async (prompt) => {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate response");
      return "Sorry, I couldn't process that request. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userInput = input.trim();
    let currentChat = chatId;

    try {
      // Clear input and show loading state
      setState((prev) => ({
        ...prev,
        input: "",
        isGenerating: true,
        messages: [...prev.messages, { role: "user", content: userInput }],
      }));

      let newChatId = currentChat;

      // Create new chat if needed
      if (!currentChat) {
        const newChat = await chatService.createChat(user.id, userInput);
        newChatId = newChat._id;
        navigate(`/dashboard/chats/${newChatId}`);
      }

      // Save user message to backend
      if (currentChat) {
        await chatService.addMessageToChat(currentChat, {
          role: "user",
          text: userInput,
        });
      }

      // Generate AI response
      const aiResponse = await generateGeminiResponse(userInput);

      // Update UI with AI response
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "assistant", content: aiResponse },
        ],
      }));

      // Save AI response to backend
      await chatService.addMessageToChat(newChatId, {
        role: "model",
        text: aiResponse,
      });

      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message");

      // Rollback optimistic updates
      setState((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg.content !== userInput),
        input: userInput,
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        isGenerating: false,
      }));
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
                onChange={(e) =>
                  setState((prev) => ({ ...prev, input: e.target.value }))
                }
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
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
