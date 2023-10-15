<template>
  <div
    class="block border border-gray-700 bingo-card-frame rounded-lg"
    :style="{ backgroundColor: imageColor }"
  >
    <h1
      class="text-center tracking-wider mb-10 font-normal text-xl text-gray-700"
    >
      {{ props.title }}
    </h1>
    <div class="container">
      <div
        class="card bingo-cell-image rounded-lg border border-gray-700 bg-white"
        v-for="bingoCell in props.bingoCells"
        :key="bingoCell.id"
        :style="{ '--bg-url': `url(${bingoCell.imageUrl})` }"
      >
        <a
          class="content hover:cursor-pointer block text-center flex justify-center items-center p-1"
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
  title: {
    type: String,
    required: true,
  },
  imageColor: {
    type: String,
    required: true,
  },
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

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  gap: 0.5rem;
  color: #fff;
}
.card {
  /* This will come in handy later to center the contents */
  position: relative;
}

.card:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.card .content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

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
