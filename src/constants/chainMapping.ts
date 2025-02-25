/**
 * Wormhole Query Chain ID & RPC Nodes
 */
export const chainMapping: {
	[key: string]: { id: number; rpc: string; finality: string };
} = {
	ethereum: {
		id: 2,
		rpc: "https://ethereum.publicnode.com",
		finality: "128 blocks",
	},
	bsc: {
		id: 4,
		rpc: "https://bsc-dataseed.binance.org",
		finality: "128 blocks",
	},
	polygon: { id: 5, rpc: "https://polygon-rpc.com", finality: "128 blocks" },
	avalanche: {
		id: 6,
		rpc: "https://api.avax.network/ext/bc/C/rpc",
		finality: "32 blocks",
	},
	oasis_emerald: {
		id: 7,
		rpc: "https://emerald.oasis.dev",
		finality: "archive",
	},
	fantom: { id: 10, rpc: "https://rpc.ftm.tools", finality: "16 blocks" },
	karura: {
		id: 11,
		rpc: "https://karura-rpc.aca-api.network",
		finality: "archive",
	},
	acala: {
		id: 12,
		rpc: "https://acala-polkadot.api.onfinality.io/public",
		finality: "archive",
	},
	kaia: { id: 13, rpc: "https://rpc.kaia.network", finality: "128 blocks" },
	celo: { id: 14, rpc: "https://forno.celo.org", finality: "128 blocks" },
	moonbeam: {
		id: 16,
		rpc: "https://rpc.api.moonbeam.network",
		finality: "256 blocks",
	},
	arbitrum: {
		id: 23,
		rpc: "https://arb1.arbitrum.io/rpc",
		finality: "6742 blocks",
	},
	optimism: {
		id: 24,
		rpc: "https://mainnet.optimism.io",
		finality: "128 blocks",
	},
	base: { id: 30, rpc: "https://mainnet.base.org", finality: "archive" },
};


/**
 * Mapping CMC Chain Names to Wormhole Chain Mapping Keys
 */
export const cmcChainMapping: { [key: string]: string } = {
	"Ethereum": "ethereum",
	"BNB Smart Chain (BEP20)": "bsc",
	"Polygon": "polygon",
	"Avalanche C-Chain": "avalanche",
	"Oasis Emerald": "oasis_emerald",
	"Fantom": "fantom",
	"Karura": "karura",
	"Acala": "acala",
	"KAIA": "kaia",
	"Celo": "celo",
	"Moonbeam": "moonbeam",
	"Arbitrum": "arbitrum",
	"Optimism": "optimism",
	"Base": "base",
};