export interface ChainAddress {
	chain: string;
	address: string;
}

export interface CoinMarketCapResponse {
	name: string;
	symbol: string;
	addresses: ChainAddress[];
}
