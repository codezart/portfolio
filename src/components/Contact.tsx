import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";
import React from "react";
import { submitForm } from "@/api/submit-form/route";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "abdurrahman.mohammed@outlook.com",
      href: "mailto:abdurrahman.mohammed@outlook.com"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/abdurrahman-mohammed",
      href: "https://linkedin.com/in/abdurrahman-mohammed"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/codezart",
      href: "https://github.com/codezart"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Canada",
      href: null
    }
  ];
	const [result, setResult] = React.useState("");

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setResult("Sending....");

  const formData = new FormData(event.target as HTMLFormElement);
  const jsonData: Record<string, string> = {};
  
  // Convert FormData to plain object, ensuring all values are strings
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value.toString();
  }

  try {
    const data = await submitForm(jsonData);

    if (data.success) {
      setResult("Form Submitted Successfully");
      (event.target as HTMLFormElement).reset();
    } else {
      console.log("Error", data);
      setResult(data.message || "Submission failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setResult("Failed to send message. Please try again.");
  }
};
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your AI/ML vision to life? Let's discuss how we can build something amazing together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>
            <p className="text-muted-foreground mb-8">
              I'm always interested in hearing about new opportunities, whether it's a full-time position, 
              consulting project, or collaboration. Feel free to reach out!
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="p-3 bg-accent-light rounded-lg text-accent">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-light transition-smooth font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Connect Buttons */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Quick Connect</h4>
              <div className="flex gap-4">
                <Button variant="professional" className="flex-1">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="flex-1">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      placeholder="John" 
                      required 
                      className="transition-smooth"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      placeholder="Doe" 
                      required 
                      className="transition-smooth"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="john.doe@example.com" 
                    required 
                    className="transition-smooth"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company (Optional)
                  </label>
                  <Input 
                    id="company" 
                    name="company"
                    placeholder="Your Company" 
                    className="transition-smooth"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    name="subject"
                    placeholder="Project Discussion / Job Opportunity / Collaboration" 
                    required 
                    className="transition-smooth"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Tell me about your project, opportunity, or how we can work together..."
                    rows={5}
                    required 
                    className="transition-smooth resize-none"
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full">
                  <Mail className="w-5 h-5" />
                  Send Message
                </Button>
                
                {result && (
                  <div className={`mt-4 p-3 rounded-lg text-center ${
                    result === "Form Submitted Successfully" 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : result === "Sending...."
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                    {result}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;