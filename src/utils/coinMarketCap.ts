import { cmcChainMapping } from "@/constants/chainMapping";
import { CoinMarketCapResponse } from "@/types/coinMarketCap";

export function transformCoinMarketCapData(
	data: CoinMarketCapResponse
): CoinMarketCapResponse {
	// Filter and transform chain names
	const filteredAddresses = data.addresses
		.filter((addr) => cmcChainMapping[addr.chain])
		.map((addr) => ({
			...addr,
			chain: cmcChainMapping[addr.chain],
		}));

	return {
		...data,
		addresses: filteredAddresses,
	};
}
