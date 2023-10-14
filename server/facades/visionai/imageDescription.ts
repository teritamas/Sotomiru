import {
  ImageDescriptionResponse,
  VisionAiLabel,
} from "@/server/models/facades/visionai/imageDescription";
import { visionClient } from "../firebase";

export async function validateImage(file: Buffer) {
  try {
    const [result] = await visionClient.labelDetection(file);
    const labels = result.labelAnnotations;
    const response = labels!.map((label) => {
      return {
        name: label.description!,
        score: label.score!,
      } as VisionAiLabel;
    });
    return {
      labels: response,
      description: "test", // 画像から説明文を取得することができたら入れる。
    } as ImageDescriptionResponse;
  } catch (e) {
    console.error(e);
  }
}
