// DashboardPage.jsx
const DashboardPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8 opacity-75">
          <img
            src="/logo.png"
            alt="LAMA AI Logo"
            className="w-16 h-16 mb-4 filter brightness-125"
          />
          <h1 className="text-3xl md:text-4xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How can I help you today?
          </h1>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          {[
            { icon: "💬", title: "New Chat", desc: "Start a new conversation" },
            {
              icon: "🖼️",
              title: "Image Analysis",
              desc: "Upload and analyze images",
            },
            { icon: "💻", title: "Code Help", desc: "Get coding assistance" },
            {
              icon: "📚",
              title: "Knowledge Base",
              desc: "Explore documentation",
            },
          ].map((item, index) => (
            <button
              key={index}
              className="p-4 text-left rounded-xl bg-gray-800 hover:bg-gray-700/50 transition-all border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-gray-100 font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Container */}
      <div className="mt-8 w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Message LAMA AI..."
            className="w-full p-4 pr-14 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
export default DashboardPage;
