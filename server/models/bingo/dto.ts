export interface BingoCell {
  id: string;
  name: string; // ビンゴの内容
  description: string; // ビンゴの説明
  created_user: number; // 作成したユーザのID
  created_at: Date; // 作成日時
  updated_at: Date; // 更新日時

  // ユーザの回答に関する情報
  imageUrl: string | null; // ビンゴの画像のURL
  comments: string | null; // 投稿した画像に対するコメント(オプション)
  answered_user: number | null; // 回答したユーザのID
  answered_at: Date | null; // 回答した日時
  geo_location: string | null; // 回答した場所の緯度経度
  completed: boolean; // 完了したかどうか
}

export interface BingoCard {
  id: string;
  name: string;
  bingoCells: BingoCell[];
  createdAt: Date;
  updatedAt: Date;
}