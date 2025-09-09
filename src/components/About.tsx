import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Code, Brain } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "3+ Years Experience",
      description: "Building scalable ML systems and real-time pipelines"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI/ML Specialist",
      description: "Time series modeling, predictive analytics, and LLMs"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "MSc Computer Science",
      description: "University of Ottawa, Canada"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "MLOps Expert",
      description: "CI/CD, Docker, Kubernetes, and cloud deployment"
    }
  ];

  const education = [
    {
      degree: "MSc. in Computer Science",
      school: "University of Ottawa",
      location: "Ottawa, Canada",
      period: "Sept 2022 - May 2024"
    },
    {
      degree: "BSc. in Computer Science", 
      school: "King Fahd University of Petroleum & Minerals",
      location: "Dhahran, Saudi Arabia",
      period: "Sept 2016 - May 2021"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about leveraging cutting-edge technologies to solve complex problems and drive innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">My Story</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As a dedicated software engineer with a Master's in Computer Science from the University of Ottawa, 
                I thrive at the intersection of technology and problem-solving. My expertise spans across machine learning, 
                time series forecasting, and generative AI applications.
              </p>
              <p>
                Over the past 3+ years, I've honed my skills across diverse roles, from developing scalable microservices 
                to optimizing ML pipelines that handle massive datasets. I'm passionate about delivering high-quality 
                solutions that meet and exceed expectations.
              </p>
              <p>
                My technical proficiencies include Python, Java, cloud platforms (AWS, Azure), and cutting-edge AI frameworks. 
                I'm adept in DevOps practices with hands-on experience in Docker, Kubernetes, and MLOps workflows.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-accent-light rounded-lg text-accent">
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{highlight.title}</h4>
                      <p className="text-muted-foreground text-sm">{highlight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Education</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-professional-blue-light rounded-lg">
                      <GraduationCap className="w-6 h-6 text-professional-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{edu.degree}</h4>
                      <p className="text-primary font-medium mb-1">{edu.school}</p>
                      <p className="text-sm text-muted-foreground mb-2">{edu.location}</p>
                      <Badge variant="secondary">{edu.period}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;