import { OpenAI } from "openai";
import { BingoCell } from "~/server/models/bingo/dto";
import { CreateBingoCellThemeResponse } from "~/server/models/facades/generativeai/chatgpt";
import {
  ImageDescriptionResponse,
  IsFollowingSubjectResponse,
} from "~/server/models/facades/visionai/imageDescription";

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
  const prompt = `あなたは自動車メーカーに勤めるイベントの企画者です。あなたは「車内から親しみ深い写真を撮ろうコンテスト」の、お題を考える役割を与えられました。ビンゴのタイトルは「${body.title}」、お題のテーマは「${body.theme}」です。
上記の条件を満たすお題を、${count}個提出してください.お題は以下の形式で、タイトルと説明文で構成されています。

[{
  "name": "1つ目のお題のタイトル。20文字以内",
  "description": "2つめtitleを詳細に表した文章。100字以内でお願いします。"
},
{
  "name": "2つ目のお題のタイトル。20文字以内",
  "description": "2つめtitleを詳細に表した文章。100字以内でお願いします。"
},]

キーは必ず含ませる。
JSON以外の情報は削除する。`;
  const response = await request(prompt);
  const responseJson = JSON.parse(response!) as CreateBingoCellThemeResponse[];

  return responseJson;
}

/**
 * 画像から検出したラベルとお題が一致しているかを検証する
 */
export async function validateFollowingSubject(
  bingoCell: BingoCell,
  res: ImageDescriptionResponse
) {
  try {
    const prompt = `あなたは投稿された画像が、テーマに沿っている画像化を判断する検査員です。
テーマが「${bingoCell.description}」でした。
画像に付与されたラベルとスコアは以下の通りです。ラベル名: スコアの形式で、スコアは1に近いほど、画像のメインです。
${res.labels
  .map((label) => {
    return `- ${label.name}: ${label.score}\n`;
  })
  .join(",")
  .replace(/,/g, "")}
上記の情報から投稿された画像が、テーマに沿っているかを、True/Falseと、スコアで判断して、以下の形式で返してください。

{
  "isFollowingSubject": "画像がお題に対して正しいかどうか。True/Falseのどちらか",
  "score": "画像がお題に対してどれくらい正しいか"
}

キーは必ず含ませる。
JSON以外の情報は削除する。`;
    const response = await request(prompt);
    const responseJson = JSON.parse(response!) as IsFollowingSubjectResponse[];

    return responseJson;
  } catch (e) {
    console.error(e);
  }
}

/**
 * OpenAIのChatGPTを利用して文章を生成する
 */
async function request(prompt: string) {
  try {
    console.log("生成を開始します: ", prompt);

    const result = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    const response = result.choices[0].message.content;
    console.log("生成が完了しました: ", response);

    return response;
  } catch (e) {
    console.error("生成に失敗しました: ", e);
    return null;
  }
}
