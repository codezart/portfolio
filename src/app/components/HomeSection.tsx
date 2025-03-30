"use client";

import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';
import Image from "next/image";
import {assets} from "@/assets/assets";
import { GoArrowRight } from "react-icons/go";
import { FiDownload } from "react-icons/fi";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#FAF5F2] to-[#FFE3E3] text-center px-4 overflow-hidden"
    >
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center"
      >
        <Image
          src={assets.profile}
          alt=""
          className="rounded-full w-24"
        />
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Abdur Rahman Mohammed
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600">
          Software Engineer | AI/ML Engineer
        </p>

        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            className="text-gray-700 hover:text-black transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="text-gray-700 hover:text-black transition"
          >
            LinkedIn
          </a>
        </div>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
          
          {/* Contact Me Button - Transparent to White Swipe */}
          <a
            href="#contact"
            target="_blank"
            className="relative px-10 py-3 rounded-full border border-black overflow-hidden group text-white bg-transparent transition-all duration-300"
          >
            {/* Text */}
            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              contact me <GoArrowRight />
            </span>

            {/* Sliding overlay that starts full black and disappears */}
            <span
              className="absolute inset-0 z-0 bg-black scale-x-100 origin-right group-hover:scale-x-0 transition-transform duration-300 ease-out"
            ></span>
          </a>

          {/* My Resume Button - Transparent to Black Swipe */}
          <a
            href="/resume.pdf"
            target="_blank"
            className="relative px-10 py-3 rounded-full border border-black overflow-hidden group text-black bg-transparent transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              My Resume <FiDownload />
            </span>
            <span
              className="absolute inset-0 z-0 bg-black scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"
            ></span>
          </a>

        </div>
      </motion.div>

      {/* Bouncing scroll down icon */}
      <a href="#about" className="absolute bottom-8 animate-bounce">
        <ArrowDownCircle className="w-8 h-8 text-gray-400" />
      </a>

      {/* Optional background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-200"></div>
    </section>
  );
}