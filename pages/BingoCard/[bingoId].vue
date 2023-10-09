<template>
  <div class="">
    <div class="main">
      <div class="p-3">
        {{ bingoCard }}
        <BingoCardView
          @openBingoCardDetailModal="openBingoCardDetailModal"
          :bingoCells="bingoCard?.bingoCells!"
        />
        <BingoCardDetailModal
          v-if="modalIsOpen"
          @closeBingoCardDetailModal="closeBingoCardDetailModal"
          @postBingoCellRequest="postBingoCellRequest"
          :bingoCells="bingoCard?.bingoCells!"
          :bingoCellId="bingoCellId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";

const modalIsOpen = ref(false);
const bingoCardId = ref("");
const bingoCellId = ref("");
const bingoCard = ref(null as BingoCard | null);

// 最初の画面描画時にビンゴルームを作成
onMounted(async () => {
  // await createBingoCard(); // 動作確認用
  bingoCardId.value = "006bb342-31aa-4fd8-a0c7-af089858bd6d";
  bingoCard.value = await fetchBingoCard();
});

// 将来的にTopページに移動する
const createBingoCard = async () => {
  const res = await fetch("api/bingoCard", {
    method: "POST",
  });
  const data = (await res.json()) as { message: string; bingoCardId: string };

  bingoCardId.value = data.bingoCardId;
};

// ビンゴカードの情報取得
const fetchBingoCard = async () => {
  const res = await fetch(`api/bingoCard/${bingoCardId.value}`);
  const data = (await res.json()) as BingoCard;
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
  await useFetch(`api/bingoCell/${bingoCardId.value}`, {
    method: "PUT",
    body: formData,
  });
  bingoCard.value = await fetchBingoCard();
  modalIsOpen.value = false;
};
</script>
