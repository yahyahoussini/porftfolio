import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BlogCategory } from './useBlog';

export interface BlogPostDraft extends Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
}

export interface AIOptimizationScore {
  overall: number;
  geo: number;
  seo: number;
  readability: number;
  aiDetection: number;
  voiceSearch: number;
}

export const useBlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const createPost = async (postData: BlogPostDraft): Promise<BlogPost | null> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...postData,
          slug: generateSlug(postData.title),
          reading_time: calculateReadingTime(postData.content),
        })
        .select()
        .single();

      if (error) throw error;
      setPosts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      return null;
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPostDraft>): Promise<BlogPost | null> => {
    try {
      const updateData = {
        ...updates,
        reading_time: updates.content ? calculateReadingTime(updates.content) : undefined,
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPosts(prev => prev.map(post => post.id === id ? data : post));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      return null;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(prev => prev.filter(post => post.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      return false;
    }
  };

  const publishPost = async (id: string): Promise<boolean> => {
    return !!(await updatePost(id, { published: true }));
  };

  const unpublishPost = async (id: string): Promise<boolean> => {
    return !!(await updatePost(id, { published: false }));
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost,
    refreshPosts: fetchAllPosts,
  };
};

// Helper functions
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};