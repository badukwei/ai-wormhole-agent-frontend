export interface QueryResponse {
	valid: boolean;
	token: string | null;
	chain: string | null;
	method: string | null;
	userAddress: string | null;
	missingFields: string[];
	message: string;
}   

export interface Message {
	role: "user" | "assistant";
	content: string;
	showChains?: boolean;
	isResult?: boolean;
}

export interface QueryResult {
	chain: string;
	method: string;
	token: string;
	result: number;
	rawResult: string;
}