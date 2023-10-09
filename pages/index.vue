<template>
  <div class="main">
    <div class="p-3 bg-gray-200" style="display: flex; overflow-x: scroll">
      <a
        v-for="BingoList in bingoLists"
        :href="`/BingoCard/${BingoList.id}`"
        class="min-w-[98%] md:min-w-[70%] mr-1"
      >
        <BingoCardView
          :bingoCells="BingoList.bingoCells"
          class="bg-white hover:bg-sky-100"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";

const bingoLists = ref(null as BingoCard[] | null);

// 全てのビンゴカードを取得
onMounted(async () => {
  bingoLists.value = await getAllBingoCard();
  console.log(bingoLists.value);
});

// ビンゴカードの情報取得
const getAllBingoCard = async () => {
  const res = await fetch(`api/bingoCard`);
  const data = (await res.json()) as BingoCardsGetAllResponse;
  console.log(data);
  return data;
};
</script>
