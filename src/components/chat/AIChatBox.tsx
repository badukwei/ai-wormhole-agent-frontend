"use client";
import React from "react";
import { AIChatBoxLayout } from "@/components/ui/AIChatBoxLayout";

interface AIChatBoxProps {
	messages: { role: string; content: string }[];
}

const AIChatBox: React.FC<AIChatBoxProps> = ({ messages }) => {
	return (
		<AIChatBoxLayout className="overflow-y-auto">
			<div className="space-y-8 w-full max-w-3xl">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex ${
							message.role === "user"
								? "justify-end"
								: "justify-start"
						}`}
					>
						<div
							className={`p-3 rounded-lg ${
								message.role === "user"
									? "bg-gray-700 text-white"
									: "bg-wormholePrimary text-black"
							}`}
						>
							{message.content}
						</div>
					</div>
				))}
			</div>
		</AIChatBoxLayout>
	);
};

export default AIChatBox;
