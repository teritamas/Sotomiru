<template>
  <div class="">
    <div class="main">
      <div class="p-3">
        <BingoCard4 :bingoCells="bingoCard?.bingoCells!" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";

const bingoId = ref("");
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
  const res = await fetch(`api/bingoCard/a4344b38-c5e9-44f7-a0b4-6b087a3ddb88`); // 動作確認用
  // const res = await fetch(`api/bingoCard/${bingoId.value}`);
  const data = (await res.json()) as BingoCard;
  return data;
};
</script>
