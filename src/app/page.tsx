"use client";

import { useState } from "react";
import { useAIChat } from "@/hooks/useAIChat";
import { Textarea } from "@/components/ui/Textarea";
import { AiOutlineSend } from "react-icons/ai";
import { queryMockTokenData } from "@/libs/queryMock";
import AIChatBox from "@/components/chat/AIChatBox";

const ChatPage = () => {
	const [input, setInput] = useState("");
	const { messages, sendQuery, queryStatus, coinData } = useAIChat();

	const handleSendMessage = async () => {
		if (!input.trim() || queryStatus.isLoading) return;

		const message = input;
		setInput(""); // Clear input
		await sendQuery(message);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const testQueryMock = async () => {
		try {
			const result = await queryMockTokenData(
				"0xb8c77482e45f1f44de1745f52c74426c631bdd52",
				"ethereum",
				"totalSupply"
			);

			console.log("Query result:", result);
			setInput("Testing QueryMock");
		} catch (error) {
			console.error("Test query failed:", error);
			setInput("Test query failed. Please try again later.");
		}
	};

	return (
		<div className="h-screen flex flex-col items-center pb-4 justify-center bg-wormholeBg text-wormholeText overflow-hidden">
			<h1 className="text-3xl font-bold m-8 text-wormholePrimary animate-neonGlow">
				Wormhole AI Chat
			</h1>

			<AIChatBox messages={messages} coinData={coinData} />

			<div className="w-full max-w-3xl mt-4 p-4 border border-white/40 rounded-20 bg-wormholeCard flex items-center rounded">
				<Textarea
					placeholder="Ask about token information (e.g., 'What is the total supply of USDC on Ethereum?')"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={handleKeyPress}
					className="flex-1 bg-transparent text-white rounded outline-none border-none focus:outline-none resize-none"
				/>
				<button
					onClick={handleSendMessage}
					disabled={queryStatus.isLoading}
					className={`ml-3 p-2 bg-wormholePrimary hover:bg-purple-500 rounded-full text-white flex items-center justify-center ${
						queryStatus.isLoading ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					<AiOutlineSend size={16} />
				</button>
			</div>
		</div>
	);
};

export default ChatPage;
