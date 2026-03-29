import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Blog = () => {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [featured, ...rest] = sorted;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl mb-6">
              <BookOpen className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts on machine learning, AI systems, and software engineering
              from the trenches.
            </p>
          </div>

          {sorted.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No posts yet. Check back soon!
            </p>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Featured latest post */}
              <Link to={`/blog/${featured.slug}`} className="block group">
                <div className="rounded-2xl border bg-card shadow-card hover:shadow-elegant transition-smooth overflow-hidden">
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-5">
                      <Badge variant="secondary" className="text-xs">
                        Latest
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {featured.category}
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-smooth mb-4 leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featured.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(featured.date), "MMMM d, yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {featured.readTime}
                        </span>
                      </div>
                      <span className="text-primary font-medium flex items-center gap-1.5 group-hover:gap-3 transition-all">
                        Read article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Remaining posts grid */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 gap-8">
                  {rest.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
