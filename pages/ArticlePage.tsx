import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getArticleById, getRelatedArticles } from "../services/articleService";
import { Article } from "../types";
import SEO from "../components/SEO";
import { Clock, User, ArrowLeft, Calendar, Loader2 } from "lucide-react";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getArticleById(id);
      setArticle(data);

      if (data) {
        const related = await getRelatedArticles(data.id, data.category);
        setRelatedArticles(related);
      }
      setLoading(false);
    };

    fetchData();
    // Scroll to top when changing articles
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <SEO
          title="Bài viết không tồn tại - Tinhocvanphong247"
          description="Không tìm thấy nội dung bạn yêu cầu."
        />
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Không tìm thấy bài viết
        </h2>
        <Link
          to="/"
          className="text-blue-600 hover:underline flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" /> Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 animate-fade-in">
      <SEO
        title={`${article.title} - Tinhocvanphong247`}
        description={article.excerpt}
        image={article.imageUrl}
        type="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Quay lại trang chủ
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white w-full">
              <div className="inline-block bg-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                {article.category}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm sm:text-base text-slate-200 gap-6">
                <span className="flex items-center">
                  <User size={18} className="mr-2" /> Tinhocvanphong247
                </span>
                <span className="flex items-center">
                  <Clock size={18} className="mr-2" /> {article.readTime} đọc
                </span>
                <span className="flex items-center">
                  <Calendar size={18} className="mr-2" /> {article.date}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 md:p-14">
            {/* Markdown Content Styling */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Related Articles Suggestion */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Bài viết liên quan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/article/${related.id}`}
                  className="group block bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all"
                >
                  <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2">
                    {related.title}
                  </h4>
                  <p className="text-slate-500 text-sm line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
