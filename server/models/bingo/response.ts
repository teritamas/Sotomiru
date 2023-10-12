import { BingoCard } from "./dto";

export interface BingoCardsGetAllResponse {
  bingoCards: BingoCard[];
}

export interface BingoCardsGetResponse {
  bingoCard: BingoCard;
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
