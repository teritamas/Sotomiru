import { idAuthentication } from "~/server/facades/auth/idAuthentication";
import { updateUserInfo } from "~/server/facades/repositories/users";

/**
 * ユーザ情報を更新する
 */
export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    const uid = await idAuthentication(token);

    const body = (await readBody(event).then((b) =>
      JSON.parse(b)
    )) as UserPutRequest;

    await updateUserInfo(uid, body);

    return {
      message: "OK",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});
