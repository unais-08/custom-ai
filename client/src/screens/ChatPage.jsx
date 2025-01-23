import React from "react";

const ChatPage = () => {
  return (
    <div className="h-full flex flex-col bg-[#1a162b] text-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages would be rendered here */}
        <div className="text-center text-gray-500">
          Start a conversation or select a chat from the sidebar
        </div>
      </div>

      <div className="p-4 border-t border-gray-800">
        <form className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatPage;
