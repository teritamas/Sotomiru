import { getAllBingoCard } from "@/server/facades/repositories/bingoContents";

/**
 * ビンゴカードを　全件取得する
 */
export default defineEventHandler(async (event) => {
  try {
    const bingoCards = (await getAllBingoCard()) as BingoCardsGetAllResponse;
    return bingoCards;
  } catch (e) {
    console.error(e);
    return {
      message: "Internal Server Error",
    };
  }
});
