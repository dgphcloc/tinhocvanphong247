import React, { useEffect, useState } from 'react';
import { getDashboardStats, deleteArticle, createArticle, updateArticle, DashboardStats } from '../services/articleService';
import { Article, Category } from '../types';
import SEO from '../components/SEO';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Eye, 
  Plus, 
  Trash2, 
  Edit, 
  BarChart3, 
  LogOut,
  Search,
  Loader2,
  TrendingUp,
  MessageSquare,
  Users,
  Bell,
  MoreVertical,
  Clock,
  Sparkles,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'ai'>('overview');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: Category.EXCEL,
    author: '',
    imageUrl: '',
    readTime: ''
  });

  const fetchStats = async () => {
    // Don't set full loading on refresh to avoid flickering entire page
    if (!stats) setLoading(true);
    const data = await getDashboardStats();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      const success = await deleteArticle(id);
      if (success) {
        fetchStats(); 
      } else {
        alert('Lỗi khi xóa bài viết');
      }
    }
  };

  const openCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: Category.EXCEL,
      author: 'Admin',
      imageUrl: 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 100),
      readTime: '5 phút'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      imageUrl: article.imageUrl,
      readTime: article.readTime
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingArticle) {
        // Update existing
        await updateArticle({
          ...editingArticle,
          ...formData
        });
      } else {
        // Create new
        await createArticle({
          ...formData
        });
      }
      // Refresh data
      await fetchStats();
      setIsModalOpen(false);
    } catch (error) {
      alert("Đã xảy ra lỗi khi lưu bài viết.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  const filteredArticles = stats?.recentArticles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans relative">
      <SEO title="Dashboard - Quản trị Tinhocvanphong247" description="Trang quản trị hệ thống" />

      {/* Sidebar - Enhanced */}
      <aside className="w-72 bg-slate-900 text-slate-300 hidden lg:flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
             <LayoutDashboard size={22} />
          </div>
          <div>
            <span className="block text-white font-bold text-lg tracking-tight">Admin Portal</span>
            <span className="block text-xs text-slate-500 uppercase tracking-widest">v2.1.0</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <BarChart3 size={20} className={activeTab === 'overview' ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
            <span className="font-medium">Tổng quan</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'articles' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText size={20} className={activeTab === 'articles' ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
            <span className="font-medium">Bài viết</span>
            <span className="ml-auto bg-slate-700 text-xs px-2 py-0.5 rounded-full text-slate-300 group-hover:bg-slate-600">
               {stats?.totalArticles}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === 'ai' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}
          >
             <Sparkles size={20} className={activeTab === 'ai' ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
             <span className="font-medium">Thống kê AI</span>
          </button>

           <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-8">System</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 group">
            <Settings size={20} className="text-slate-400 group-hover:text-white" />
            <span className="font-medium">Cài đặt</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Thoát & Về trang chủ</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4 lg:hidden">
                 <Link to="/" className="text-slate-800 font-bold">Admin</Link>
             </div>
             
             <div className="hidden lg:flex items-center text-slate-400 text-sm">
                 <span>Hôm nay: {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
             </div>

             <div className="flex items-center gap-6">
                 <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
                     <Bell size={20} />
                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                 </button>
                 <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                     <div className="text-right hidden sm:block">
                         <p className="text-sm font-bold text-slate-800">Admin User</p>
                         <p className="text-xs text-slate-500">Super Administrator</p>
                     </div>
                     <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                         <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Admin" />
                     </div>
                 </div>
             </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          <div className="flex justify-between items-end mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {activeTab === 'overview' ? 'Tổng quan hệ thống' : activeTab === 'articles' ? 'Quản lý nội dung' : 'Hiệu suất AI'}
                </h1>
                <p className="text-slate-500">Chào mừng trở lại, đây là những gì đang diễn ra hôm nay.</p>
            </div>
            {activeTab === 'articles' && (
                <button 
                  onClick={openCreateModal}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 font-medium"
                >
                <Plus size={20} />
                <span>Viết bài mới</span>
                </button>
            )}
          </div>

          {/* DASHBOARD CONTENT */}
          
          {activeTab === 'overview' && stats && (
            <div className="space-y-8 animate-fade-in">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                 <StatCard 
                    title="Tổng lượt xem" 
                    value={stats.totalViews.toLocaleString()} 
                    trend="+12.5%" 
                    icon={<Eye size={24} />} 
                    color="blue"
                 />
                 <StatCard 
                    title="Bài viết đã đăng" 
                    value={stats.totalArticles} 
                    trend="+2 tuần này" 
                    icon={<FileText size={24} />} 
                    color="green"
                 />
                 <StatCard 
                    title="Câu hỏi AI" 
                    value={stats.totalAiQueries.toLocaleString()} 
                    trend="+8.2%" 
                    icon={<MessageSquare size={24} />} 
                    color="purple"
                 />
                 <StatCard 
                    title="Người dùng Active" 
                    value="1,204" 
                    trend="+3.1%" 
                    icon={<Users size={24} />} 
                    color="orange"
                 />
              </div>

              {/* Main Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Chart */}
                 <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Lượt truy cập tuần qua</h3>
                        <select className="bg-slate-50 border-none text-sm text-slate-500 rounded-lg p-2 focus:ring-0 cursor-pointer">
                            <option>7 ngày qua</option>
                            <option>30 ngày qua</option>
                        </select>
                    </div>
                    {/* CSS Only Bar Chart */}
                    <div className="h-64 flex items-end justify-between gap-4 pt-4">
                         {stats.chartData.map((item, idx) => {
                             const max = Math.max(...stats.chartData.map(d => d.views));
                             const height = `${(item.views / max) * 100}%`;
                             return (
                                 <div key={idx} className="flex-1 flex flex-col items-center group">
                                     <div className="relative w-full bg-blue-50 rounded-t-lg overflow-hidden flex items-end h-full group-hover:bg-blue-100 transition-colors">
                                         <div 
                                            style={{ height }} 
                                            className="w-full bg-blue-500 rounded-t-md opacity-80 group-hover:opacity-100 transition-all relative"
                                         >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                {item.views} views
                                            </div>
                                         </div>
                                     </div>
                                     <span className="text-xs text-slate-500 mt-3 font-medium">{item.day}</span>
                                 </div>
                             )
                         })}
                    </div>
                 </div>

                 {/* Recent Activity Feed */}
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Hoạt động gần đây</h3>
                    <div className="space-y-6">
                        {stats.recentActivity.map((activity) => (
                            <div key={activity.id} className="flex gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm
                                    ${activity.type === 'comment' ? 'bg-blue-100 text-blue-600' : 
                                      activity.type === 'system' ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-600'}`}>
                                    {activity.type === 'comment' ? <MessageSquare size={14}/> : 
                                     activity.type === 'system' ? <Settings size={14}/> : <FileText size={14}/>}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-800 font-medium">
                                        <span className="font-bold">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1 flex items-center">
                                        <Clock size={12} className="mr-1" /> {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                        Xem tất cả hoạt động
                    </button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
                {/* Table Toolbar */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tiêu đề, tác giả..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        />
                        <Search size={18} className="absolute left-3 top-3 text-slate-400" />
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                            Lọc
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Bài viết</th>
                        <th className="px-6 py-4">Trạng thái</th>
                        <th className="px-6 py-4">Danh mục</th>
                        <th className="px-6 py-4">Lượt xem</th>
                        <th className="px-6 py-4">Ngày đăng</th>
                        <th className="px-6 py-4 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filteredArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                                    <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]" title={article.title}>
                                        {article.title}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">ID: #{article.id} • {article.author}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                Published
                             </span>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium
                            ${article.category === 'Excel' ? 'bg-green-50 text-green-700 border border-green-100' : 
                                article.category === 'Word' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
                                article.category === 'PowerPoint' ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-slate-100 text-slate-700'
                            }`}>
                            {article.category}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600">
                            {(Math.floor(Math.random() * 5000) + 100).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                            {article.date}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => openEditModal(article)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                title="Chỉnh sửa"
                            >
                                <Edit size={16} />
                            </button>
                            <button 
                                onClick={() => handleDelete(article.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                title="Xóa"
                            >
                                <Trash2 size={16} />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                
                {filteredArticles.length === 0 && (
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Search size={24}/>
                    </div>
                    <h3 className="text-slate-800 font-medium mb-1">Không tìm thấy kết quả</h3>
                    <p className="text-slate-500 text-sm">Thử tìm kiếm với từ khóa khác.</p>
                </div>
                )}
            </div>
          )}

           {activeTab === 'ai' && (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center animate-fade-in">
                   <div className="inline-block p-4 bg-purple-100 text-purple-600 rounded-2xl mb-4">
                       <Sparkles size={40} />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-800 mb-2">Tính năng đang phát triển</h2>
                   <p className="text-slate-500 max-w-md mx-auto">
                       Bảng điều khiển chi tiết về hiệu suất AI (thời gian phản hồi, độ hài lòng, chủ đề phổ biến) sẽ sớm ra mắt.
                   </p>
               </div>
           )}
        </div>
      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-20">
              <h2 className="text-xl font-bold text-slate-800">
                {editingArticle ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Tiêu đề bài viết</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Nhập tiêu đề..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Danh mục</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as Category})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={Category.EXCEL}>Excel</option>
                    <option value={Category.WORD}>Word</option>
                    <option value={Category.POWERPOINT}>PowerPoint</option>
                    <option value={Category.GENERAL}>Thủ thuật chung</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Tác giả</label>
                  <input 
                    type="text" 
                    required
                    value={formData.author}
                    onChange={e => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Tên tác giả"
                  />
                </div>
                 <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Thời gian đọc</label>
                  <input 
                    type="text" 
                    required
                    value={formData.readTime}
                    onChange={e => setFormData({...formData, readTime: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="VD: 5 phút"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Ảnh đại diện (URL)</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                     <ImageIcon size={18} className="absolute left-3 top-2.5 text-slate-400" />
                     <input 
                      type="text" 
                      required
                      value={formData.imageUrl}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                {formData.imageUrl && (
                  <div className="h-32 w-full rounded-lg bg-slate-100 overflow-hidden border border-slate-200 mt-2">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL')} />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Mô tả ngắn (Excerpt)</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Tóm tắt nội dung bài viết..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Nội dung (Markdown Supported)</label>
                <textarea 
                  required
                  rows={8}
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  placeholder="# Tiêu đề bài viết&#10;&#10;Nội dung bài viết..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
                  {isSubmitting ? 'Đang lưu...' : 'Lưu bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Components ---

interface StatCardProps {
    title: string;
    value: number | string;
    trend: string;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600',
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">
                    <TrendingUp size={14} className="mr-1" />
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
            </div>
        </div>
    );
};

export default Dashboard;