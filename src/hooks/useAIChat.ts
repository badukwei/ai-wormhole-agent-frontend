"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { BACKEND_URL } from "@/config";
import { CoinMarketCapResponse } from "@/types/coinMarketCap";
import { Message, QueryResponse } from "@/types/queryAI";
import { transformCoinMarketCapData } from "@/utils/coinMarketCap";

const defaultQueryData: QueryResponse = {
	valid: false,
	token: null,
	chain: null,
	method: null,
	userAddress: null,
	ambiguous: false,
	missingFields: [],
	message: "",
};

export function useAIChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [queryData, setQueryData] = useState<QueryResponse>(defaultQueryData);
	const [coinData, setCoinData] = useState<CoinMarketCapResponse | null>(
		null
	);

	const coinSearchMutation = useMutation({
		mutationFn: async (token: string) => {
			const response = await fetch(
				`${BACKEND_URL}/coinmarketcap/search?token=${token}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) throw new Error("Failed to fetch coin data");
			return response.json();
		},
		onSuccess: (data) => {
			const transformedData = transformCoinMarketCapData(data);

			setCoinData(transformedData);
			setMessages((prev) => [
				...prev.map((msg) => ({ ...msg, showChains: false })),
				{
					role: "assistant",
					content: JSON.stringify({
						message: `Found ${transformedData.name} (${transformedData.symbol}) with ${transformedData.addresses.length} supported chain addresses`,
						...transformedData,
					}),
					showChains: true,
				},
			]);
		},
		onError: (error) => {
			console.error("Coin search error:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: JSON.stringify({
						message:
							"Sorry, couldn't find information for this token.",
					}),
				},
			]);
		},
	});

	const queryMutation = useMutation({
		mutationFn: async (messages: Message[]) => {
			const response = await fetch(`${BACKEND_URL}/openai/query-basic`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messages }),
			});

			if (!response.ok) throw new Error("Failed to send message");
			const data: { result: string } = await response.json();
			return JSON.parse(data.result) as QueryResponse;
		},
		onSuccess: (data) => {
			setQueryData(data);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: JSON.stringify(data),
				},
			]);

			if (data.valid && data.token) {
				coinSearchMutation.mutate(data.token);
			}
		},
		onError: (error) => {
			console.error("Extract query error:", error);
			setQueryData({
				valid: false,
				token: null,
				chain: null,
				method: null,
				userAddress: null,
				ambiguous: false,
				missingFields: [],
				message: "Sorry, there was an error processing your request.",
			});
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"Sorry, there was an error processing your request.",
				},
			]);
		},
	});

	const sendQuery = async (message: string) => {
		setMessages((prev) => [...prev, { role: "user", content: message }]);
		await queryMutation.mutateAsync([
			...messages,
			{ role: "user", content: message },
		]);
	};

	return {
		messages,
		sendQuery,
		queryData,
		coinData,
		queryStatus: {
			isLoading: queryMutation.isPending,
			error: queryMutation.error,
		},
		coinStatus: {
			isLoading: coinSearchMutation.isPending,
			error: coinSearchMutation.error,
		},
	};
}
