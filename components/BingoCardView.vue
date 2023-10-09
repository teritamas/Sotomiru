<template>
  <div class="block border border-gray-700 bingo-card-frame">
    <h1
      class="text-center tracking-wider mb-10 font-normal text-xl text-gray-700"
    >
      NATURE BINGO
    </h1>
    <div
      class="bingo-cell-frame grid mb-8 rounded-lg md:mb-12 grid-cols-3 justify-center items-center"
    >
      <div
        v-for="bingoCell in props.bingoCells"
        :key="bingoCell.id"
        class="w-24 h-24 flex justify-center items-center border rounded-2xl border-gray-700 my-1 bg-white bingo-cell-image"
        :style="{ '--bg-url': `url(${bingoCell.imageUrl})` }"
      >
        <a
          class="hover:cursor-pointer block text-center flex justify-center items-center p-2 w-24 h-24"
          @click="openBingoCardDetailModal(bingoCell.id)"
        >
          <h3 class="text-lg font-semibold text-gray-900">
            {{ bingoCell.name }}
          </h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCell } from "@/server/models/bingo/dto";

const props = defineProps({
  bingoCells: {
    type: Array as PropType<BingoCell[]>,
    required: true,
  },
});

const emits = defineEmits(["openBingoCardDetailModal"]);
const openBingoCardDetailModal = async (bingoCellId: string) => {
  await emits("openBingoCardDetailModal", bingoCellId);
};
</script>

<style scoped>
.bingo-cell-image {
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    var(--bg-url);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
