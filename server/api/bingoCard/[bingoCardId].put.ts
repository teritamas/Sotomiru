import { idAuthentication } from "~/server/facades/auth/idAuthentication";
import { updateBingoCard } from "~/server/facades/repositories/bingoCard/bingoCard";

export default defineEventHandler(async (event) => {
  try {
    const token = await getHeaders(event)["authorization"];
    const _ = await idAuthentication(token);
    const bingoCardId: string | undefined = event.context.params?.bingoCardId;

    const body = await readBody(event);

    // DBにデータを保存
    updateBingoCard(bingoCardId!, body);
  } catch (e) {
    console.error(e);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});
