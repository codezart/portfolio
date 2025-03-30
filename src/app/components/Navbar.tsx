"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
      
      if (window.scrollY > 900) {
        console.log(scrollY);
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }

    };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav className={`w-full flex justify-between items-center px-5 lg:px-8 xl:px-[8%] py-4 fixed top-0 z-50
      ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm" : ""}`}>
      <div className=" fixed top-0 left-0 ">
        <Image
          src={assets.abdurrahman_logo}
          alt=""
          className="w-64 h-24"
          />
      </div>
      <div> </div>
      {/* Desktop Nav */}
      <ul className={`navbar-list hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 
        ${isScroll ? "" : "bg-white shadow-xs bg-opacity-20"} `}>
        {["home", "about", "experience", "projects", "contact"].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className={`hover:text-gray-400 transition-all ${
                activeSection === section ? "text-blue-400 font-bold" : ""
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        <button>
          <IoMoonOutline />
        </button>

        {/* Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <RiMenu3Fill />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-rose-50 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 shadow-lg`}
      >
        <button className="absolute top-6 right-6" onClick={() => setMenuOpen(false)}>
          <IoMdClose className="w-6 h-6" />
        </button>

        <ul className="flex flex-col gap-6 py-24 px-8">
          {["home", "about", "experience", "projects", "contact"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`hover:text-gray-500 transition-all ${
                  activeSection === section ? "text-blue-400 font-bold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
