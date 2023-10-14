export interface IsFollowingSubjectResponse {
  isFollowingSubject: boolean; // 画像がお題に対して正しいかどうかのTrue/False
  score: number; // 画像がお題に対してどれくらい正しいか
}

export interface ImageDescriptionResponse {
  labels: Label[];
  description: string;
}

export interface Label {
  name: string;
  score: number;
}
