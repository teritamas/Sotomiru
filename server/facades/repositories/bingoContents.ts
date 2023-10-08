import { BingoCard } from "@/server/models/bingo/dto";
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
    console.log(bingoCardId, querySnapshot.data());
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
