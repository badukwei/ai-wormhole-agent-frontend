import axios from "axios";
import {
	EthCallData,
	EthCallQueryRequest,
	EthCallQueryResponse,
	PerChainQueryRequest,
	QueryProxyMock,
	QueryRequest,
	QueryResponse,
} from "@wormhole-foundation/wormhole-query-sdk";
import { chainMapping } from "@/constants/chainMapping";
import { methodMapping } from "@/constants/queryMapping";

/**
 * use QueryProxyMock to mock Wormhole query
 * @param tokenAddress - target token contract address
 * @param chain - chain name (Ethereum, Polygon, BSC, etc.)
 * @param method - query method (totalSupply, balanceOf, symbol, name, decimals)
 * @param userAddress - if query balanceOf, need user address
 * @returns {Promise<any>} - return mock query result
 */
export async function queryMockTokenData(
	tokenAddress: string,
	chain: string,
	method: string,
	userAddress?: string
) {
	try {
		// get corresponding Wormhole Chain ID and RPC
		const chainInfo = chainMapping[chain.toLowerCase()];
		if (!chainInfo) {
			throw new Error(`Unsupported chain: ${chain}`);
		}
		const chainId = chainInfo.id;
		const rpc = chainInfo.rpc;

		// check if method exists
		if (!methodMapping[method.toLowerCase()]) {
			throw new Error(`Unsupported method: ${method}`);
		}

		// construct ABI signature
		let abiSignature = methodMapping[method.toLowerCase()];
		if (method.toLowerCase() === "balanceof") {
			if (!userAddress)
				throw new Error("balanceOf need userAddress!");
			abiSignature += userAddress.replace("0x", "").padStart(64, "0"); // convert to 32 bytes
		}

		// get latest block number
		const latestBlock: string = (
			await axios.post(rpc, {
				method: "eth_getBlockByNumber",
				params: ["latest", false],
				id: 1,
				jsonrpc: "2.0",
			})
		).data?.result?.number;

		if (!latestBlock) {
			throw new Error("Failed to fetch latest block");
		}

		// build query request
		const callData: EthCallData = {
			to: tokenAddress,
			data: abiSignature,
		};

		const request = new QueryRequest(
			0, // Nonce
			[
				new PerChainQueryRequest(
					chainId, // chain ID
					new EthCallQueryRequest(latestBlock, [callData])
				),
			]
		);

		// use QueryProxyMock to mock query
		const mock = new QueryProxyMock({ [chainId]: rpc });
		const mockData = await mock.mock(request);
		const mockQueryResponse = QueryResponse.from(mockData.bytes);
		const mockQueryResult = (
			mockQueryResponse.responses[0].response as EthCallQueryResponse
		).results[0];

		return {
			tokenAddress,
			chain,
			chainId,
			method,
			finality: chainInfo.finality,
			result: parseInt(mockQueryResult, 16), // convert 16-bit data
			rawResult: mockQueryResult,
		};
	} catch (error: any) {
		console.error("Wormhole Mock Query Error:", error.message);
		return { error: error.message };
	}
}
