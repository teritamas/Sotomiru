<template>
  <footer class="fixed bottom" v-if="isBingoCardCreatable">
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
import { BingoCardDetail } from "@/server/models/bingo/dto";

const props = defineProps({
  bingoCardDetails: {
    default: [],
    type: Array as PropType<BingoCardDetail[]>,
  },
});

const maxIncompleteBingoCardCount = 3;

// 新しいビンゴカードを作成できるかどうか
const isBingoCardCreatable = computed(() => {
  return true; // TODO: 作成可能なビンゴカード数を超えたときにfalseを返すようにする
  let inCompletedBingoCardCount = 0;
  if (!Array.isArray(props.bingoCardDetails)) return true;

  for (const bingoCardDetail of props.bingoCardDetails) {
    if (
      bingoCardDetail &&
      bingoCardDetail.bingoCells &&
      Array.isArray(bingoCardDetail.bingoCells)
    ) {
      // completed == falseが1つでもあれば、未完了のビンゴカードとしてカウントする
      const completedCard =
        bingoCardDetail.bingoCells.filter((cell) => cell.completed).length ===
        9;
      if (!completedCard) inCompletedBingoCardCount += 1;
      if (inCompletedBingoCardCount >= maxIncompleteBingoCardCount)
        return false; // 閾値を超えたときはそれ以上、カウントする必要がないのでreturnする
    }
  }

  // ループを抜ける = 作成可能なビンゴカード数を超えていないということなので、trueを返す
  return true;
});
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
