import { Text } from "@brince-mono-repo/shared-components";
import { Github, Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-100 dark:bg-gray-800 mt-8 py-6 pb-20">
			<div className="container mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between gap-8">
					<div className="flex flex-col space-y-4">
						<Text variant={"h2"} className="font-bold">
							BRIN&lt;/&gt;E
						</Text>
						<Text variant={"body"} className="text-gray-500 dark:text-gray-400">
							© {new Date().getFullYear()} All rights reserved.
						</Text>
					</div>
					<div className="flex space-x-4 items-center">
						<a
							href="https://github.com/brince0304"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
						>
							<Github size={24} />
						</a>
						<a
							href="https://www.linkedin.com/in/%EC%84%9D%ED%98%84-%EB%B0%B1-439058292/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
						>
							<Linkedin size={24} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
