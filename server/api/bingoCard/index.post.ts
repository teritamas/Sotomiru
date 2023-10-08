import { v4 as uuidv4 } from "uuid";
import { addBingoCard } from "~/server/facades/repositories/bingoContents";

/**
 * ビンゴカードを新規作成する
 */
export default defineEventHandler(async (event) => {
  try {
    const body: BongoCreateRequest = await readBody(event);

    const entryBingoCard = createBingoCard();

    // DBに追加
    addBingoCard(entryBingoCard);

    return {
      status: 200,
      body: {
        message: "OK",
        bingoCardId: entryBingoCard.id,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      body: {
        message: "Internal Server Error",
      },
    };
  }
});

/**
 * ビンゴカードを作成する
 */
function createBingoCard() {
  const entryBingoCard = {
    id: uuidv4(),
    name: "test",
    bingoCell: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as BingoCard;

  sampleBingoCell.forEach((element) => {
    entryBingoCard.bingoCell.push({
      id: uuidv4(),
      name: element.title,
      description: element.description,
      created_user: 0,
      created_at: new Date(),
      updated_at: new Date(),
      completed: false,
    } as BingoContent);
  });
  return entryBingoCard;
}

// サンプル用のお題
// 将来的にChatGPTが自動生成するようにする
const sampleBingoCell = [
  {
    title: "自然の美しさ",
    description: "美しい山々、湖、森林などの自然の景色を捉えた写真",
  },
  {
    title: "街の風景",
    description: "ドライブ中に通過する街や町の風景をキャッチした写真",
  },
  {
    title: "路の途中のカフェ",
    description: "道路脇にあるカフェやレストランでの風景や料理を撮影した写真",
  },
  {
    title: "休憩ポイント",
    description:
      "ドライブ中に立ち寄った休憩スポットでの風景や活動を記録した写真",
  },
  {
    title: "季節の変化",
    description: "季節ごとの変化を示す風景や植物を捉えた写真",
  },
  {
    title: "地元のアート",
    description: "地元のアート作品、壁画、彫刻などを探し、撮影した写真",
  },
  {
    title: "車のディテール",
    description: "愛車のディテールやカスタマイズをアップクローズで撮影した写真",
  },
  {
    title: "日の出または日の入り",
    description: "美しい日の出や日の入りをキャッチした写真",
  },
  {
    title: "道路のカーブ",
    description: "道路のカーブや山道の風景を楽しんで撮影した写真",
  },
];
