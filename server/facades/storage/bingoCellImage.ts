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
  } catch (e) {
    console.error("[uploadImage]", e);
  }
};
