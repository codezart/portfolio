import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/abdurrahman-mohammed",
      label: "LinkedIn"
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/abdurrahman-mohammed",
      label: "GitHub"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:abdurrahman.mohammed@example.com",
      label: "Email"
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand/Name */}
          <div>
            <h3 className="text-xl font-bold mb-2">Abdur Rahman Mohammed</h3>
            <p className="text-primary-foreground/80">
              Software Engineer | AI/ML Engineer | Generative AI Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center">
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-smooth"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={scrollToTop}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Abdur Rahman Mohammed. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;