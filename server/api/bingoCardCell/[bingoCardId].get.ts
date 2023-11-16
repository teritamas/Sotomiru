import { getBingoCellDetail } from "~/server/facades/repositories/bingoCard/bingoCardCell";
import { BingoCellGetResponse } from "~/server/models/bingo/response";

export default defineEventHandler(async (event) => {
  try {
    const bingoCardId: string | undefined = event.context.params?.bingoCardId;
    // クエリパラメータがからbingoCellIdを取得
    const query = getQuery(event);
    const bingoCellId = query["bingoCellId"] as string;

    const bingoCellDetail = await getBingoCellDetail(bingoCardId!, bingoCellId);

    return {
      bingoCellDetail: bingoCellDetail,
    } as unknown as BingoCellGetResponse;
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});
