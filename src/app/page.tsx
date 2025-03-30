"use client";
import Navbar from "@/app/components/Navbar";
import HomeSection from "@/app/components/HomeSection";
import AboutSection from "@/app/components/AboutSection";
// import ExperienceSection from "@/app/components/ExperienceSection";
// import ProjectsSection from "@/app/components/ProjectsSection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
// import ServicesSection from "./components/ServicesSection";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HomeSection />
      <AboutSection />
      {/* <ExperienceSection /> */}
      {/* <ProjectsSection /> */}
      <ContactSection />
      <Footer />
    </main>
  );
}
