import { OpenAI } from "openai";
import { CreateBingoCellThemeResponse } from "~/server/models/facades/generativeai/chatgpt";

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
  try {
    console.log("生成を開始ます");
    const result = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0,
      messages: [
        {
          role: "user",
          content: `あなたは自動車メーカーに勤めるイベントの企画者です。あなたは「車内から親しみ深い写真を撮ろうコンテスト」の、お題を考える役割を与えられました。ビンゴのタイトルは「${body.title}」、お題のテーマは「${body.theme}」です。
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
JSON以外の情報は削除する。`,
        },
      ],
    });
    const response = result.choices[0].message.content;
    // responseをCreateBingoCellThemeResponse[]にキャスト
    const responseJson = JSON.parse(
      response!
    ) as CreateBingoCellThemeResponse[];

    console.log("生成が完了しました", responseJson);
    return responseJson;
  } catch (e) {
    console.error("生成に失敗しました", e);
    return null;
  }
}
