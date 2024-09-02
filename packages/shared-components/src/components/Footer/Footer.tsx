import { Github, Linkedin } from "lucide-react";
import React from "react";
import { Button } from "../ui/Button/button";
import { Card, CardContent } from "../ui/Card/card";

const Footer = () => {
	return (
		<Card className="mt-8 border-0 rounded-none shadow-none">
			<CardContent className="pt-6">
				<div className="container mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row justify-between gap-8">
						<div className="flex flex-col space-y-4">
							<h2 className="text-2xl font-bold">BRIN&lt;/&gt;E</h2>
							<p className="text-gray-500 dark:text-gray-400">
								© {new Date().getFullYear()}
							</p>
						</div>
						<div className="flex space-x-4 items-center">
							<Button variant="ghost" size="icon" asChild>
								<a
									href="https://github.com/brince0304"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
								>
									<Github className="h-5 w-5" />
								</a>
							</Button>
							<Button variant="ghost" size="icon" asChild>
								<a
									href="https://www.linkedin.com/in/%EC%84%9D%ED%98%84-%EB%B0%B1-439058292/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
								>
									<Linkedin className="h-5 w-5" />
								</a>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Footer;
