import { supabase } from './supabaseClient';
import { Article, Category, PaginatedResult, SortOption } from '../types';
import { ARTICLES as MOCK_ARTICLES } from '../constants';

const mapToArticle = (row: any): Article => ({
  id: row.id.toString(),
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  content: row.content,
  category: row.category as Category,
  author: row.author,
  date: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : row.date, 
  imageUrl: row.image_url,
  readTime: row.read_time
});

// Helper to generate slug
const generateSlug = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

// Changed from getLatestArticles to getPaginatedArticles to support Home page pagination
export const getPaginatedArticles = async (page: number = 1, limit: number = 6): Promise<PaginatedResult> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  if (!supabase) {
    const total = MOCK_ARTICLES.length;
    const paginated = MOCK_ARTICLES.slice(from, from + limit);
    return Promise.resolve({
        articles: paginated,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });
  }
  
  try {
    const { data, count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    
    return {
        articles: data ? data.map(mapToArticle) : [],
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit)
    };
  } catch (err) {
    // Fallback to mock data on error
    const total = MOCK_ARTICLES.length;
    return {
        articles: MOCK_ARTICLES.slice(0, limit),
        total,
        page: 1,
        totalPages: Math.ceil(total / limit)
    };
  }
};

export const getArticlesByCategory = async (
  category: Category, 
  page: number = 1, 
  limit: number = 6,
  sort: SortOption = 'newest'
): Promise<PaginatedResult> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const ascending = sort === 'oldest';

  if (!supabase) {
    // Filter Mock Data
    let filtered = MOCK_ARTICLES.filter(a => a.category === category);
    
    // Sort
    filtered.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });

    const total = filtered.length;
    const paginated = filtered.slice(from, from + limit);

    return Promise.resolve({
        articles: paginated,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });
  }

  try {
    const { data, count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('category', category)
      .order('created_at', { ascending })
      .range(from, to);

    if (error) throw error;

    return {
        articles: data ? data.map(mapToArticle) : [],
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit)
    };
  } catch (err) {
    console.warn("Error fetching category, using mock fallback");
    let filtered = MOCK_ARTICLES.filter(a => a.category === category);
    const total = filtered.length;
    return {
        articles: filtered.slice(0, limit),
        total,
        page: 1,
        totalPages: Math.ceil(total / limit)
    };
  }
};

export const searchArticles = async (
    query: string,
    page: number = 1,
    limit: number = 6
): Promise<PaginatedResult> => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    if (!supabase) {
        const lowerQuery = query.toLowerCase();
        const filtered = MOCK_ARTICLES.filter(a => 
            a.title.toLowerCase().includes(lowerQuery) || 
            a.excerpt.toLowerCase().includes(lowerQuery)
        );
        const total = filtered.length;
        return Promise.resolve({
            articles: filtered.slice(from, from + limit),
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }

    try {
        const { data, count, error } = await supabase
            .from('articles')
            .select('*', { count: 'exact' })
            .ilike('title', `%${query}%`) // Case-insensitive search on title
            .range(from, to);

        if (error) throw error;

        return {
            articles: data ? data.map(mapToArticle) : [],
            total: count || 0,
            page,
            totalPages: Math.ceil((count || 0) / limit)
        };
    } catch (err) {
        return { articles: [], total: 0, page: 1, totalPages: 0 };
    }
}

export const getArticleById = async (id: string): Promise<Article | undefined> => {
  if (!supabase) {
    return Promise.resolve(MOCK_ARTICLES.find(a => a.id === id));
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return MOCK_ARTICLES.find(a => a.id === id);
    return data ? mapToArticle(data) : undefined;
  } catch (err) {
    return MOCK_ARTICLES.find(a => a.id === id);
  }
};

export const getRelatedArticles = async (currentId: string, category: Category, limit = 2): Promise<Article[]> => {
    if (!supabase) {
        return Promise.resolve(
            MOCK_ARTICLES.filter(a => a.category === category && a.id !== currentId).slice(0, limit)
        );
    }

    try {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('category', category)
            .neq('id', currentId)
            .limit(limit);
        
        if (error) return MOCK_ARTICLES.filter(a => a.category === category && a.id !== currentId).slice(0, limit);

        return data ? data.map(mapToArticle) : [];
    } catch {
        return MOCK_ARTICLES.filter(a => a.category === category && a.id !== currentId).slice(0, limit);
    }
}

// --- CRUD OPERATIONS ---

export const createArticle = async (article: Omit<Article, 'id' | 'date' | 'slug'>): Promise<boolean> => {
  const slug = generateSlug(article.title);
  
  if (!supabase) {
    const newArticle: Article = {
      ...article,
      id: (MOCK_ARTICLES.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      slug: slug
    };
    MOCK_ARTICLES.unshift(newArticle);
    console.log('[MOCK] Created article:', newArticle);
    return true;
  }

  try {
    const { error } = await supabase
      .from('articles')
      .insert([
        {
          title: article.title,
          slug: slug,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          author: article.author,
          image_url: article.imageUrl,
          read_time: article.readTime,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase Create Error:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error("Error creating article", error);
    return false;
  }
};

export const updateArticle = async (article: Article): Promise<boolean> => {
  if (!supabase) {
    const index = MOCK_ARTICLES.findIndex(a => a.id === article.id);
    if (index !== -1) {
      MOCK_ARTICLES[index] = article;
      console.log('[MOCK] Updated article:', article);
      return true;
    }
    return false;
  }

  try {
    // Generate new slug if title changed (optional, keeping simple here)
    const slug = generateSlug(article.title);

    const { error } = await supabase
      .from('articles')
      .update({
        title: article.title,
        slug: slug,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        author: article.author,
        image_url: article.imageUrl,
        read_time: article.readTime
      })
      .eq('id', article.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating article", error);
    return false;
  }
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  if (!supabase) {
    const index = MOCK_ARTICLES.findIndex(a => a.id === id);
    if (index !== -1) {
      MOCK_ARTICLES.splice(index, 1);
      console.log(`[MOCK] Deleted article with ID: ${id}`);
      return true;
    }
    return false;
  }

  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting article", error);
    return false;
  }
};

// DASHBOARD SERVICES

export interface DashboardStats {
  totalArticles: number;
  totalViews: number;
  totalAiQueries: number; 
  articlesByCategory: { [key: string]: number };
  recentArticles: Article[];
  chartData: { day: string; views: number }[]; 
  recentActivity: { id: string; user: string; action: string; time: string; type: 'comment' | 'post' | 'system' }[]; 
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const generateChartData = () => {
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    return days.map(day => ({
      day,
      views: Math.floor(Math.random() * 500) + 100
    }));
  };

  const generateActivity = () => [
    { id: '1', user: 'Nguyễn Văn A', action: 'đã bình luận vào bài "Hàm VLOOKUP"', time: '2 phút trước', type: 'comment' as const },
    { id: '2', user: 'Hệ thống', action: 'Sao lưu dữ liệu tự động hoàn tất', time: '1 giờ trước', type: 'system' as const },
    { id: '3', user: 'Admin', action: 'đã đăng bài viết mới về PowerPoint', time: '3 giờ trước', type: 'post' as const },
    { id: '4', user: 'Trần Thị B', action: 'đã chia sẻ bài viết lên Facebook', time: '5 giờ trước', type: 'comment' as const },
  ];

  if (!supabase) {
    const totalArticles = MOCK_ARTICLES.length;
    const totalViews = MOCK_ARTICLES.reduce((acc, _) => acc + Math.floor(Math.random() * 1000) + 100, 0);
    
    const articlesByCategory: { [key: string]: number } = {};
    MOCK_ARTICLES.forEach(a => {
      articlesByCategory[a.category] = (articlesByCategory[a.category] || 0) + 1;
    });

    return {
      totalArticles,
      totalViews,
      totalAiQueries: 1245,
      articlesByCategory,
      recentArticles: [...MOCK_ARTICLES], // Return copy
      chartData: generateChartData(),
      recentActivity: generateActivity()
    };
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, category, views, created_at, title, author, slug, image_url, excerpt, content, read_time')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const articles = data || [];
    const totalArticles = articles.length;
    const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);
    
    const articlesByCategory: { [key: string]: number } = {};
    articles.forEach((a: any) => {
      articlesByCategory[a.category] = (articlesByCategory[a.category] || 0) + 1;
    });

    return {
      totalArticles,
      totalViews,
      totalAiQueries: 1245 + Math.floor(Math.random() * 100), 
      articlesByCategory,
      recentArticles: articles.map(mapToArticle),
      chartData: generateChartData(), 
      recentActivity: generateActivity() 
    };

  } catch (error) {
    console.error("Dashboard stats error", error);
    return {
      totalArticles: 0,
      totalViews: 0,
      totalAiQueries: 0,
      articlesByCategory: {},
      recentArticles: [],
      chartData: [],
      recentActivity: []
    };
  }
};

// HELPER FOR CHATBOT
export const getAllArticlesContext = async (): Promise<string> => {
  let articles: Article[] = [];
  
  if (!supabase) {
    articles = MOCK_ARTICLES;
  } else {
    try {
      // Limit fields to reduce token usage
      const { data } = await supabase.from('articles').select('title, category, content, excerpt').limit(20);
      articles = data ? data.map(mapToArticle) : [];
    } catch {
      articles = MOCK_ARTICLES;
    }
  }

  if (articles.length === 0) return "";

  // Format content for RAG-like context
  return articles.map(a => 
    `---
    Tiêu đề: ${a.title}
    Danh mục: ${a.category}
    Tóm tắt: ${a.excerpt}
    Nội dung: ${a.content.substring(0, 1000)}... (đã cắt ngắn)
    ---`
  ).join('\n');
};