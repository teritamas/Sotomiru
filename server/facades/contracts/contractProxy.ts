import axios from "axios";
import { MintBingoTokenPutRequest } from "~/server/models/facades/contracts/contractProxy";

export async function mintBingoToken(
  bingoCardId: string,
  bingoCellId: string,
  request: MintBingoTokenPutRequest
) {
  // APIリクエストしてトークンを発行する
  // リクエストのbodyには、トークンの発行に必要な情報を入れる
  axios
    .put(
      `${process.env.CONTRACT_PROXY_API_ENDPOINT}/mint-bingo-token/${bingoCardId}/cell/${bingoCellId}`,
      {
        supply: request.supply,
        wallet_address: request.wallet_address,
      },
      {
        headers: {},
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
