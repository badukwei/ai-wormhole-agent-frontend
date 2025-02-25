"use client";
import React from "react";
import { AIChatBoxLayout } from "@/components/ui/AIChatBoxLayout";
import { CoinMarketCapResponse } from "@/types/coinMarketCap";

interface AIChatBoxProps {
	messages: { role: string; content: string; showChains?: boolean }[];
	coinData: CoinMarketCapResponse | null;
	onChainSelect?: (chain: string, address: string) => void;
}

const AIChatBox: React.FC<AIChatBoxProps> = ({
	messages,
	coinData,
	onChainSelect,
}) => {
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
							className={`p-3 rounded-lg max-w-[80%] break-words whitespace-pre-wrap ${
								message.role === "user"
									? "bg-gray-700 text-white"
									: "bg-wormholePrimary text-black"
							}`}
						>
							{message.role === "assistant"
								? (() => {
										try {
											const parsed = JSON.parse(
												message.content
											);
											return (
												<div>
													<div>{parsed.message}</div>
													{message.showChains &&
														coinData && (
															<div className="mt-2 flex flex-wrap gap-2">
																{coinData.addresses.map(
																	(
																		addr,
																		i
																	) => (
																		<button
																			key={
																				i
																			}
																			onClick={() =>
																				onChainSelect?.(
																					addr.chain,
																					addr.address
																				)
																			}
																			className="px-3 py-1 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
																		>
																			{
																				addr.chain
																			}
																		</button>
																	)
																)}
															</div>
														)}
												</div>
											);
										} catch {
											return message.content;
										}
								  })()
								: message.content}
						</div>
					</div>
				))}
			</div>
		</AIChatBoxLayout>
	);
};

export default AIChatBox;
