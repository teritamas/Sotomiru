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
  theme: string;
  imageColor: string;
  bingoCells: BingoCell[];

  countOfBingoLine?: number; // ビンゴラインの数
  completed?: boolean; // ビンゴカードが完成したかどうか

  createdUid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BingoCardDetail extends BingoCard {
  completeBingoLines: CompleteBingoLine[]; // ビンゴが成立したセルの行と列を格納する
  reachLines: ReachLine[]; // リーチの成立したセルの行と列を格納する
  // completeBingoLinesとreachLinesの例
  // {row: 0, column: null} // row: 0の行がビンゴ or リーチしている、行のビンゴ or リーチの場合はcolumnはnull
  // {row: null, column: 2} // column: 2の列がビンゴ or リーチしている, 列のビンゴ or リーチの場合はrowはnull
  // {row: 0, column: 0} // 左上から右下の列のビンゴ or リーチが成立している
  // {row: 2, column: 2} // 右上から左下の列のビンゴ or リーチが成立している
}

export interface CompleteBingoLine {
  row: number | null;
  column: number | null;
}

export interface ReachLine {
  row: number | null;
  column: number | null;
}

export interface AppearBingoCompleteDto {
  appearBingoComplete: boolean; // 今の投稿でビンゴが発生したか
  appearBingoCount: number; // 発生したビンゴラインの数
  appearBingoCardComplete: boolean; // 今の投稿でビンゴカードが完成したか
}
