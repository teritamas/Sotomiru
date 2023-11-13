export async function mintBingoToken(bingoCardId: string, bingoCellId: string) {
  // APIリクエストしてトークンを発行する
  try {
    // localhsotにPutリクエストを送る
    // リクエストのbodyには、トークンの発行に必要な情報を入れる
    const response = await fetch(
      `${process.env.CONTRACT_PROXY_API_ENDPOINT}/mint-bingo-token/${bingoCardId}/cell/${bingoCellId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("results", response);
  } catch (error) {
    console.log(error);
  }
}
