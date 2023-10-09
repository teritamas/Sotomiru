import { bucket } from "../firebase";

const BINGO_CELL_IMAGE_DIR = "bingoCellImage";

/**
 * storageに画像をアップロードする
 */
export const uploadBingoCellImage = async (image: Buffer, filename: string) => {
  const file = bucket.file(BINGO_CELL_IMAGE_DIR + "/" + filename + ".png");
  try {
    await file.save(image);
    await file.setMetadata({ contentType: "image/png" });

    // アップロードが完了したら、画像のURLを返す。
    const url = `https://firebasestorage.googleapis.com/v0/b/key3-global-hackathon.appspot.com/o/bingoCellImage%2F${filename}.png?alt=media`;
    return url;
  } catch (e) {
    console.error("[uploadImage]", e);
  }
};
