interface BingoCreateRequest {
  title: string; // ビンゴのタイトル
  theme: string; // ビンゴのテーマ
  isPublic: boolean; // ビンゴの公開設定
  destination: string; // 旅行の目的地
}

interface BingoPutRequest {
  isPublic: boolean; // ビンゴの公開設定
}
