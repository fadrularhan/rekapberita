export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category_id: string;
  author: string;
  source: string | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
}
