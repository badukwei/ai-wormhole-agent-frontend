// import { wormhole } from "@wormhole-foundation/sdk";
// import solana from "@wormhole-foundation/sdk/solana";

// /**
//  * 初始化 Wormhole SDK（Testnet）
//  */
// export const initWormhole = async () => {
// 	const wh = await wormhole("Testnet", [solana], {
// 		chains: {
// 			Solana: {
// 				contracts: {
// 					coreBridge: "11111111111111111111111111111",
// 				},
// 				rpc: "https://api.devnet.solana.com",
// 			},
// 		},
// 	});
// 	return wh;
// };

// export const getSolanaGasPrice = async () => {
// 	const wh = await initWormhole();
// 	try {
// 		const gasPrice = await wh.getChain("Solana").;
// 		console.log(`Solana Gas 費用: ${gasPrice}`);
// 		return gasPrice;
// 	} catch (error) {
// 		console.error("獲取 Solana Gas 費失敗:", error);
// 		return null;
// 	}
// };