import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Cloud, Database, Brain, Settings, BarChart } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Programming Languages",
      color: "bg-tech-accent-light text-tech-accent",
      skills: ["Python", "Java", "R", "JavaScript", "C++"]
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Platforms",
      color: "bg-professional-blue-light text-professional-blue",
      skills: ["AWS", "Azure", "Scaleway", "AWS SageMaker", "EC2", "RDS"]
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI/ML Frameworks",
      color: "bg-accent-light text-accent",
      skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy"]
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "DevOps & MLOps",
      color: "bg-muted text-muted-foreground",
      skills: ["Docker", "Kubernetes", "CI/CD", "FluxCD", "ArgoCD", "Git"]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Technologies",
      color: "bg-secondary text-secondary-foreground",
      skills: ["SQL/MySQL", "PostgreSQL", "MariaDB", "NoSQL", "AWS RDS"]
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Data & Analytics",
      color: "bg-primary/10 text-primary",
      skills: ["PySpark", "Databricks", "Power BI", "Tableau", "Matplotlib", "Seaborn"]
    }
  ];

  const algorithms = [
    "Linear Regression", "Decision Trees", "Random Forest", "XGBoost", "SVM",
    "k-NN", "K-Means Clustering", "Deep Learning (RNN, CNN, DNN)", "NLP"
  ];

  const specializations = [
    "Time Series Modeling", "Predictive Analytics", "MLOps", "Model Interpretability",
    "Demand Forecasting", "Transformer Architectures", "LLMs", "Feature Engineering",
    "A/B Testing", "Bayesian Inference", "Hypothesis Testing", "PCA"
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building scalable, intelligent solutions
          </p>
        </div>

        {/* Main Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specializations */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-accent-light rounded-lg">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <span>ML Algorithms & Methods</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {algorithms.map((algorithm, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {algorithm}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <span>Specializations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;