import { getBingoCard } from "~/server/facades/repositories/bingoContents";

export default defineEventHandler(async (event) => {
  try {
    const bingoCardId: string | undefined = event.context.params?.roomId;
    if (!bingoCardId) {
      return {
        status: 400,
        body: {
          message: "Bad Request",
        },
      };
    }
    const bingoCard = await getBingoCard(bingoCardId);
    return bingoCard;
  } catch (e) {
    console.error(e);
  }
});
