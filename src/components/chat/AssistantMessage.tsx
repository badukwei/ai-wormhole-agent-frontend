"use client";
import { CoinMarketCapResponse } from "@/types/coinMarketCap";
import React from "react";

interface AssistantMessageProps {
	content: string;
	showChains?: boolean;
	isResult?: boolean;
	coinData: CoinMarketCapResponse | null;
	onChainSelect?: (chain: string, address: string) => void;
	isLoading: boolean;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({
	content,
	showChains,
	isResult,
	coinData,
	onChainSelect,
	isLoading,
}) => {
	try {
		const parsed = JSON.parse(content);

		return (
			<div
				className={`p-3 rounded-lg ${
					isResult ? "bg-gray-900 border border-gray-800 p-6" : "bg-wormholePrimary"
				} text-white`}
			>
				<div className="text-base">{parsed.message}</div>

				{showChains && coinData && coinData.addresses.length > 0 && (
					<div className="mt-2 flex flex-wrap gap-2">
						{coinData.addresses.map((addr, i) => (
							<button
								key={i}
								onClick={() =>
									onChainSelect?.(addr.chain, addr.address)
								}
								disabled={isLoading}
								className="px-3 py-1 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
							>
								{addr.chain}
							</button>
						))}
					</div>
				)}

				{isResult && parsed && (
					<>
						<h3 className="text-purple-400 font-medium mb-2 text-sm uppercase tracking-wide">
							Query Details
						</h3>

						<div className="grid grid-cols-2 gap-12">
							<div className="space-y-2">
								<div className="flex flex-col">
									<span className="text-gray-400 text-sm">
										Token
									</span>
									<span className="font-medium">
										{parsed.token}
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-gray-400 text-sm">
										Chain
									</span>
									<span className="font-medium">
										{parsed.chain}
									</span>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex flex-col">
									<span className="text-gray-400 text-sm">
										Method
									</span>
									<span className="font-medium">
										{parsed.method?.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-gray-400 text-sm">
										Result
									</span>
									<span className="font-medium break-all">
										{typeof parsed.result === "number"
											? parsed.result.toLocaleString()
											: parsed.result}
									</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		);
	} catch {
		return (
			<div className="p-3 rounded-lg bg-wormholePrimary text-white">
				{content}
			</div>
		);
	}
};

export default AssistantMessage;
