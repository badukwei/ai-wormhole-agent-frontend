"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { BACKEND_URL } from "@/config";

interface Message {
	role: "user" | "ai";
	content: string;
}

interface QueryResponse {
	valid: boolean;
	token: string;
	chain: string;
	method: string;
	userAddress: string | null;
	ambiguous: boolean;
}

interface APIResponse {
	result: string; // JSON string of QueryResponse
}

enum QueryStep {
	USER_INPUT = 0, // Step 0: User provides input
	EXTRACT_QUERY = 1, // Step 1: Extract query parameters using AI
	REFINE_QUERY = 2, // Step 2: Handle missing fields (error-handling)
	READY_TO_EXECUTE = 3, // Step 3: Query is complete and ready for execution
}

export function useAIChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [queryData, setQueryData] = useState<QueryResponse | null>(null);
	const [queryStep, setQueryStep] = useState<QueryStep>(QueryStep.USER_INPUT);

    console.log("queryData", queryData);

	const extractQueryMutation = useMutation({
		mutationFn: async (query: string) => {
			const response = await fetch(`${BACKEND_URL}/openai/query-basic`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			const data: APIResponse = await response.json();
			// Parse the result string into a QueryResponse object
			console.log("data.result", data.result);
			const parsedResult: QueryResponse = JSON.parse(data.result);
			return parsedResult;
		},
		onSuccess: (data) => {
			const responseMessage = JSON.stringify(data);
			console.log("responseMessage", responseMessage);
			setQueryData(data);
			setQueryStep(QueryStep.REFINE_QUERY);
			setMessages((prev) => [
				...prev,
				{ role: "ai", content: responseMessage },
			]);
		},
		onError: (error) => {
			console.error("Extract query error:", error);
			setQueryData(null);
			setMessages((prev) => [
				...prev,
				{
					role: "ai",
					content:
						"Sorry, there was an error processing your request.",
				},
			]);
		},
	});

    const refineQueryMutation = useMutation({
		mutationFn: async (query: string) => {
			const response = await fetch(
				`${BACKEND_URL}/openai/error-handling`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ query }),
				}
			);

			if (!response.ok) throw new Error("Failed to refine query");

			const data: APIResponse = await response.json();
			console.log("data", data);
			return JSON.parse(data.result) as QueryResponse;
		},
		onSuccess: (refinedQuery) => {
			setQueryData(refinedQuery);
			setMessages((prev) => [
				...prev,
				{ role: "ai", content: JSON.stringify(refinedQuery, null, 2) },
			]);
		},
		onError: (error) => {
			console.error("Query refinement error:", error);
			setMessages((prev) => [
				...prev,
				{ role: "ai", content: "Error refining query." },
			]);
		},
	});

	const sendQuery = async (message: string) => {
		console.log("message", message);
		setMessages((prev) => [...prev, { role: "user", content: message }]);

		if (queryStep === QueryStep.USER_INPUT) {
			console.log("queryStep", queryStep);
			// Step 1: Extract Query
			setQueryStep(QueryStep.EXTRACT_QUERY);
			await extractQueryMutation.mutateAsync(message);
		} else if (queryStep === QueryStep.REFINE_QUERY && queryData) {
			console.log("queryData", queryData);
			// Step 2: Handle Missing Fields
			setQueryStep(QueryStep.READY_TO_EXECUTE);
			await refineQueryMutation.mutateAsync(JSON.stringify(queryData));
		}
	};


	return {
		messages,
		sendQuery,
		queryData,
		queryStep,
		isLoading:
			extractQueryMutation.isPending || refineQueryMutation.isPending,
		error: extractQueryMutation.error || refineQueryMutation.error,
	};
}

