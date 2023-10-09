<template>
  <div class="main">
    <BingoCardCarousel :bingoCards="bingoCards" />
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";
import { BingoCardsGetAllResponse } from "@/server/models/bingo/response";

const bingoCards = ref([] as BingoCard[]);

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
</script>
