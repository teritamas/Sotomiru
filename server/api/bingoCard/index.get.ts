import { getAllBingoCard } from "@/server/facades/repositories/bingoContents";
import { BingoCardsGetAllResponse } from "@/server/models/bingo/response";

/**
 * ビンゴカードを　全件取得する
 */
export default defineEventHandler(async (event) => {
  try {
    const bingoCards = await getAllBingoCard();
    return {
      bingoCards: bingoCards,
    } as BingoCardsGetAllResponse;
  } catch (e) {
    console.error(e);
    return {
      message: "Internal Server Error",
    };
  }
});
