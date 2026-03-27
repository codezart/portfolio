import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { getPostBySlug, type ContentNode } from "@/data/blog";

const renderContent = (nodes: ContentNode[]) => {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "heading":
        if (node.level === 2) {
          return (
            <h2
              key={index}
              className="text-2xl font-bold text-foreground mt-10 mb-4"
            >
              {node.text}
            </h2>
          );
        }
        return (
          <h3
            key={index}
            className="text-xl font-semibold text-foreground mt-8 mb-3"
          >
            {node.text}
          </h3>
        );

      case "paragraph":
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-5">
            {node.text}
          </p>
        );

      case "code":
        return (
          <div key={index} className="my-6">
            <div className="flex items-center bg-primary/10 border border-border rounded-t-lg px-4 py-2">
              <span className="text-xs font-mono text-muted-foreground">
                {node.language}
              </span>
            </div>
            <pre className="bg-muted border border-t-0 border-border rounded-b-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono text-foreground whitespace-pre">
                {node.code}
              </code>
            </pre>
          </div>
        );

      case "list":
        return (
          <ul key={index} className="space-y-3 mb-5 ml-1">
            {node.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );

      case "callout":
        return (
          <div
            key={index}
            className="my-6 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg"
          >
            <p className="text-foreground font-medium text-sm leading-relaxed">
              {node.text}
            </p>
          </div>
        );

      default:
        return null;
    }
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border pt-6">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </header>

            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <article className="mb-12">{renderContent(post.content)}</article>

            <div className="border-t border-border pt-8">
              <Link to="/blog">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
