<template>
  <div class="">
    <div class="main">
      <div class="p-3">
        <BingoCard4
          @openBingoCardDetailModal="openBingoCardDetailModal"
          :bingoCells="bingoCard?.bingoCells!"
        />
        <BingoCardDetailModal
          v-if="modalIsOpen"
          @closeBingoCardDetailModal="closeBingoCardDetailModal"
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
const bingoId = ref("");
const bingoCellId = ref("");
const bingoCard = ref(null as BingoCard | null);

// 最初の画面描画時にしりとりルームを作成
onMounted(async () => {
  // await createRoom(); // 動作確認用
  bingoCard.value = await fetchBingoCard();
});

const createRoom = async () => {
  const res = await fetch("api/bingoCard", {
    method: "POST",
  });
  const data = (await res.json()) as { message: string; bingoCardId: string };

  bingoId.value = data.bingoCardId;
};

const fetchBingoCard = async () => {
  const res = await fetch(`api/bingoCard/ae0c40aa-6617-4128-b0ea-fca29233b9b6`); // 動作確認用
  // const res = await fetch(`api/bingoCard/${bingoId.value}`);
  const data = (await res.json()) as BingoCard;
  return data;
};

const openBingoCardDetailModal = async (bingoCellIdByChild) => {
  modalIsOpen.value = true;
  bingoCellId.value = bingoCellIdByChild;
};

const closeBingoCardDetailModal = async () => {
  modalIsOpen.value = false;
};
</script>
