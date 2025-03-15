export default function HomeSection() {
	return (
	  <section
		id="home"
		className="relative h-screen flex flex-col justify-center items-center bg-[#FAF5F2] overflow-hidden"
	  >
		{/* Navbar */}
		<div className="absolute top-6 flex space-x-10 text-black font-semibold">
		  <a href="https://github.com" target="_blank" className="hover:text-gray-600 transition">
			GitHub
		  </a>
		  <a href="https://linkedin.com" target="_blank" className="hover:text-gray-600 transition">
			LinkedIn
		  </a>
		  <a href="#contact" className="hover:text-gray-600 transition">
			Contact
		  </a>
		</div>
  
		{/* Abstract Background Elements */}
		<svg className="absolute top-0 right-0 w-64 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
		  <path
			fill="#EF7373"
			d="M50,-61.3C64.7,-51.7,76.3,-35.1,79.1,-17.8C81.9,-0.5,75.9,17.5,65.3,32.9C54.7,48.3,39.6,61.1,22.9,67.7C6.2,74.3,-11,74.7,-27,68.8C-43,62.9,-57.9,50.7,-67.3,35.5C-76.6,20.3,-80.5,2.1,-77.1,-14.2C-73.7,-30.5,-62.9,-44.9,-49,-54.6C-35.1,-64.3,-17.5,-69.2,0.6,-69.9C18.6,-70.5,37.2,-66.8,50,-61.3Z"
			transform="translate(100 100)"
		  />
		</svg>
  
		<div className="absolute bottom-10 left-10 flex space-x-6 opacity-20">
		  <div className="w-12 h-12 bg-red-400 rounded-full"></div>
		  <div className="w-8 h-8 bg-red-400 rounded-full"></div>
		  <div className="w-16 h-16 bg-red-400 rounded-full"></div>
		</div>
  
		{/* Main Heading */}
		<h1 className="text-7xl md:text-8xl font-bold text-[#EF7373] drop-shadow-lg text-center">
		  Abdur Rahman Mohammed
		</h1>
  
		{/* Tagline */}
		<p className="text-lg text-gray-700 mt-4 text-center">
		  A software Engineer specialized in Artificial Intelligence & Machine Learning
		</p>
  
		{/* Resume Button */}
		<a
		  href="/resume.pdf"
		  target="_blank"
		  className="mt-6 px-6 py-3 bg-[#EF7373] text-white font-semibold rounded-lg shadow-md hover:bg-[#E76060] transition-all"
		>
		  Resume
		</a>
	  </section>
	);
  }
  