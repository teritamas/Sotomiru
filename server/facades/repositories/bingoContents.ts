import { BingoCard, BingoCell } from "@/server/models/bingo/dto";
import { firestore } from "../firebase";

/**
 * ビンゴカードの内容を取得する
 */
export const getBingoCard = async (bingoCardId: string) => {
  try {
    const querySnapshot = await firestore
      .collection("bingoCard")
      .doc(bingoCardId)
      .get();
    const bingoCard = querySnapshot.data() as BingoCard;
    return bingoCard;
  } catch (e) {
    console.error("[getBingoCard]", e);
  }
};

/**
 * ビンゴカードを新規作成する
 */
export const addBingoCard = async (bingoCard: BingoCard) => {
  try {
    const docRef = await firestore
      .collection("bingoCard")
      .doc(bingoCard.id)
      .set(bingoCard);
    return bingoCard.id;
  } catch (e) {
    console.error("[addBingoCard]", e);
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
