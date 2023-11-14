import { OpenAI } from "openai";
import { BingoCell } from "@/server/models/bingo/dto";
import { CreateBingoCellThemeResponse } from "@/server/models/facades/generativeai/chatgpt";
import {
  ImageDescriptionResponse,
  IsFollowingSubjectResponse,
} from "@/server/models/facades/visionai/imageDescription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * お題を9個生成する
 */
export async function createBingoCellTheme(
  body: BongoCreateRequest,
  count: number
) {
  const prompt = `You are an event planner working for an automobile manufacturer. You have been assigned the task of coming up with a theme for a "Take a Friendly Photo from Inside a Car" contest. The title of the bingo is "${body.title}" and the theme of the subject is "${body.theme}".
Please submit ${count} of subjects that meet the above requirements. A subject consists of a title and a description in the following format.
  
[{
  "name": "Title of the first subject. 20 characters max.",
  "description": "A statement detailing the first subject, not to exceed 100 words."
},
{
  "name": "Title of the second subject. 20 characters max.",
  "description": "A statement detailing the second subject, not to exceed 100 words."
},]
  
Value is natural Japanese as Japanese would return it.
Keys must be included.
Remove any information other than JSON.
Delete code blocks.
`;
  const response = await request(prompt);
  const responseJson = JSON.parse(response!) as CreateBingoCellThemeResponse[];

  return responseJson;
}

/**
 * 画像から検出したラベルとお題が一致しているかを検証する
 */
export async function validateFollowingSubject(
  bingoCell: BingoCell,
  base64Image: string
  // res: ImageDescriptionResponse
) {
  try {
    const prompt = `You are the inspector who determines if the submitted image is an image that is in keeping with the theme. The theme was "${bingoCell.description}". 
Verify the following elements from the image 
- Is it consistent with the theme 
- Was the image taken from inside a car (if the image was likely taken from inside a car, give it a higher score) 
Be sure to return the results in the following format Json format.

{
  "score": "Please tell us how correct the image is for your subject, as an integer in the range 0~1, to the second decimal place." ,
  "reason: "Please tell us the reason for your decision in Japanese, within 200 characters. Please tell us what improvements you would like to see in it."
}

Value is natural Japanese as Japanese would return it.
Keys must be included.
Delete information other than JSON.
Delete code blocks.
`;
    const response = await requestImage(prompt, base64Image);
    const responseJson = JSON.parse(response!) as IsFollowingSubjectResponse;

    return responseJson;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * OpenAIのChatGPTを利用して文章を生成する
 */
async function request(prompt: string) {
  try {
    console.log("生成を開始します: ", prompt);

    const result = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0,
      // response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.debug(result, result.choices[0]); // デバッグ用
    const response = result.choices[0].message.content;
    console.log("生成が完了しました: ", response);

    return response;
  } catch (e) {
    console.error("生成に失敗しました: ", e);
    return null;
  }
}

/**
 * OpenAIのChatGPTを利用して、画像を入力として文章を生成する
 * https://platform.openai.com/docs/api-reference
 */
async function requestImage(prompt: string, base64Image: string) {
  try {
    console.log("生成を開始します: ", prompt);

    const result = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      // response_format: { type: "json_object" },
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    console.debug(result, result.choices[0]); // デバッグ用
    const response = result.choices[0].message.content;
    console.log("生成が完了しました: ", response);

    return response;
  } catch (e) {
    console.error("生成に失敗しました: ", e);
    return null;
  }
}
