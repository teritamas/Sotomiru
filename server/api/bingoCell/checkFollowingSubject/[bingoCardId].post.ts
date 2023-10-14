import { createError, MultiPartData } from "h3";
import { getBingoCell } from "@/server/facades/repositories/bingoContents";
import { BingoCell } from "@/server/models/bingo/dto";
import { validateImage } from "@/server/facades/visionai/imageDescription";
import { ImageDescriptionResponse } from "@/server/models/facades/visionai/imageDescription";
import { validateFollowingSubject } from "~/server/facades/generativeai/chatgpt";

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
        console.log(requestBody);
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

    // ファイルをCloud Vision APIで検証
    const result: ImageDescriptionResponse = await validateImage(file);

    // ビンゴカードのセルを取得
    const bingoCell: BingoCell | undefined = await getBingoCell(
      bingoCardId!,
      requestBody!.bingoCellId
    );

    // ChatGPTで画像が一致しているかを検証
    const isFollowingSubject = await validateFollowingSubject(
      bingoCell!,
      result
    );
  } catch (e) {
    console.error(e);
  }
});
