import {
  getAnonymousBingoCard,
  getAllBingoCardByUidNotPublic,
} from "@/server/facades/repositories/bingoContents";
import { BingoCardsGetAllResponse } from "@/server/models/bingo/response";
import { idAuthentication } from "@/server/facades/auth/idAuthentication";
import { BingoCard, BingoCardDetail } from "@/server/models/bingo/dto";
import { checkBingoOrReachLines } from "../../utils/bingoCheck";

/**
 * ビンゴカードを　全件取得する
 */
export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    let bingoCards: BingoCard[] = [];
    // uidがない場合は全件取得
    bingoCards = await getAnonymousBingoCard();
    await idAuthentication(token)
      .then(async (uid) => {
        // uidがある場合はuidでフィルタして取得
        const myBingoCards = await getAllBingoCardByUidNotPublic(uid);
        bingoCards = bingoCards.concat(myBingoCards);
      })
      .catch(async (e) => {});

    const bingoCardDetails = bingoCards.map((bingoCard) => {
      const checkBingoOrReachLinesResult = checkBingoOrReachLines(bingoCard);
      return {
        ...bingoCard,
        completeBingoLines: checkBingoOrReachLinesResult.completeBingoLines,
        reachLines: checkBingoOrReachLinesResult.reachLines,
      } as BingoCardDetail;
    });

    return {
      bingoCardDetails: bingoCardDetails,
    } as BingoCardsGetAllResponse;
  } catch (e) {
    console.error(e);
    return {
      message: "Internal Server Error",
    };
  }
});
