import Image from "next/image";
import { assets } from "@/assets/assets";
import { motion } from "framer-motion";
export default function AboutSection() {
	return (
	  <section id="about" className="w-full px-[12%] py-10 scroll-mt-20">
		<motion.div
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="z-10 flex flex-col items-center"
		>
			<h4 className="text-center mb-2 text-lg">
				Introduction
			</h4>
			<h2 className="text-center text-3xl md:text-5xl font-bold mb-8">
				About Me
			</h2>
			<div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
				<div className="w-64 sm:w-80 rounded-3xl max-w-none">
					<Image
						src={assets.profile}
						alt="Abdur Rahman Mohammed"
						className="w-full rounded-3xl"
					/>
				</div>
				<div className="flex flex-col gap-4 text-center lg:text-left">
					<p className="text-lg text-gray-700">
						I am a passionate software engineer with a focus on AI and ML. I enjoy
						building innovative solutions that leverage the power of artificial
						intelligence to solve real-world problems.
					</p>
					<p className="text-lg text-gray-700">
						My journey in tech has been fueled by a desire to learn and grow,
						and I am always looking for new challenges that push me to expand my
						skills and knowledge.
					</p>
					<p className="text-lg text-gray-700">
						I believe in the power of collaboration and enjoy working with
						teams to create impactful products. I am excited about the future of
						technology and the role I can play in shaping it.
					</p>
					<p className="text-lg text-gray-700">
						In my free time, I love exploring new technologies, contributing to
						open-source projects, and sharing my knowledge with others. I am
						always eager to connect with like-minded individuals and learn from
						their experiences.
					</p>
				</div>
			</div>
		</motion.div>
	  </section>
	);
  }
  