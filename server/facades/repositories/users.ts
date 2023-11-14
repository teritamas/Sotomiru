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
 * ユーザ情報を追加する
 */
export const addUserInfo = async (uid: string) => {
  try {
    const userInfo = {
      uid: uid,
      bingoCreationCount: 0,
      bingoCellClearCount: 0,
      bingoCardClearCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserInfo;

    const docRef = await firestore.collection("users").doc(uid);
    await docRef.set({ ...userInfo });
    return userInfo;
  } catch (e) {
    console.error("[addUserInfo]", e);
  }
};

/**
 * ユーザ情報を更新する
 */
export const updateUserInfo = async (uid: string, userInfo: UserPutRequest) => {
  try {
    const docRef = await firestore.collection("users").doc(uid);
    await docRef.update({ ...userInfo }); // 既に存在する場合は更新
  } catch (e) {
    console.error("[updateUserInfo]", e);
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
      updatedAt: new Date(),
    } as UserInfo;

    const docRef = await firestore.collection("users").doc(uid);
    await docRef.update({ userInfo }); // 既に存在する場合は更新
  } catch (e) {
    console.error("[updateUserWallet]", e);
  }
};

/**
 * 付与前のトークンを更新する。
 */
export const updateUserPreGrantBingoToken = async (
  uid: string,
  preGrantBingoToken: number
) => {
  try {
    const docRef = await firestore.collection("users").doc(uid);
    await docRef.update({
      preGrantBingoToken: preGrantBingoToken,
      updatedAt: new Date(),
    });
  } catch (e) {
    console.error("[updateUserPreGrantBingoToken]", e);
  }
};

/**
 * ビンゴカードを作成した回数をインクリメントする
 */
export const incrementBingoCreationCount = async (uid: string) => {
  try {
    const docRef = await firestore.collection("users").doc(uid);
    const bingoCreationCount = (await docRef.get()).data()!.bingoCreationCount;
    const count = bingoCreationCount ? bingoCreationCount : 0;
    console.error("[incrementBingoCreationCount]", uid, count);

    await docRef.update({
      uid: uid,
      bingoCreationCount: count + 1,
      updatedAt: new Date(),
    });
  } catch (e) {
    console.error("[incrementBingoCreationCount]", e);
  }
};

/**
 * ビンゴをした回数とビンゴカードをクリアした回数をインクリメントする
 */
export const incrementBingoClearCount = async (
  uid: string,
  bingoCellClearCount: number,
  bingoCardClearCount: number
) => {
  try {
    const docRef = await firestore.collection("users").doc(uid);

    // 存在しない場合は0を入れる
    const bingoCellClearCountInDB = (await docRef.get()).data()
      ?.bingoCellClearCount;
    const bingoCellClearCountInDBCount = bingoCellClearCountInDB
      ? bingoCellClearCountInDB
      : 0;
    const bingoCardClearCountInDB = (await docRef.get()).data()
      ?.bingoCardClearCount;
    const bingoCardClearCountInDBCount = bingoCardClearCountInDB
      ? bingoCardClearCountInDB
      : 0;
    await docRef.update({
      uid: uid,
      bingoCellClearCount: bingoCellClearCountInDBCount + bingoCellClearCount,
      bingoCardClearCount: bingoCardClearCountInDBCount + bingoCardClearCount,
      updatedAt: new Date(),
    });
  } catch (e) {
    console.error("[incrementBingoCreationCount]", e);
  }
};
