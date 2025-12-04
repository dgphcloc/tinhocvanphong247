export enum Category {
  EXCEL = 'Excel',
  WORD = 'Word',
  POWERPOINT = 'PowerPoint',
  GENERAL = 'Thủ thuật chung'
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface PaginatedResult {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
}

export type SortOption = 'newest' | 'oldest';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role?: 'admin' | 'user';
}