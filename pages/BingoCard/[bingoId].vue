<template>
  <div class="">
    <div class="main">
      <div class="p-3">
        <BingoCardView
          @openBingoCardDetailModal="openBingoCardDetailModal"
          :title="bingoCard?.name!"
          :imageColor="bingoCard?.imageColor!"
          :bingoCells="bingoCard?.bingoCells!"
        />
        <BingoCardDetailModal
          v-if="modalIsOpen"
          @closeBingoCardDetailModal="closeBingoCardDetailModal"
          @postBingoCellRequest="postBingoCellRequest"
          @postCheckFollowingSubject="postCheckFollowingSubject"
          :bingoCells="bingoCard?.bingoCells!"
          :bingoCellId="bingoCellId"
          :isFollowingSubject="isFollowingSubject"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";
import { BingoCardsGetResponse } from "~/server/models/bingo/response";
import { IsFollowingSubjectResponse } from "~/server/models/facades/visionai/imageDescription";
const route = useRoute();

const bingoCardId = route.params.bingoId as string;
const modalIsOpen = ref(false);
const bingoCellId = ref("");
const bingoCard = ref(null as BingoCard | null);
const isFollowingSubject = ref(null as IsFollowingSubjectResponse | null);

// 最初の画面描画時にビンゴルームを作成
onMounted(async () => {
  const res = await fetchBingoCard();
  bingoCard.value = res.bingoCard;
  console.log(res);
});

// ビンゴカードの情報取得
const fetchBingoCard = async () => {
  const res = await fetch(`/api/bingoCard/${bingoCardId}`);
  const data = (await res.json()) as BingoCardsGetResponse;
  return data;
};

// ビンゴカードの詳細を開く
const openBingoCardDetailModal = async (bingoCellIdByChild: string) => {
  modalIsOpen.value = true;
  bingoCellId.value = bingoCellIdByChild;
};

// ビンゴカードの詳細を閉じる
const closeBingoCardDetailModal = async () => {
  modalIsOpen.value = false;
};

// アップロードした画像がテーマに沿っているかを確認する。
const postCheckFollowingSubject = async (file: any) => {
  // 前の検証結果をクリア
  isFollowingSubject.value = null;

  // リクエストボディの作成
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId.value,
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
const postBingoCellRequest = async (form: { comments: string }, file: any) => {
  const formData = new FormData();
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId.value,
      ...form,
    } as BingoCellPostRequest)
  );
  formData.append("file", file);
  await useFetch(`/api/bingoCell/${bingoCardId}`, {
    method: "PUT",
    body: formData,
  });
  const res = await fetchBingoCard();
  bingoCard.value = res.bingoCard;
  modalIsOpen.value = false;
};
</script>
