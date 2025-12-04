import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticlesByCategory } from '../services/articleService';
import { Category, Article, SortOption } from '../types';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import { Folder, Loader2, Filter } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Sort States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Map URL param to Enum
  let categoryEnum: Category | undefined;
  if (categoryId === 'excel') categoryEnum = Category.EXCEL;
  else if (categoryId === 'word') categoryEnum = Category.WORD;
  else if (categoryId === 'powerpoint') categoryEnum = Category.POWERPOINT;
  else categoryEnum = Category.GENERAL;

  useEffect(() => {
    // Reset page when category changes
    setCurrentPage(1);
    setSortBy('newest');
  }, [categoryEnum]);

  useEffect(() => {
    const fetchArticles = async () => {
        if (!categoryEnum) return;
        setLoading(true);
        const { articles, totalPages } = await getArticlesByCategory(categoryEnum, currentPage, 6, sortBy);
        setArticles(articles);
        setTotalPages(totalPages);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    fetchArticles();
  }, [categoryEnum, currentPage, sortBy]);

  const getCategoryTitle = () => {
      switch(categoryId) {
          case 'excel': return 'Thủ thuật Excel';
          case 'word': return 'Thủ thuật Word';
          case 'powerpoint': return 'Thủ thuật PowerPoint';
          default: return 'Tin học văn phòng';
      }
  };

  const getCategoryDescription = () => {
    switch(categoryId) {
      case 'excel': return 'Tổng hợp các hàm Excel thông dụng, cách xử lý dữ liệu, vẽ biểu đồ và tự động hóa trong Excel.';
      case 'word': return 'Hướng dẫn trình bày văn bản chuẩn, trộn thư (Mail Merge), tạo mục lục tự động và các mẹo soạn thảo nhanh.';
      case 'powerpoint': return 'Kỹ năng thiết kế Slide thuyết trình chuyên nghiệp, hiệu ứng đẹp mắt và tư duy trình bày ấn tượng.';
      default: return 'Tổng hợp kiến thức tin học văn phòng hữu ích.';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <SEO 
        title={`${getCategoryTitle()} - Tinhocvanphong247`}
        description={getCategoryDescription()}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Folder size={24} />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-slate-800">{getCategoryTitle()}</h1>
                <p className="text-slate-500">Tổng hợp các bài viết hay nhất về {getCategoryTitle()}</p>
            </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-2">
            <Filter size={18} className="text-slate-400" />
            <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none cursor-pointer"
            >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
            </select>
        </div>
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
          <p className="text-slate-500 text-lg">Chưa có bài viết nào trong mục này.</p>
          <Link to="/" className="text-blue-600 font-medium hover:underline mt-2 inline-block">
            Quay về trang chủ
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;