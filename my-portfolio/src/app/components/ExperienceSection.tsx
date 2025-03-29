"use client";
import Image from "next/image";
import { experienceData } from "@/data/experienceData";

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
      <div className="flex flex-col gap-10">
	  {experienceData.map((exp, index) => (
		<div
			key={index}
			className="relative bg-white border border-gray-200 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
		>
			<div className="flex items-start gap-4">
			<div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
				<Image src={exp.logo} alt={`${exp.company} logo`} width={40} height={40} className="object-contain" />
			</div>
			<div>
				<h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
				<p className="text-sm text-gray-600">{exp.company}</p>
				<p className="text-xs italic text-gray-500">{exp.duration} · {exp.location}</p>
			</div>
			</div>
			<ul className="mt-4 list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed">
			{exp.responsibilities.map((item, idx) => (
				<li key={idx}>{item}</li>
			))}
			</ul>
		</div>
		))}
      </div>
    </section>
  );
}
