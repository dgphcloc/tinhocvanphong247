import React, { useEffect, useState } from 'react';
import { getPaginatedArticles } from '../services/articleService';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import Hero3D from '../components/Hero3D';
import { Sparkles, Loader2, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { articles, totalPages } = await getPaginatedArticles(currentPage, 6);
      setLatestArticles(articles);
      setTotalPages(totalPages);
      setLoading(false);
      
      // Only scroll to latest section if we are paginating (not initial load)
      if (currentPage > 1) {
        const element = document.getElementById('latest');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    fetchArticles();
  }, [currentPage]);

  return (
    <div className="animate-fade-in">
      <SEO 
        title="Tinhocvanphong247 - Kiến thức Tin học Văn phòng, Excel, Word" 
        description="Blog chuyên chia sẻ kiến thức, thủ thuật Excel, Word, PowerPoint và tin học văn phòng hữu ích. Giúp bạn nâng cao hiệu suất làm việc mỗi ngày."
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background blobs for depth */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm shadow-sm hover:bg-blue-500/20 transition-colors">
                <Sparkles size={16} className="mr-2 text-yellow-300" />
                Kiến thức miễn phí mỗi ngày
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
                Làm chủ <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 animate-gradient">
                  Tin học Văn phòng
                </span>
              </h1>
              
              <p className="max-w-2xl mx-auto lg:mx-0 text-lg text-slate-300 mb-8 leading-relaxed">
                Nơi tổng hợp các thủ thuật Excel, Word, PowerPoint "thực chiến" nhất.
                Giúp bạn xử lý công việc nhanh gấp đôi và trở nên chuyên nghiệp hơn trong mắt đồng nghiệp.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                 <a href="#latest" className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1">
                   <BookOpen size={20} className="mr-2" />
                   Xem bài viết mới
                 </a>
                 <Link to="/chatbot" className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10 hover:border-white/30">
                   <Sparkles size={20} className="mr-2 text-purple-300" />
                   Hỏi AI trợ giúp
                 </Link>
              </div>
            </div>

            {/* Right Column: 3D Animation */}
            <div className="relative z-10 flex justify-center lg:justify-end mt-10 lg:mt-0">
               <Hero3D />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Teaser */}
      <div className="bg-slate-50 border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Excel */}
                <Link to="/category/excel" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center hover:border-green-500 hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1">
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-inner">
                        <span className="font-bold text-lg">X</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-green-600 transition-colors">Excel</h3>
                        <p className="text-sm text-slate-500">Hàm & xử lý dữ liệu</p>
                    </div>
                </Link>
                 {/* Word */}
                 <Link to="/category/word" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-inner">
                        <span className="font-bold text-lg">W</span>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Word</h3>
                        <p className="text-sm text-slate-500">Soạn thảo văn bản</p>
                    </div>
                </Link>
                 {/* PowerPoint */}
                 <Link to="/category/powerpoint" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center hover:border-orange-500 hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1">
                    <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-inner">
                        <span className="font-bold text-lg">P</span>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">PowerPoint</h3>
                        <p className="text-sm text-slate-500">Thiết kế slide</p>
                    </div>
                </Link>
            </div>
        </div>
      </div>

      {/* Latest Articles */}
      <div id="latest" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-800">Bài viết mới nhất</h2>
          </div>
          <Link to="/search" className="hidden sm:flex items-center text-blue-600 font-medium hover:underline text-sm">
             Xem tất cả <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
             <Loader2 size={40} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
