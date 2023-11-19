export interface CreateBingoCellThemeRequest {
  title: string; // ビンゴのタイトル
  theme: string; // ビンゴのテーマ
  isPublic: boolean; // ビンゴの公開設定
  destination: string; // 旅行の目的地

  japanSeason: string; // 日本の季節
  count: number; // お題の数
}

export interface CreateBingoCellThemeResponse {
  name: string;
  description: string;
}
