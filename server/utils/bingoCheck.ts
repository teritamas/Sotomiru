import {
  BingoCard,
  CompleteBingoLine,
  ReachLine,
} from "@/server/models/bingoCard/dto";

/**
 * ビンゴかリーチが成立していることを確認する。
 */
export function checkBingoOrReachLines(bingoCard: BingoCard) {
  const bingoCardCells = bingoCard.bingoCells;
  const completeBingoLines = [];
  const reachLines = [];

  // 行のチェック
  for (let i = 0; i < 3; i++) {
    const row = bingoCardCells.slice(i * 3, i * 3 + 3);
    if (row.every((cell) => cell.completed)) {
      completeBingoLines.push({
        row: i,
        column: null,
      } as CompleteBingoLine);
    }
    // 一つだけ空白の場合は、リーチ
    if (row.filter((cell) => cell.completed).length === 2) {
      reachLines.push({
        row: i,
        column: null,
      } as ReachLine);
    }
  }

  // 列のチェック
  for (let i = 0; i < 3; i++) {
    const column = [
      bingoCardCells[i],
      bingoCardCells[i + 3],
      bingoCardCells[i + 6],
    ];
    if (column.every((cell) => cell.completed)) {
      completeBingoLines.push({
        row: null,
        column: i,
      } as CompleteBingoLine);
    }
    // 一つだけ空白の場合は、リーチ
    if (column.filter((cell) => cell.completed).length === 2) {
      reachLines.push({
        row: null,
        column: i,
      } as ReachLine);
    }
  }

  // 斜めのチェック
  const diagonal1 = [bingoCardCells[0], bingoCardCells[4], bingoCardCells[8]]; // 左上から右下
  if (diagonal1.every((cell) => cell.completed)) {
    completeBingoLines.push({
      row: 0,
      column: 0,
    } as CompleteBingoLine);
  }
  // 一つだけ空白の場合は、リーチ
  if (diagonal1.filter((cell) => cell.completed).length === 2) {
    reachLines.push({
      row: 0,
      column: 0,
    } as ReachLine);
  }
  const diagonal2 = [bingoCardCells[2], bingoCardCells[4], bingoCardCells[6]]; // 右上から左下
  if (diagonal2.every((cell) => cell.completed)) {
    completeBingoLines.push({
      row: 2, // 右
      column: 2, // 上
    } as CompleteBingoLine);
  }
  // 一つだけ空白の場合は、リーチ
  if (diagonal2.filter((cell) => cell.completed).length === 2) {
    reachLines.push({
      row: 2,
      column: 2,
    } as ReachLine);
  }

  return { completeBingoLines, reachLines };
}
