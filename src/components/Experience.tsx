import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Machine Learning Engineer",
      company: "Swish Solar",
      location: "Remote",
      period: "May 2025 – Present",
      type: "Current",
      achievements: [
        "Research on applying AI in estimating energy losses (soiling loss, inverter loss) for unsupervised time-series data",
        "Applied statistical and physics-based models to estimate soiling loss",
        "Built predictive models to optimize cleaning schedules based on time-series data",
        "Conducted exploratory data analysis and feature engineering on SCADA/IoT/solar plant datasets",
        "Engaged with investors and customers to gather MVP feedback, translating insights into actionable milestones",
        "Designed scalable system architecture on AWS"
      ],
      technologies: ["Python", "Time Series Analysis", "AWS", "IoT", "Statistical Modeling"]
    },
    {
      title: "Machine Learning Engineer",
      company: "Kinaxis",
      location: "Canada",
      period: "Sept 2023 – April 2025",
      type: "Previous",
      achievements: [
        "Developed and optimized feature generation on time-series data using PySpark Databricks",
        "Deployed RAG pipeline on Azure answering questions about internal documentation and JIRA tickets",
        "Reduced LLM hallucinations and built test kit for Kinarra (RAG bot) by 10%",
        "Optimized data preprocessing workflows using PySpark, reducing execution time by 25%",
        "Built scalable microservices-based platform on Azure, enhancing system efficiency",
        "Enhanced ML model explainability as part of new store innovation (NSI) enhancement",
        "Authored detailed documentation for AI/ML workflows"
      ],
      technologies: ["PySpark", "Databricks", "Azure", "RAG", "MLOps", "Microservices"]
    },
    {
      title: "Software Engineer",
      company: "Advanced Environmental Molecular Analytics Ltd.",
      location: "Canada",
      period: "May 2023 – Sept 2023",
      type: "Previous",
      achievements: [
        "Developed full-stack data visualization and analytics application using R, Python, FastAPI",
        "Automated generation of customized reports with test-driven development",
        "Reduced data analysis time by 40% through process optimization",
        "Deployed predictive model using MLflow for influenza type detection",
        "Containerized and scaled software using Docker on AWS"
      ],
      technologies: ["R", "Python", "FastAPI", "AWS", "Docker", "MLflow"]
    },
    {
      title: "Software Engineer",
      company: "Solutions by 42",
      location: "Remote",
      period: "Feb 2020 – Aug 2023",
      type: "Previous",
      achievements: [
        "Developed GenAI product converting text into actions like form creation and document validation",
        "Built ERP SaaS app hosted on Kubernetes cluster with customizable modules",
        "Engineered E2E SaaS application for dynamic test server provisioning, reducing testing overhead by 60%",
        "Spearheaded Kubernetes cluster development with Docker, Helm, GitOps (IaC)",
        "Onboarded and managed team of 2 junior developers, mentored 3+ developers and interns"
      ],
      technologies: ["Kubernetes", "Docker", "GenAI", "SaaS", "GitOps", "Team Leadership"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions across diverse industries and technologies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-8 last:mb-0">
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-border -z-10"></div>
              )}
              
              <Card className="ml-16 shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground mb-2">
                        {exp.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium text-primary">{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={exp.type === "Current" ? "default" : "secondary"}
                      className={exp.type === "Current" ? "bg-tech-accent text-accent-foreground" : ""}
                    >
                      {exp.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-card"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;