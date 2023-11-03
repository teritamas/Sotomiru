import { idAuthentication } from "@/server/facades/auth/idAuthentication";
import { getUserInfo, addUserInfo } from "@/server/facades/repositories/users";

/**
 * ユーザの詳細情報を取得する
 */
export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    const uid = await idAuthentication(token);

    const user = await getUserInfo(uid);

    // ユーザが存在しない場合は作成する
    if (user == null) user = await addUserInfo(uid);

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
