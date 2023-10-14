import { ImageDescriptionResponse } from "@/server/models/facades/visionai/imageDescription";

export async function validateImage(file: Buffer) {
  return {
    labels: [
      {
        name: "ドライブ",
        score: 1,
      },
      {
        name: "飛行機",
        score: 0.1,
      },
      {
        name: "レストラン",
        score: 0.1,
      },
    ],
    description: "test",
  } as ImageDescriptionResponse;
}
