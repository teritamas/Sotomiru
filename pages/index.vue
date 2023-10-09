<template>
  <div class="main">
    <div class="p-3 bg-gray-200" style="display: flex; overflow-x: scroll">
      <a
        v-for="bingoCard in bingoLists"
        :href="`/BingoCard/${bingoCard.id}`"
        class="min-w-[98%] md:min-w-[70%] mr-1"
      >
        <BingoCardView
          :title="bingoCard.name"
          :bingoCells="bingoCard.bingoCells"
          class="bg-white hover:bg-sky-100"
        />
      </a>
    </div>

    <bingo-card-carousel />
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";
import { BingoCardsGetAllResponse } from "@/server/models/bingo/response";

const bingoLists = ref(null as BingoCard[] | null);

// 全てのビンゴカードを取得
onMounted(async () => {
  const res = await getAllBingoCard();
  bingoLists.value = res.bingoCards;
});

// ビンゴカードの情報取得
const getAllBingoCard = async () => {
  const res = await fetch(`api/bingoCard`);
  const data = (await res.json()) as BingoCardsGetAllResponse;
  return data;
};
</script>
