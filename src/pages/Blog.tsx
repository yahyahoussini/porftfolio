import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBlogPosts, useBlogCategories } from '@/hooks/useBlog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  
  const category = searchParams.get('category');
  const { posts, loading, error } = useBlogPosts(language, category || undefined);
  const { categories } = useBlogCategories(language);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryFilter = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error loading blog posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('blog.subtitle')}
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex max-w-md mx-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('blog.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">{t('blog.search')}</Button>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    {t('blog.categories')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={!category ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleCategoryFilter('')}
                  >
                    {t('blog.allCategories')}
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={category === cat.name ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleCategoryFilter(cat.name)}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-48 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      {t('blog.noPosts')}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                        <CardHeader className="p-0">
                          {post.featured_image ? (
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                              <div className="text-4xl opacity-50">📝</div>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary">{post.category}</Badge>
                            {post.reading_time && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {post.reading_time} {t('blog.minRead')}
                              </div>
                            )}
                          </div>
                          
                          <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.created_at).toLocaleDateString(
                                language === 'fr' ? 'fr-FR' : 'en-US'
                              )}
                            </div>
                            
                            <Link 
                              to={`/blog/${post.slug}`}
                              className="flex items-center gap-1 text-primary hover:gap-2 transition-all"
                            >
                              {t('blog.readMore')}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                          
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Blog;