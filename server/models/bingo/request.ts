interface BongoCreateRequest {
  title: string; // ビンゴのタイトル
  theme: string; // ビンゴのテーマ
  imageColor: string; // ビンゴの画像の色
  isPublic: boolean; // ビンゴの公開設定
}

interface BongoPutRequest {
  isPublic: boolean; // ビンゴの公開設定
}

/**
 * ビンゴセルに投稿した画像が、ビンゴのタイトルに対して正しいかどうかを確認するリクエストに利用するDTO
 */
interface CheckFollowingSubjectPostRequest {
  bingoCellId: string;
}

/**
 * ビンゴセルの投稿リクエストに利用するDTO
 */
interface BingoCellPostRequest {
  bingoCellId: string;
  comments: string;
  imageAiCheckScore: number; // 画像のAI判定のスコア[0-1]
  imageAiCheckReason: string; // imageAiCheckScoreの理由
}

/**
 * ビンゴセルの更新リクエストに利用するDTO
 */
interface UpdateBingoCellDto {
  imageUrl: string | null; // ビンゴの画像のURL
  comments: string | null; // 投稿した画像に対するコメント(オプション)
  imageAiCheckScore: number; // 画像のAI判定のスコア[0-1]
  imageAiCheckReason: string; // imageAiCheckScoreの理由
  answered_user: string | null; // 回答したユーザのID
  answered_at: Date | null; // 回答した日時
  geo_location: string | null; // 回答した場所の緯度経度
  completed: boolean; // 完了したかどうか
}
