import {assets} from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { IoMailOpenOutline } from "react-icons/io5";

export default function Footer() {
  return (
	<footer className="mt-20">
		<div className="w-max text-center justify-center mx-auto">
			<Image
				src={assets.abdurrahman_logo}
				alt="Footer Image"
				className="w-36 mx-auto mb-2"
			/>

			<div className="w-max flex justify-center items-center gap-2 max-auto">
				<IoMailOpenOutline className="w-6"/>
				abdurrahman.mohammed@gmail.com
			</div>
		</div>
			
		<div className="text-center sm:flex items-center justify-between border-t 
			border-gray-400 mx-[10%] mt-8 py-6">
			<p className="text-sm text-gray-500 mt-2">
				&copy; {new Date().getFullYear()} Abdur Rahman Mohammed. All rights reserved.
			</p>
			<ul className="flex justify-center items-center gap-19 mt-2 sm:mt-0">
				<li>
					<a href="#home" className="text-gray-500 hover:text-black transition">
						GitHub
					</a>
				</li>
				<li>
					<a href="#about" className="text-gray-500 hover:text-black transition">
						LinkedIn
					</a>
				</li>
				<li>
					<a href="#about" className="text-gray-500 hover:text-black transition">
						Twitter
					</a>
				</li>
			</ul>
		</div>
	</footer>
  );
}