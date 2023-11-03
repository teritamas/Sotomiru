import {
  BingoCard,
  BingoCell,
  AppearBingoCompleteDto,
} from "@/server/models/bingo/dto";
import { firestore } from "../firebase";
import { checkBingoOrReachLines } from "~/server/utils/bingoCheck";

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
 * Uidでフィルタして全件取得
 */
export const getAllBingoCardByUid = async (uid: string) => {
  try {
    // createdUidがuidのものを取得する
    const querySnapshot = await firestore
      .collection("bingoCard")
      .where("createdUid", "==", uid)
      .orderBy("updatedAt", "desc")
      .get();
    const bingoCard = querySnapshot.docs.map((doc) => doc.data() as BingoCard);
    return bingoCard;
  } catch (e) {
    console.error("[getAllBingoCardByUid] uid: ", uid, e);
  }
};

/**
 * 全件取得
 */
export const getAllBingoCard = async () => {
  try {
    // createdUidのカラムが存在しないものを取得する
    const querySnapshot = await firestore
      .collection("bingoCard")
      .orderBy("updatedAt", "desc")
      .get();
    const bingoCard = querySnapshot.docs.map((doc) => doc.data() as BingoCard);
    return bingoCard;
  } catch (e) {
    console.error("[getAllBingoCard]", e);
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

/**
 * ビンゴカードにビンゴが成立したかを確認する
 * 直前の情報と比較して、ビンゴが成立していたら、その情報を返す。
 */
export const checkBingoComplete = async (bingoCardId: string) => {
  try {
    // bingoCardIdのドキュメントの中のbingoCellIdのドキュメントを更新する
    const docRef = await firestore
      .collection("bingoCard")
      .doc(bingoCardId)
      .get();
    const bingoCard = docRef.data() as BingoCard;

    const { completeBingoLines } = checkBingoOrReachLines(bingoCard);

    const beforeBingoLine = bingoCard.countOfBingoLine ?? 0;

    const response = {
      appearBingoComplete: beforeBingoLine < completeBingoLines.length, // 増えていたらビンゴが成立した
      appearBingoCount: completeBingoLines.length - beforeBingoLine, // 増えた数
      appearBingoCardComplete: completeBingoLines.length >= 8, // 8以上になったらビンゴカードが完成した
    } as AppearBingoCompleteDto;

    // 更新
    const updateDocRef = await firestore
      .collection("bingoCard")
      .doc(bingoCardId)
      .update({
        countOfBingoLine: completeBingoLines.length,
        completed: completeBingoLines.length >= 8,
      });

    return response;
  } catch (e) {
    console.error("[updateBingoCell]", e);
  }
};
