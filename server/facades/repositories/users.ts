import { doc } from "firebase/firestore";
import { firestore } from "../firebase";

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
    } as UserInfo;

    const docRef = await firestore.collection("users").doc(uid);
    await docRef.set(userInfo); // 既に存在する場合は更新
  } catch (e) {
    console.error("[updateUserWallet]", e);
  }
};
