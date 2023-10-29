<template>
  <footer class="fixed bottom" v-if="incompleteBingoCardCount <= 3">
    <router-link
      data-tooltip-target="tooltip-default"
      class="block text-gray-500 border rounded-full border-gray-700 hover:bg-gray-200"
      to="/create"
    >
      <div class="p-3">
        <svg
          class="path"
          fill="gray"
          xmlns="http://www.w3.org/2000/svg"
          height="1.25em"
          viewBox="0 0 448 512"
        >
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </svg>
      </div>
    </router-link>
    <div
      id="tooltip-default"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
    >
      Create New Bingo
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";
import { BingoCardsGetAllResponse } from "@/server/models/bingo/response";
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();
const bingoCards = ref([] as BingoCard[]);

// 全てのビンゴカードを取得
onMounted(async () => {
  await getAllBingoCard();
});
// ビンゴカードの情報取得
const getAllBingoCard = async () => {
  const res = await fetch(`api/bingoCard`, {
    headers: {
      Authorization: `Bearer ${await currentUser.value?.getIdToken()}`,
    },
  });
  const data = (await res.json()) as BingoCardsGetAllResponse;
  bingoCards.value = data.bingoCards;
};

const incompleteBingoCardCount = computed(() =>
  countIncompleteBingoCardCount(bingoCards.value)
);

// "bingoCells" 配列内で "completed" フィールドが false のセルが1つでもある場合にカウントする関数
function countIncompleteBingoCardCount(dataArray) {
  let count = 0;

  if (Array.isArray(dataArray)) {
    for (const data of dataArray) {
      if (data && data.bingoCells && Array.isArray(data.bingoCells)) {
        // このカード内の "completed" フィールドが false のセルの数をカウント
        const falseCellCount = data.bingoCells.filter(
          (cell) => cell.completed === false
        ).length;
        if (falseCellCount > 0) {
          count += 1;
        }
      }
    }
  }

  return count;
}
</script>

<style scoped>
footer {
  border-radius: 100%;
  margin: 1rem;
  right: 2%;
  bottom: 10%;
}

@-webkit-keyframes stroke {
  0% {
    fill: #eee;
    stroke-dashoffset: 1800;
  }
  10% {
    fill: transparent;
  }
  80% {
    fill: transparent;
  }
  100% {
    fill: white;
    stroke-dashoffset: 0;
  }
}

@keyframes stroke {
  0% {
    fill: #eee;
    stroke-dashoffset: 1800;
  }
  10% {
    fill: transparent;
  }
  80% {
    fill: transparent;
  }
  100% {
    fill: white;
    stroke-dashoffset: 0;
  }
}
</style>
