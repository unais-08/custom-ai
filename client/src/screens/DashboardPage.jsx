import React from "react";

const DashboardPage = () => {
  function handleSubmit(e) {
    // Add your code here
    e.preventDefault();
    console.log("Form Submitted");
  }
  return (
    <div className="flex flex-col items-center h-full">
      {/* Texts Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-1/2 gap-12 md:w-full md:px-4">
        {/* Logo */}
        <div className="flex items-center gap-5 opacity-20">
          <img src="/logo.png" alt="Logo" className="w-16 h-16" />
          <h1 className="text-6xl bg-gradient-to-r from-blue-600 to-rose-500 text-transparent bg-clip-text">
            LAMA AI
          </h1>
        </div>

        {/* Options */}
        <div className="flex w-full justify-between gap-12 md:flex-col">
          {[
            { icon: "/chat.png", text: "Create a New Chat" },
            { icon: "/image.png", text: "Analyze Images" },
            { icon: "/code.png", text: "Help me with my Code" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2.5 p-5 border border-gray-600 rounded-xl flex-1 hover:bg-gray-800 transition-colors"
            >
              <img
                src={item.icon}
                alt={item.text}
                className="w-10 h-10 object-cover"
              />
              <span className="text-sm font-light">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="mt-auto w-1/2 bg-gray-800 rounded-xl md:w-full">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center justify-between gap-5 p-4"
        >
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            className="bg-transparent border-none outline-none flex-1 p-5 text-gray-100 placeholder-gray-400 text-lg"
          />
          <button
            type="submit"
            className="bg-gray-700 rounded-full p-2.5 hover:bg-blue-600 transition-colors"
          >
            <img src="/arrow.png" alt="Submit" className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
