interface BongoCreateRequest {
  title: string; // ビンゴのタイトル
  theme: string; // ビンゴのテーマ
  imageColor: string; // ビンゴの画像の色
  isPublic: boolean; // ビンゴの公開設定
}

interface BongoPutRequest {
  isPublic: boolean; // ビンゴの公開設定
}
