import axios from "axios";
import { MintBingoTokenPutRequest } from "~/server/models/facades/contracts/contractProxy";

const API_URL = process.env.CONTRACT_PROXY_API_ENDPOINT;

export async function mintBingoToken(
  walletAddress: string,
  request: MintBingoTokenPutRequest
): Promise<any> {
  try {
    console.log(API_URL, process.env);
    const response = await axios.put(
      `${API_URL}/mint-bingo-token/${walletAddress}`,
      {
        supply: request.supply,
      },
      {
        headers: {},
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
