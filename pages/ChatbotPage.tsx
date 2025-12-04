import React, { useState, useRef, useEffect } from "react";
import SEO from "../components/SEO";
import { getGeminiResponse } from "../services/geminiService";
import { getAllArticlesContext } from "../services/articleService";
import {
  checkRateLimit,
  recordRequest,
  getRemainingQuota,
} from "../services/rateLimitService";
import { ChatMessage } from "../types";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  RefreshCw,
  Trash2,
  Zap,
  AlertTriangle,
  Lock,
} from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "Cách dùng hàm VLOOKUP trong Excel?",
  "Làm sao để tạo mục lục tự động trong Word?",
  "Phím tắt để tính tổng nhanh là gì?",
  "Mẹo thiết kế slide PowerPoint đẹp?",
  "Cách trộn thư (Mail Merge) như thế nào?",
];

const ChatbotPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Chào bạn! Tôi là **Tinhocvanphong247 AI**. Tôi đã học toàn bộ nội dung trên blog để hỗ trợ bạn tốt nhất. \n\nBạn cần giúp gì về Excel, Word hay PowerPoint hôm nay?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [contextData, setContextData] = useState<string>("");
  const [remainingQuota, setRemainingQuota] = useState<number>(5);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load context and quota on mount
  useEffect(() => {
    const loadData = async () => {
      const context = await getAllArticlesContext();
      setContextData(context);
      setRemainingQuota(getRemainingQuota());
    };
    loadData();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    // 1. Check Rate Limit
    const { allowed, resetInMinutes } = checkRateLimit();

    if (!allowed) {
      const limitMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "model",
        text: `⚠️ **Hết lượt miễn phí**\n\nBạn đã sử dụng hết lượt chat miễn phí (5 câu/30 phút). Vui lòng quay lại sau **${resetInMinutes} phút** nữa nhé!\n\nTrong lúc chờ đợi, bạn có thể tham khảo các bài viết trên Blog.`,
        isError: true,
      };
      // Add user message first so they know what they sent
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() - 1).toString(), role: "user", text: text.trim() },
        limitMessage,
      ]);
      setInput("");
      return;
    }

    // 2. Proceed if allowed
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(
        userMessage.text,
        contextData
      );

      // Record usage only on success/attempt
      const newQuota = recordRequest();
      setRemainingQuota(newQuota);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: responseText,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại.",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm("Bạn có chắc muốn xóa lịch sử chat?")) {
      setMessages([messages[0]]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 animate-fade-in">
      <SEO
        title="AI Trợ lý - Tinhocvanphong247"
        description="Chat trực tiếp với AI để giải đáp thắc mắc về tin học văn phòng nhanh chóng."
      />

      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col p-4 sm:p-6">
        {/* Header Section */}
        <div className="bg-white rounded-t-2xl p-6 border border-slate-200 border-b-0 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Sparkles
                size={24}
                fill="currentColor"
                className="text-yellow-300 animate-pulse"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Tinhocvanphong247 AI
              </h1>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-slate-500 flex items-center">
                  <Zap
                    size={12}
                    className="mr-1 text-yellow-500"
                    fill="currentColor"
                  />
                  Dữ liệu Blog
                </span>
                <span
                  className={`flex items-center font-medium ${
                    remainingQuota > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {remainingQuota > 0 ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>{" "}
                      Còn {remainingQuota} lượt
                    </>
                  ) : (
                    <>
                      <Lock size={12} className="mr-1" /> Hết lượt
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
            title="Xóa lịch sử chat"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white border border-slate-200 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {messages.length === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-left p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-sm text-slate-700 font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start max-w-[90%] sm:max-w-[80%] ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    msg.role === "user"
                      ? "bg-slate-200 text-slate-600 ml-3"
                      : "bg-purple-100 text-purple-600 mr-3"
                  }`}
                >
                  {msg.role === "user" ? <User size={16} /> : <Bot size={18} />}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-5 py-4 text-base leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none"
                  } ${
                    msg.isError ? "bg-red-50 border-red-200 text-slate-800" : ""
                  }`}
                >
                  {msg.isError && (
                    <div className="flex items-center text-red-600 font-bold mb-2 text-sm">
                      <AlertTriangle size={16} className="mr-1" />
                      Thông báo hệ thống
                    </div>
                  )}
                  {msg.role === "model" ? (
                    <div className="markdown-body prose prose-sm prose-slate max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center ml-11 space-x-2 bg-slate-50 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100">
                <Loader2 size={18} className="animate-spin text-purple-600" />
                <span className="text-sm text-slate-500 font-medium">
                  AI đang tìm câu trả lời...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border border-slate-200 border-t-0 rounded-b-2xl">
          {remainingQuota === 0 && !isLoading && (
            <div className="mb-3 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg flex items-center justify-center border border-yellow-200">
              <Lock size={16} className="mr-2" />
              Bạn đã hết lượt chat miễn phí. Vui lòng quay lại sau .
            </div>
          )}
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={remainingQuota === 0 || isLoading}
              placeholder={
                remainingQuota === 0
                  ? "Vui lòng chờ reset lượt chat..."
                  : "Nhập câu hỏi của bạn tại đây..."
              }
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400 shadow-inner disabled:bg-slate-100 disabled:cursor-not-allowed"
              autoFocus
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading || remainingQuota === 0}
              className="absolute right-3 p-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
