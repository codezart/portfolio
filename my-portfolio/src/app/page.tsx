"use client";
import Navbar from "@/app/components/Navbar";
import HomeSection from "@/app/components/HomeSection";
import AboutSection from "@/app/components/AboutSection";
import ExperienceSection from "@/app/components/ExperienceSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import ContactSection from "@/app/components/ContactSection";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HomeSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
