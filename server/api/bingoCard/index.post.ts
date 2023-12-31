import { v4 as uuidv4 } from "uuid";
import { BingoCard } from "@/server/models/bingoCard/dto";
import { createBingoCellTheme } from "@/server/facades/generativeai/chatgpt";
import { CreateBingoCellThemeResponse } from "@/server/models/facades/generativeai/chatgpt";
import { idAuthentication } from "@/server/facades/auth/idAuthentication";
import { incrementBingoCreationCount } from "@/server/facades/repositories/users";
import { addBingoCard } from "@/server/facades/repositories/bingoCard/bingoCard";
import { BingoCell } from "@/server/models/bingoCardCell/dto";

/**
 * ビンゴカードを新規作成する
 */
export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    let uid = "";
    try {
      uid = await idAuthentication(token);
    } catch (e) {
      uid = ""; // 認証に失敗した場合は空文字を入れる.
    }

    const body = (await readBody(event).then((b) =>
      JSON.parse(b)
    )) as BingoCreateRequest;

    // ChatGPTによるお題の生成
    // 現在時刻を季節に変換する
    const japanSeason = getSeason();
    const createBingoCellThemeRequest = {
      ...body,
      japanSeason: japanSeason,
      count: 9,
    };
    const gptGenerateTheme = await createBingoCellTheme(
      createBingoCellThemeRequest
    );
    if (gptGenerateTheme == null) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
    // const gptGenerateTheme = null; // 生成に時間がかかるのでDebug時はnullを入れる
    const entryBingoCard = createBingoCard(uid, body, gptGenerateTheme);

    // DBに追加
    await addBingoCard(entryBingoCard);

    // ユーザが作成した場合、ビンゴカードの数を1増やす
    if (uid !== "") incrementBingoCreationCount(uid);
    return {
      message: "OK",
      bingoCardId: entryBingoCard.id,
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});

/**
 * ビンゴカードを作成する
 */
function createBingoCard(
  uid: string,
  body: BingoCreateRequest,
  gptGenerateTheme: CreateBingoCellThemeResponse[] | null
) {
  const entryBingoCard = {
    id: uuidv4(),
    name: body.title,
    theme: body.theme,
    destination: body.destination,
    isPublic: body.isPublic,
    bingoCells: [],
    countOfBingoLine: 0, // ビンゴラインの数
    completed: false, // ビンゴカードが完成したかどうか
    createdUid: uid,
    createdAt: new Date(),
    updatedAt: new Date(),
    clearMovieUrl: "",
  } as BingoCard;

  // GPTが正しくお題を作成できていない場合は、サンプルのお題を使用する
  const targetBingoCardTheme = gptGenerateTheme ?? sampleBingoCell;

  targetBingoCardTheme.forEach((element) => {
    entryBingoCard.bingoCells.push({
      id: uuidv4(),
      name: element.name,
      description: element.description,
      created_user: 0,
      created_at: new Date(),
      updated_at: new Date(),
      completed: false,
    } as BingoCell);
  });
  return entryBingoCard;
}

function getSeason(): string {
  // 現在の月を取得
  const month = new Date().getMonth() + 1;
  if ([3, 4, 5].includes(month)) {
    return "春";
  } else if ([6, 7, 8].includes(month)) {
    return "夏";
  } else if ([9, 10, 11].includes(month)) {
    return "秋";
  } else {
    return "冬";
  }
}

// サンプル用のお題
// 将来的にChatGPTが自動生成するようにする
const sampleBingoCell = [
  {
    name: "自然の美しさ",
    description: "美しい山々、湖、森林などの自然の景色を捉えた写真",
  },
  {
    name: "街の風景",
    description: "ドライブ中に通過する街や町の風景をキャッチした写真",
  },
  {
    name: "路の途中のカフェ",
    description: "道路脇にあるカフェやレストランでの風景や料理を撮影した写真",
  },
  {
    name: "休憩ポイント",
    description:
      "ドライブ中に立ち寄った休憩スポットでの風景や活動を記録した写真",
  },
  {
    name: "季節の変化",
    description: "季節ごとの変化を示す風景や植物を捉えた写真",
  },
  {
    name: "地元のアート",
    description: "地元のアート作品、壁画、彫刻などを探し、撮影した写真",
  },
  {
    name: "車のディテール",
    description: "愛車のディテールやカスタマイズをアップクローズで撮影した写真",
  },
  {
    name: "日の出または日の入り",
    description: "美しい日の出や日の入りをキャッチした写真",
  },
  {
    name: "道路のカーブ",
    description: "道路のカーブや山道の風景を楽しんで撮影した写真",
  },
];
