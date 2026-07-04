const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export interface News {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  tags: string[];
  readTime?: string | null;
  content?: string;
  faqs?: { question: string; answer: string }[];
  faqsTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  publishedAt?: string | null;
  createdBy?: { name: string };
  relatedPosts?: { slug: string; title: string; coverImage?: string | null }[];
  updatedAt?: string;
}

export interface NewsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getNews(params?: Record<string, string>): Promise<{ news: News[]; pagination: NewsPagination }> {
  const query = new URLSearchParams({ isPublished: 'true', ...params }).toString();
  const res = await fetch(`${API_URL}/news?${query}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch news');
  const data = await res.json();
  return data.data;
}

export async function getNewsBySlug(slug: string): Promise<News> {
  const res = await fetch(`${API_URL}/news/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('News article not found');
  const data = await res.json();
  return data.data;
}