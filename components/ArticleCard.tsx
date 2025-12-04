import React from "react";
import { Article } from "../types";
import { Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden group">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {article.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-slate-500 text-xs mb-3 space-x-4">
          <span className="flex items-center">
            <User size={14} className="mr-1" />
            Tinhocvanphong247
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1" />
            {article.readTime}
          </span>
        </div>

        <Link to={`/article/${article.id}`} className="block mb-3">
          <h3 className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <Link
          to={`/article/${article.id}`}
          className="inline-flex items-center text-blue-600 font-semibold text-sm hover:underline mt-auto"
        >
          Đọc tiếp <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
