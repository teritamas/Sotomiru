<template>
  <div
    class="block p-6 bg-gradient-to-b from-cyan-400 to-blue-500 border border-gray-200 rounded-lg shadow"
  >
    <h1
      class="text-center mb-10 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl"
    >
      Memorial Bingo
    </h1>

    <div
      class="bingo-card-frame grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 grid-cols-3"
    >
      <figure
        v-for="bingoCell in props.bingoCells"
        :key="bingoCell.id"
        class="flex flex-col hover:bg-sky-100 items-center justify-center bg-white border-b border-gray-200 border-r"
      >
        <a
          @click="openBingoCardDetailModal(bingoCell.id)"
          class="hover:cursor-pointer block text-center p-4 md:p-8"
        >
          <blockquote
            class="max-w-2xl mx-auto text-gray-500 lg:mb-8 dark:text-gray-400"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ bingoCell.name }}
            </h3>
            <p class="my-4 hidden md:block">
              {{ bingoCell.description }}
            </p>
          </blockquote>
        </a>
      </figure>
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

<style>
.bingo-card-frame {
  max-width: 800px;
  margin: 0 auto;
}
</style>
