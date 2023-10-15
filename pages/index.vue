<template>
  <div class="main">
    <BingoCardCarousel
      @postBingoCellRequest="postBingoCellRequest"
      @postCheckFollowingSubject="postCheckFollowingSubject"
      :bingoCards="bingoCards"
      :isFollowingSubject="isFollowingSubject"
    />
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";
import { BingoCardsGetAllResponse } from "@/server/models/bingo/response";
import { IsFollowingSubjectResponse } from "~/server/models/facades/visionai/imageDescription";

const bingoCards = ref([] as BingoCard[]);
const isFollowingSubject = ref(null as IsFollowingSubjectResponse | null);

// 全てのビンゴカードを取得
onMounted(async () => {
  await getAllBingoCard();
});

// ビンゴカードの情報取得
const getAllBingoCard = async () => {
  const res = await fetch(`api/bingoCard`);
  const data = (await res.json()) as BingoCardsGetAllResponse;
  bingoCards.value = data.bingoCards;
};

// アップロードした画像がテーマに沿っているかを確認する。
const postCheckFollowingSubject = async (
  bingoCardId: string,
  bingoCellId: string,
  file: any
) => {
  // 前の検証結果をクリア
  console.log(bingoCardId);
  isFollowingSubject.value = null;

  // リクエストボディの作成
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId,
    } as CheckFollowingSubjectPostRequest)
  );
  const res = await fetch(
    `/api/bingoCell/checkFollowingSubject/${bingoCardId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  isFollowingSubject.value = await res.json();
};

// ビンゴカードの詳細を投稿する
// 投稿完了後、ビンゴカードの最新の状態を取得し、モーダルを閉じる
const postBingoCellRequest = async (
  bingoCardId: string,
  bingoCellId: string,
  form: { comments: string },
  file: any
) => {
  const formData = new FormData();
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId,
      ...form,
    } as BingoCellPostRequest)
  );
  formData.append("file", file);
  await useFetch(`/api/bingoCell/${bingoCardId}`, {
    method: "PUT",
    body: formData,
  });
  await getAllBingoCard();
};
</script>
