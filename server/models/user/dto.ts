interface UserInfo {
  uid: string;
  name?: string;
  email?: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;

  // ユーザの各種アクション
  bingoCreationCount?: number; // ビンゴカードを作成した数
  bingoCellClearCount?: number; // ビンゴセルをクリアした数
  bingoCardClearCount?: number; // ビンゴカードをクリアした数
}
