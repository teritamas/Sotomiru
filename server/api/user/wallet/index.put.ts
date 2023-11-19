import { idAuthentication } from "@/server/facades/auth/idAuthentication";
import {
  updateUserPreGrantBingoToken,
  updateUserWallet,
} from "@/server/facades/repositories/users";
import { mintBingoToken } from "@/server/facades/contracts/contractProxy";
import { MintBingoTokenPutRequest } from "@/server/models/facades/contracts/contractProxy";

export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    const uid = await idAuthentication(token);

    const body = (await readBody(event).then((b) =>
      JSON.parse(b)
    )) as UserWalletPutDto;

    // DBに追加
    const userWallet = await updateUserWallet(uid, body);

    // アサイン前のトークンがあれば、アサインする
    if (hasNonAssignToken(userWallet)) {
      console.log("アサイン前のトークンがあるので、アサインします。");
      const request = {
        supply: userWallet?.preGrantBingoToken, // index.vueに表示される値と同じ
      } as MintBingoTokenPutRequest;
      mintBingoToken(body.walletAddress, request).then((response) => {
        console.log("トークンをアサインしました。", uid, request.supply);
        // アサインしたので、DBの値をリセット
        updateUserPreGrantBingoToken(uid, 0);
        console.log("DBの値をリセットしました。", uid);
      });
    }

    return {
      message: "OK",
      userWallet: userWallet,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});

/**
 * 付与前のトークンとウォレットアドレスが登録されているかどうか
 */
function hasNonAssignToken(userWallet: UserInfo | undefined) {
  return (
    userWallet?.preGrantBingoToken &&
    userWallet?.preGrantBingoToken > 0 &&
    userWallet?.walletAddress
  );
}
