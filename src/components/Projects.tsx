import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Flovos: Video Object Segmentation with Optical Flow",
      description: "Advanced computer vision research project combining SwiftNet and optical flow techniques for real-time video object segmentation. Achieved significant accuracy improvements in one-shot segmentation scenarios.",
      type: "Research Project",
      technologies: ["Computer Vision", "PyTorch", "Optical Flow", "Deep Learning", "Real-time Processing"],
      highlights: [
        "Designed and implemented novel CV algorithms",
        "Combined SwiftNet with optical flow techniques",
        "Achieved significant real-time segmentation accuracy improvements",
        "Research-grade implementation with reproducible results"
      ],
      category: "Computer Vision"
    },
    {
      title: "Aspect-Based Opinion Mining (ABOM)",
      description: "NLP system for extracting opinions from customer reviews using state-of-the-art transformer architectures. Features advanced techniques including AraBERT, BiGRU+Attention, and transfer learning.",
      type: "NLP Project",
      technologies: ["Python", "PyTorch", "Transformers", "AraBERT", "BiGRU", "Attention Mechanisms"],
      highlights: [
        "Developed end-to-end NLP pipeline for opinion extraction",
        "Implemented state-of-the-art transformer architectures",
        "Applied transfer learning with AraBERT for Arabic text",
        "Enhanced product insight and decision-making capabilities"
      ],
      category: "Natural Language Processing"
    },
    {
      title: "RAG-Powered Documentation Assistant",
      description: "Enterprise-grade RAG pipeline deployed on Azure that intelligently answers questions about internal documentation and JIRA tickets. Reduced hallucinations by 10% through advanced retrieval techniques.",
      type: "Professional Project",
      technologies: ["Azure", "RAG", "LLMs", "Azure Search AI", "Vector Databases", "MLOps"],
      highlights: [
        "Deployed production RAG pipeline on Azure",
        "Integrated Azure Search AI for enhanced retrieval",
        "Reduced LLM hallucinations by 10%",
        "Built comprehensive test suite for reliability"
      ],
      category: "Generative AI"
    },
    {
      title: "Scalable Feature Generation Pipeline",
      description: "High-performance feature generation system for time-series data using PySpark and Databricks. Optimized processing workflows reducing execution time by 25% on distributed systems.",
      type: "ML Engineering",
      technologies: ["PySpark", "Databricks", "Time Series", "Feature Engineering", "Distributed Systems"],
      highlights: [
        "Built robust feature generation for time-series data",
        "Achieved 25% reduction in execution time",
        "Implemented on distributed systems architecture",
        "Enhanced model explainability and interpretability"
      ],
      category: "Data Engineering"
    },
    {
      title: "Influenza Detection Model",
      description: "Predictive machine learning model for detecting influenza types from molecular data. Deployed using MLflow with comprehensive model versioning and monitoring capabilities.",
      type: "Healthcare ML",
      technologies: ["MLflow", "Scikit-learn", "Model Deployment", "Healthcare Data", "Predictive Modeling"],
      highlights: [
        "Developed custom predictive model for healthcare",
        "Implemented MLflow for model lifecycle management",
        "Achieved high accuracy on medical diagnostic data",
        "Production-ready deployment with monitoring"
      ],
      category: "Healthcare AI"
    },
    {
      title: "Solar Energy Loss Optimization",
      description: "AI-driven system for estimating and optimizing different types of energy losses in solar installations. Combines statistical and physics-based models for accurate soiling loss prediction.",
      type: "Current Research",
      technologies: ["Time Series Analysis", "Statistical Modeling", "IoT", "AWS", "Predictive Analytics"],
      highlights: [
        "Applied AI to estimate soiling and inverter losses",
        "Built predictive models for cleaning schedule optimization",
        "Processed SCADA/IoT solar plant datasets",
        "Delivered actionable insights for energy efficiency"
      ],
      category: "Renewable Energy"
    }
  ];

  const categories = ["All", "Computer Vision", "Natural Language Processing", "Generative AI", "Data Engineering", "Healthcare AI", "Renewable Energy"];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions spanning machine learning, AI research, and production systems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth h-fit">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <Badge 
                    variant={project.type === "Current Research" ? "default" : "outline"}
                    className={project.type === "Current Research" ? "bg-tech-accent text-accent-foreground" : ""}
                  >
                    {project.type}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl text-foreground mb-3">
                  {project.title}
                </CardTitle>
                
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="w-4 h-4" />
                    View Code
                  </Button>
                  <Button variant="accent" size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="professional" size="lg">
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;