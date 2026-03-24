import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-professional">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            Abdur Rahman Mohammed
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Contact
            </button>
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