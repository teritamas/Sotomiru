import { firestore } from "../firebase";

/**
 * ユーザ情報を取得する
 */
export const getUserInfo = async (uid: string) => {
  try {
    const querySnapshot = await firestore.collection("users").doc(uid).get();
    const userInfo = querySnapshot.data() as UserInfo;
    return userInfo;
  } catch (e) {
    console.error("[getUserInfo]", e);
  }
};

/**
 * ユーザアカウントにウォレットを紐づける
 */
export const updateUserWallet = async (
  uid: string,
  userWallet: UserWalletPutDto
) => {
  try {
    const userInfo = {
      uid: uid,
      walletAddress: userWallet.walletAddress,
      createdAt: new Date(),
      updatedAt: new Date(),

      bingoCreationCount: 0,
      bingoCellClearCount: 0,
      bingoCardClearCount: 0,
    } as UserInfo;

    const docRef = await firestore.collection("users").doc(uid);
    await docRef.set(userInfo); // 既に存在する場合は更新
  } catch (e) {
    console.error("[updateUserWallet]", e);
  }
};

/**
 * ビンゴカードを作成した回数をインクリメントする
 */
export const incrementBingoCreationCount = async (uid: string) => {
  try {
    const docRef = await firestore.collection("users").doc(uid);
    await docRef.update({
      bingoCreationCount: (await docRef.get()).data()?.bingoCreationCount + 1,
    });
  } catch (e) {
    console.error("[incrementBingoCreationCount]", e);
  }
};

/**
 * ビンゴセルをビンゴした回数をインクリメントする
 */
export const incrementBingoCellClearCount = async (uid: string) => {
  try {
    const docRef = await firestore.collection("users").doc(uid);
    await docRef.update({
      bingoCellClearCount: (await docRef.get()).data()?.bingoCellClearCount + 1,
    });
  } catch (e) {
    console.error("[incrementBingoCreationCount]", e);
  }
};

/**
 * ビンゴカードをクリアした回数をインクリメントする
 */
export const incrementBingoCardClearCount = async (uid: string) => {
  try {
    const docRef = await firestore.collection("users").doc(uid);
    await docRef.update({
      bingoCardClearCount: (await docRef.get()).data()?.bingoCardClearCount + 1,
    });
  } catch (e) {
    console.error("[incrementBingoCreationCount]", e);
  }
};
