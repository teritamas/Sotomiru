import { createError, MultiPartData } from "h3";
import { BingoCell } from "@/server/models/bingo/dto";
import { IsFollowingSubjectResponse } from "@/server/models/facades/visionai/imageDescription";
import { validateFollowingSubject } from "@/server/facades/generativeai/chatgpt";
import { getBingoCell } from "~/server/facades/repositories/bingoCard/bingoCardCell";

export default defineEventHandler(async (event) => {
  try {
    // 画像がアップロードされていることを確認
    const data: MultiPartData[] | undefined = await readMultipartFormData(
      event!
    );
    if (data === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to multipart/form-data",
      });
    }

    // リクエストボディとファイルを取得
    let requestBody: CheckFollowingSubjectPostRequest | undefined = undefined;
    let file: Buffer | undefined = undefined;
    for (const d of data) {
      if (d.name === "request") {
        requestBody = {
          ...(JSON.parse(
            d.data.toString()
          ) as CheckFollowingSubjectPostRequest),
        };
      } else if (d.name === "file") {
        file = d.data;
      }
    }

    // 各パラメータが取得できなかったらエラー
    const bingoCardId: string | undefined = event.context.params?.bingoCardId;
    if (!(requestBody && file && bingoCardId)) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

    // ビンゴカードのセルを取得
    const bingoCell: BingoCell | undefined = await getBingoCell(
      bingoCardId!,
      requestBody!.bingoCellId
    );

    if (bingoCell === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to validate image",
      });
    }

    const base64Image = file.toString("base64");
    // 先頭100文字を取得
    // ChatGPTで画像がお題と一致しているかを検証
    const isFollowingSubject: IsFollowingSubjectResponse | null =
      await validateFollowingSubject(bingoCell, base64Image);

    return (
      isFollowingSubject ?? {
        score: 0.2,
        reason: "処理に失敗しました。固定で0.2を返します。",
      }
    );
  } catch (e) {
    console.error(e);
  }
});
