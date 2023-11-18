import { BingoCardsGetAllResponse } from "@/server/models/bingoCard/response";
import { idAuthentication } from "@/server/facades/auth/idAuthentication";
import { BingoCard, BingoCardDetail } from "@/server/models/bingoCard/dto";
import { checkBingoOrReachLines } from "../../utils/bingoCheck";
import {
  getAllBingoCardByUidNotPublic,
  getAnonymousBingoCard,
} from "@/server/facades/repositories/bingoCard/bingoCard";

/**
 * ビンゴカードを　全件取得する
 */
export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];

    // クエリパラメータがから公開中のビンゴカードかそうでないかを確認
    const query = getQuery(event);
    const isPublicOnly = query["isPublicOnly"] as string;

    let bingoCards: BingoCard[] = [];
    if (isPublicOnly === "true") {
      // 公開中のビンゴカードのみ取得
      bingoCards = await getAnonymousBingoCard();
    } else {
      // ユーザが作成したビンゴカードを取得
      await idAuthentication(token)
        .then(async (uid) => {
          // uidがある場合はuidでフィルタして取得
          const myBingoCards = await getAllBingoCardByUidNotPublic(uid);
          bingoCards = bingoCards.concat(myBingoCards);
        })
        .catch(async (e) => {});
    }

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
