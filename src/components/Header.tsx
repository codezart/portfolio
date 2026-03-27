import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSectionNav = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-professional">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            Abdur Rahman Mohammed
          </Link>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => handleSectionNav('about')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              About
            </button>
            <button
              onClick={() => handleSectionNav('experience')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Experience
            </button>
            <button
              onClick={() => handleSectionNav('skills')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Skills
            </button>
            <button
              onClick={() => handleSectionNav('projects')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Projects
            </button>
            <button
              onClick={() => handleSectionNav('contact')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Contact
            </button>
            <Link
              to="/blog"
              className="text-foreground hover:text-primary transition-smooth"
            >
              Blog
            </Link>
          </div>

          <a href="https://calendly.com/hae-frndz-rahman/30min" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex">
            <Button variant="professional">
              Let's Connect
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;