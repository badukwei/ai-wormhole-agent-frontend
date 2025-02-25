export interface QueryResponse {
	valid: boolean;
	token: string | null;
	chain: string | null;
	method: string | null;
	userAddress: string | null;
	ambiguous: false;
	missingFields: string[];
	message: string;
}   

export interface Message {
	role: "user" | "assistant";
	content: string;
	showChains?: boolean;
}