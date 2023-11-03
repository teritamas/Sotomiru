import { createError, MultiPartData } from "h3";
import { v4 as uuidv4 } from "uuid";
import {
  checkBingoComplete,
  updateBingoCell,
} from "@/server/facades/repositories/bingoContents";
import { uploadBingoCellImage } from "@/server/facades/storage/bingoCellImage";
import fs from "fs";
import { BingoCellPutResponse as BingoCellPutResponse } from "~/server/models/bingo/response";
import { idAuthentication } from "~/server/facades/auth/idAuthentication";
import { incrementBingoClearCount } from "~/server/facades/repositories/users";

export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    const uid = await idAuthentication(token);

    if (event === undefined || uid === undefined) {
      return createError({
        statusCode: 400,
        statusMessage: "Failed to read body",
      });
    }

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
    let requestBody: BingoCellPostRequest | undefined = undefined;
    let file: Buffer | undefined = undefined;
    for (const d of data) {
      if (d.name === "request") {
        requestBody = {
          ...JSON.parse(d.data.toString()),
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

    // ファイルをCloud Storageに保存
    const fileId = uuidv4();
    const imageUrl = await uploadImage(file, fileId);

    // DBにデータを保存
    const updateDto = {
      imageUrl: imageUrl,
      comments: requestBody.comments,
      answered_user: uid, // 暫定値
      answered_at: new Date(),
      geo_location: null, // 利用するか不明なのでnull
      completed: true,
    } as UpdateBingoCellDto;
    await updateBingoCell(bingoCardId, requestBody.bingoCellId, updateDto);

    // 投稿後のビンゴカードにビンゴが成立しているかチェック
    const isBingoCompleteDto = await checkBingoComplete(bingoCardId);

    // ビンゴカードとセルのクリア数を更新
    incrementBingoClearCount(
      uid,
      isBingoCompleteDto?.appearBingoCount || 0, // 発生したビンゴの数
      isBingoCompleteDto?.appearBingoCardComplete ? 1 : 0 // クリアした時は1
    );

    return isBingoCompleteDto as BingoCellPutResponse;
  } catch (e) {
    console.error(e);
    return {
      message: "Internal Server Error",
    };
  }
});

/**
 * file画像を変換してstorageにアップロードする
 */
async function uploadImage(file: Buffer, fileId: string) {
  console.log("[uploadImage]aaa", file);

  fs.writeFileSync("temp.png", file); // デバッグ様にローカルに保存
  return await uploadBingoCellImage(file, fileId);
}
