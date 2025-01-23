import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

const Conversation = ({ messages }) => {
  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          } mb-4 px-4`}
        >
          <div
            className={`relative max-w-[90%] md:max-w-[80%] lg:max-w-[70%] p-4 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-gray-800 text-gray-100 rounded-bl-sm"
            }`}
          >
            {/* Speech bubble notch */}
            <div
              className={`absolute bottom-0 w-3 h-3 ${
                msg.role === "user"
                  ? "bg-blue-600 right-0 -mr-[1px] origin-bottom-right rotate-45"
                  : "bg-gray-800 left-0 -ml-[1px] origin-bottom-left -rotate-45"
              }`}
            />

            <ReactMarkdown
              className={`prose dark:prose-invert ${
                msg.role === "user" ? "text-white" : "text-gray-100"
              } text-base leading-relaxed`}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const content = String(children).replace(/\n$/, "");

                  return !inline && match ? (
                    <div className="relative">
                      <div className="flex justify-between items-center bg-gray-700/50 px-4 py-1 text-xs">
                        <span className="font-mono">{match[1]}</span>
                        <button
                          className="hover:text-gray-300 transition-colors"
                          onClick={() => navigator.clipboard.writeText(content)}
                        >
                          Copy
                        </button>
                      </div>
                      <SyntaxHighlighter
                        language={match[1]}
                        style={vscDarkPlus}
                        PreTag="div"
                        className="p-4 rounded-b overflow-x-auto"
                        wrapLongLines
                      >
                        {content}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className={`${className} px-1.5 py-0.5 rounded-md bg-opacity-25 ${
                        msg.role === "user"
                          ? "bg-gray-100/25"
                          : "bg-gray-300/25"
                      }`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};

export default Conversation;
