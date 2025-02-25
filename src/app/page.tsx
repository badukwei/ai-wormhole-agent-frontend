"use client";

import { useState } from "react";
import { useAIChat } from "@/hooks/useAIChat";
import { Textarea } from "@/components/ui/Textarea";
import { AiOutlineSend } from "react-icons/ai";
import AIChatBox from "@/components/chat/AIChatBox";

const ChatPage = () => {
	const [input, setInput] = useState("");
	const { messages, sendQuery, queryStatus, coinData, handleChainSelect, coinStatus, chainStatus } =
		useAIChat();

	const isLoading = queryStatus.isLoading || coinStatus.isLoading || chainStatus.isLoading;

	const handleSendMessage = async () => {
		if (!input.trim() || queryStatus.isLoading) return;

		const message = input;
		setInput(""); 
		await sendQuery(message);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="h-screen flex flex-col items-center pb-4 justify-center bg-wormholeBg text-wormholeText overflow-hidden px-4">
			<h1 className="text-3xl font-bold m-8 text-wormholePrimary animate-neonGlow">
				Wormhole AI Query
			</h1>

			<AIChatBox
				messages={messages}
				coinData={coinData}
				onChainSelect={handleChainSelect}
				isLoading={isLoading}
			/>

			<div className="w-full max-w-3xl mt-8 p-4 border border-white/40 rounded-20 bg-wormholeCard flex items-center rounded">
				<Textarea
					placeholder="Ask about token information (e.g., 'What is the total supply of USDC on Ethereum?')"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={handleKeyPress}
					className="flex-1 bg-transparent text-white rounded outline-none border-none focus:outline-none resize-none"
				/>
				<button
					onClick={handleSendMessage}
					disabled={isLoading}
					className={`ml-3 p-2 bg-wormholePrimary hover:bg-purple-500 rounded-full text-white flex items-center justify-center ${
						isLoading ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					<AiOutlineSend size={16} />
				</button>
			</div>
		</div>
	);
};

export default ChatPage;
