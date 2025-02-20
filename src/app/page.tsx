"use client";

import { useState } from "react";
import { AIResponseBox } from "@/components/ui/AIResponseBox";
import { Textarea } from "@/components/ui/Textarea";
import { AiOutlineSend } from "react-icons/ai";

const ChatPage = () => {
	const [messages, setMessages] = useState<
		{ role: string; content: string }[]
	>([]);
	const [input, setInput] = useState("");

	const sendMessage = async () => {
		if (!input.trim()) return;

		const newMessages = [...messages, { role: "user", content: input }];
		setMessages(newMessages);
		setInput("");

		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{ role: "ai", content: `AI 回應: "${input}"` },
			]);
		}, 1000);
	};

	return (
		<div className="h-screen flex flex-col items-center pb-4 justify-center bg-wormholeBg text-wormholeText overflow-hidden">
			<h1 className="text-3xl font-bold m-8 text-wormholePrimary animate-neonGlow">
				Wormhole AI Chat
			</h1>

			<AIResponseBox className="overflow-y-auto">
				<div className="space-y-8 w-full max-w-3xl pl-4">
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Hello, how can I help you today?
						</div>
					</div>
					<div className="flex justify-end">
						<div className="bg-gray-700 text-white p-3 rounded-lg">
							I need some information about your services.
						</div>
					</div>
					<div className="flex justify-start">
						<div className="bg-wormholePrimary text-black p-3 rounded-lg">
							Sure, we offer a variety of AI-based solutions. What
							specifically are you interested in?
						</div>
					</div>
					<div className="flex justify-end">
						<div className="bg-gray-700 text-white p-3 rounded-lg">
							I am interested in your chatbot services.
						</div>
					</div>
				</div>
			</AIResponseBox>

			<div className="w-full max-w-3xl mt-4 p-4 border border-white/40 rounded-20 bg-wormholeCard flex items-center rounded">
				<Textarea
					placeholder="Enter your message..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="flex-1 bg-transparent text-white rounded outline-none border-none focus:outline-none resize-none"
				/>
				<button
					onClick={sendMessage}
					className="ml-3 p-2 bg-wormholePrimary hover:bg-purple-500 rounded-full text-white flex items-center justify-center"
				>
					<AiOutlineSend size={16} />
				</button>
			</div>
		</div>
	);
};

export default ChatPage;
