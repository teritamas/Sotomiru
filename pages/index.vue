<template>
  <div class="main">
    <BingoCardCarousel
      @postBingoCellRequest="postBingoCellRequest"
      @postCheckFollowingSubject="postCheckFollowingSubject"
      :bingoCards="bingoCards"
      :isFollowingSubject="isFollowingSubject"
    />
  </div>
  <congratulations-complete
    v-if="congratulationsCompleteViewIsOpen"
    @closeCongratulationsCompleteView="closeCongratulationsCompleteView"
  />
  <congratulations-bingo
    v-if="congratulationsBingoViewIsOpen"
    @closeCongratulationsBingoView="closeCongratulationsBingoView"
  />
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";
import {
  BingoCardsGetAllResponse,
  BingoCardsGetResponse,
} from "@/server/models/bingo/response";
import { IsFollowingSubjectResponse } from "~/server/models/facades/visionai/imageDescription";

const bingoCards = ref([] as BingoCard[]);
const bingoCardId = ref("");
const isFollowingSubject = ref(null as IsFollowingSubjectResponse | null);
const congratulationsCompleteViewIsOpen = ref(true);
const congratulationsBingoViewIsOpen = ref(false);

// 全てのビンゴカードを取得
onMounted(async () => {
  const res = await getAllBingoCard();
  bingoCards.value = res.bingoCards;
});

// ビンゴカードの情報取得
const getAllBingoCard = async () => {
  const res = await fetch(`api/bingoCard`);
  const data = (await res.json()) as BingoCardsGetAllResponse;
  return data;
};

// アップロードした画像がテーマに沿っているかを確認する。
const postCheckFollowingSubject = async (bingoCellId: string, file: any) => {
  // 前の検証結果をクリア
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
  const res = await fetchBingoCard();
  // bingoCard.value = res.bingoCard;
  // modalIsOpen.value = false;
};

// ビンゴカードの情報取得
const fetchBingoCard = async () => {
  const res = await fetch(`/api/bingoCard/${bingoCardId}`);
  const data = (await res.json()) as BingoCardsGetResponse;
  return data;
};

// ビンゴカードをコンプリートしたときのお祝い画面をひらく
const openCongratulationsCompleteView = async () => {
  congratulationsCompleteViewIsOpen.value = true;
};

// ビンゴカードをコンプリートしたときのお祝い画面をとじる
const closeCongratulationsCompleteView = async () => {
  congratulationsCompleteViewIsOpen.value = false;
};

// ビンゴしたときのお祝い画面をひらく
const openCongratulationsBingoView = async () => {
  congratulationsBingoViewIsOpen.value = true;
};

// ビンゴしたときのお祝い画面をとじる
const closeCongratulationsBingoView = async () => {
  congratulationsBingoViewIsOpen.value = false;
};
</script>
