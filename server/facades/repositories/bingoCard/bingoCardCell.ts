import { BingoCard } from "@/server/models/bingoCard/dto";
import { firestore } from "../../firebase";
import { BingoCellDetail } from "@/server/models/bingoCardCell/dto";

/**
 * ビンゴセルの詳細を取得する
 */
export const getBingoCellDetail = async (
  bingoCardId: string,
  bingoCellId: string
): Promise<BingoCellDetail> => {
  try {
    const docRef = await firestore
      .collection("bingoCard")
      .doc(bingoCardId)
      .get();
    const bingoCard = docRef.data() as BingoCard;
    const bingoCell = bingoCard.bingoCells.find(
      (cell) => cell.id === bingoCellId
    );

    const bingoCardDetail = { ...bingoCell } as BingoCellDetail;

    if (bingoCell?.completed) {
      // ユーザの情報を付与する
      const userDocRef = await firestore
        .collection("users")
        .doc(bingoCell?.answered_user!)
        .get();
      const userInfo = userDocRef.data() as UserInfo;
      bingoCardDetail.answeredUserDetail = userInfo;
    }

    return bingoCardDetail;
  } catch (e) {
    console.error("[getBingoCellDetail]", e);
    throw e;
  }
};

/**
 * ビンゴカードのセルを取得する
 */
export const getBingoCell = async (
  bingoCardId: string,
  bingoCellId: string
) => {
  try {
    const docRef = await firestore
      .collection("bingoCard")
      .doc(bingoCardId)
      .get();
    const bingoCard = docRef.data() as BingoCard;
    const bingoCells = bingoCard.bingoCells;
    const bingoCell = bingoCells.find((cell) => cell.id === bingoCellId);
    return bingoCell;
  } catch (e) {
    console.error("[getBingoCell]", e);
  }
};

/**
 * ビンゴカードのセルを更新する
 */
export const updateBingoCell = async (
  bingoCardId: string,
  bingoCellId: string,
  updateBingoCellDto: UpdateBingoCellDto
) => {
  try {
    // bingoCardIdのドキュメントの中のbingoCellIdのドキュメントを更新する
    const docRef = await firestore
      .collection("bingoCard")
      .doc(bingoCardId)
      .get();
    const bingoCard = docRef.data() as BingoCard;

    // 更新対象のセルを探して更新する
    const bingoCells = bingoCard.bingoCells;
    const newBingoCells = bingoCells.map((cell) => {
      if (cell.id === bingoCellId) {
        cell = {
          ...cell,
          ...updateBingoCellDto,
        };
      }
      return cell;
    });

    // 更新
    const updateDocRef = await firestore
      .collection("bingoCard")
      .doc(bingoCardId)
      .update({
        bingoCells: newBingoCells,
      });

    return bingoCellId;
  } catch (e) {
    console.error("[updateBingoCell]", e);
  }
};
