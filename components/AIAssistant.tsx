import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const AIAssistant: React.FC = () => {
  return (
    <Link
      to="/chatbot"
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 flex items-center gap-2 group"
      aria-label="Chat with AI"
    >
      <div className="relative">
        <Sparkles size={24} className="animate-pulse text-yellow-300" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
      <span className="font-bold whitespace-nowrap overflow-hidden transition-all">
        Hỏi AI Ngay
      </span>
    </Link>
  );
};

export default AIAssistant;