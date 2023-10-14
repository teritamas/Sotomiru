export interface IsFollowingSubjectResponse {
  isFollowingSubject: boolean; // 画像がお題に対して正しいかどうかのTrue/False
  score: number; // 画像がお題に対してどれくらい正しいか
}

export interface ImageDescriptionResponse {
  labels: VisionAiLabel[];
  description: string;
}

export interface VisionAiLabel {
  name: string;
  score: number;
}
