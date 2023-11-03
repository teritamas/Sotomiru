import { idAuthentication } from "@/server/facades/auth/idAuthentication";
import { getUserInfo } from "@/server/facades/repositories/users";

/**
 * ユーザの詳細情報を取得する
 */
export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    const uid = await idAuthentication(token);

    const user = await getUserInfo(uid);
    return {
      ...user,
    } as UserInfo;
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});
