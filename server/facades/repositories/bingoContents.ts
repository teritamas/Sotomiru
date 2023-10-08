import { firestore } from "~/server/firebase";

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
    const docRef = await firestore.collection("bingoCard").add(bingoCard);
    return docRef.id;
  } catch (e) {
    console.error("[addBingoCard]", e);
  }
};
