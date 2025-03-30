import React from 'react';
import { GoArrowRight } from "react-icons/go";

export default function ContactSection() {

	const [result, setResult] = React.useState("");

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setResult("Sending....");
	  
		const formData = new FormData(event.target as HTMLFormElement);
		const jsonData = Object.fromEntries(formData.entries());
	  
		const response = await fetch("/api/submit-form", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(jsonData),
		});
	  
		const data = await response.json();
	  
		if (data.success) {
		  setResult("Form Submitted Successfully");
		  (event.target as HTMLFormElement).reset();
		} else {
		  console.log("Error", data);
		  setResult(data.message || "Submission failed");
		}
	  };
		  
	return (
		<section id="contact" className="w-full px-[12%] py-10 scroll-mt-20
			bg-[url('/assets/images/contact-bg.png')] bg-no-repeat bg-center bg-[length:90%_auto]"> 
			
			<h4 className="text-center mb-2 text-lg">
			Connect with me</h4>
			<h2 className="text-center text-3xl md:text-5xl">
			Let&apos;s Get in Touch</h2>
			<p className="text-center max-w-2xl mx-auto mt-5 mb-12">
				I would love to hear from you! Whether you have a question, want to
				discuss a project, or just want to connect, feel free to reach out.
			</p>

			<form className="max-w-2xl mx-auto" onSubmit={onSubmit}>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8'>
					<input
						type="text"
						placeholder="Your Name"
						className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
						name='name'
						required
					/>
					<input
						type="email"
						placeholder="Your Email"
						className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
						name='email'
						required
					/>
				</div>
				<textarea
				placeholder="Your Message"
				className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6"
				rows={6}
				name='message'
				required
				></textarea>
				<button
					type="submit"
					className="py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80
					text-white rounded-full mx-auto hover:bg-black duration-500"
				>
				Send Message <GoArrowRight className='w-4'/>
				</button>
			</form>
			<p className="text-center mt-5 text-lg">
				{result}
			</p>
	  </section>
	);
  }
  