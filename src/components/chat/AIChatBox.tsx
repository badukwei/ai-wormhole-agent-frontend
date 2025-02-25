"use client";
import React from "react";
import { AIChatBoxLayout } from "@/components/ui/AIChatBoxLayout";
import { CoinMarketCapResponse } from "@/types/coinMarketCap";
import AssistantMessage from "./AssistantMessage";
import { PulseLoader } from "react-spinners";

interface AIChatBoxProps {
	messages: {
		role: string;
		content: string;
		showChains?: boolean;
		isResult?: boolean;
	}[];
	coinData: CoinMarketCapResponse | null;
	onChainSelect?: (chain: string, address: string) => void;
	isLoading: boolean;
}

const AIChatBox: React.FC<AIChatBoxProps> = ({
	messages,
	coinData,
	onChainSelect,
	isLoading,
}) => {
	return (
		<AIChatBoxLayout className="">
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
						{message.role === "user" ? (
							<div className="p-3 rounded-lg max-w-[80%] break-words whitespace-pre-wrap bg-gray-700 text-white">
								{message.content}
							</div>
						) : (
							<AssistantMessage
								content={message.content}
								showChains={message.showChains}
								isResult={message.isResult}
								coinData={coinData}
								onChainSelect={onChainSelect}
								isLoading={isLoading}
							/>
						)}
					</div>
				))}
				{isLoading && (
					<div className="flex justify-center mt-4">
						<div className="relative">
							<div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
							<div className="relative">
								<PulseLoader
									color="#9333EA"
									size={8}
									margin={4}
									speedMultiplier={0.8}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</AIChatBoxLayout>
	);
};

export default AIChatBox;
