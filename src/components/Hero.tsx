import { Button } from "@/components/ui/button";
import { Mail, Download, Github, Linkedin } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Photo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src={profilePhoto} 
                alt="Abdur Rahman Mohammed"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-elegant border-4 border-background"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-hero opacity-10"></div>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Abdur Rahman Mohammed
          </h1>
          
          <h2 className="text-xl md:text-2xl text-primary mb-6 font-medium">
            Software Engineer | AI/ML Engineer | Generative AI Developer
          </h2>

          {/* Summary */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Engineer with 3+ years of experience building scalable forecasting systems and real-time ML pipelines. 
            Specialized in time series modeling, predictive analytics, and end-to-end MLOps workflows.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToContact}
              className="min-w-[200px]"
            >
              <Mail className="w-5 h-5" />
              Hire Me
            </Button>
            <a href="https://docs.google.com/document/d/1rsv1eC7PfG31425o9S2V55tPvGldl4U6kmUU9ldwg0M/export?format=pdf" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[200px]"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a 
              href="https://linkedin.com/in/abdurrahman-mohammed" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-professional-blue text-primary-foreground hover:bg-professional-blue/90 transition-smooth shadow-card"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/codezart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-smooth shadow-card"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;