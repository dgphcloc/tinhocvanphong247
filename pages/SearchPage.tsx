import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchArticles } from '../services/articleService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import { Search, Loader2, FileQuestion } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const { articles, total, totalPages } = await searchArticles(query, currentPage, 6);
      setArticles(articles);
      setTotalPages(totalPages);
      setTotalResults(total);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (query) {
        performSearch();
    } else {
        setLoading(false);
    }
  }, [query, currentPage]);

  // Reset page if query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Kết quả tìm kiếm
        </h1>
        <p className="text-slate-500 flex items-center justify-center">
            <Search size={16} className="mr-2" />
            Từ khóa: "<span className="font-semibold text-slate-700">{query}</span>" 
            {totalResults > 0 && <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">{totalResults} kết quả</span>}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
            <Loader2 size={40} className="animate-spin text-blue-600" />
        </div>
      ) : articles.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
            </div>

            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4 text-slate-400">
            <FileQuestion size={32} />
          </div>
          <p className="text-slate-600 text-lg font-medium mb-2">Không tìm thấy bài viết nào.</p>
          <p className="text-slate-500 mb-6">Thử tìm kiếm với từ khóa khác hoặc quay lại trang chủ.</p>
          <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Về trang chủ
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;