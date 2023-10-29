import { idAuthentication } from "@/server/facades/auth/idAuthentication";
import { updateUserWallet } from "~/server/facades/repositories/users";

export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    const uid = await idAuthentication(token);

    const body = (await readBody(event).then((b) => JSON.parse(b))) as any;

    // DBに追加
    const userWallet = await updateUserWallet(uid, body);
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
