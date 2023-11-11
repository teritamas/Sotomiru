<template>
  <div class="block bingo-card-frame rounded-lg">
    <h1
      class="text-center tracking-wider font-normal text-xl text-gray-700"
      :class="bingoCard.name.length > 12 ? 'mb-2' : 'mb-7'"
    >
      <BingoCardCategoryIcon :bingoCardTheme="bingoCard.theme" />
      <div class="inline">
        {{ bingoCard.name }}
      </div>
    </h1>
    <div class="container">
      <div
        class="card bingo-cell-image rounded-lg border border-gray-300 bg-white"
        v-for="(bingoCell, index) in bingoCard.bingoCells"
        :key="bingoCell.id"
        :style="{ '--bg-url': `url(${bingoCell.imageUrl})` }"
      >
        <a
          class="content hover:cursor-pointer block text-center flex justify-center items-center p-1"
          :class="isReach(index) && !bingoCell.completed ? 'reach' : ''"
          @click="openBingoCardDetailModal(bingoCell.id)"
        >
          <h3 class="text-xs text-gray-900" v-if="!bingoCell.completed">
            <span v-if="isReach(index)" class="block color">リーチ！</span>
            {{ bingoCell.name }}
          </h3>
        </a>
      </div>
    </div>
    <div class="pt-2 color text-sm flex justify-between">
      <span class="flex items-center ml-2">
        <CreateUserBadge
          :currentUserUid="props.currentUserUid"
          :createdUid="bingoCard.createdUid"
          :createdUserDetail="bingoCard.createdUserDetail"
          class="pl-2"
        />
        <span class="text-xs ml-2">のビンゴカード</span>
      </span>
      <span class="mt-3">
        {{ createdAt }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/ja"; // 日本語ロケールを有効化
import { BingoCardDetail } from "~/server/models/bingo/dto";

const props = defineProps({
  bingoCard: {
    type: Object as PropType<BingoCardDetail>,
    required: true,
  },
  currentUserUid: {
    type: Object as PropType<String | undefined>,
    required: true,
  },
});

const emits = defineEmits(["openBingoCardDetailModal"]);
const openBingoCardDetailModal = async (bingoCellId: string) => {
  await emits("openBingoCardDetailModal", bingoCellId);
};
// computed プロパティを作成
const createdAt = computed(() => {
  const timestamp = props.bingoCard.createdAt.getTime as any;
  return dayjs(timestamp).locale("ja").format("YYYY/M/D HH:mm");
});

const isReach = (index: number) => {
  let cells = props.bingoCard.bingoCells;
  // 各行のビンゴマスのcompletedステータスをチェックし、すべてがtrueの場合にtrueを返す
  // 行のリーチの判定

  // 行のリーチの判定
  const row = Math.floor(index / 3); // 行番号
  const rowCells = [cells[row * 3], cells[row * 3 + 1], cells[row * 3 + 2]];
  const rowReach = rowCells.filter((cell) => cell.completed).length >= 2;

  // 列のリーチの判定
  const column = index % 3; // 列番号
  const columnCells = [cells[column], cells[column + 3], cells[column + 6]];
  const columnReach = columnCells.filter((cell) => cell.completed).length >= 2;

  // 対角線のリーチの判定
  const diagonal1 = index === 0 || index === 4 || index === 8; // 左上から右下の対角線
  const diagonal2 = index === 2 || index === 4 || index === 6; // 右上から左下の対角線
  const diagonalCells = diagonal1
    ? [cells[0], cells[4], cells[8]]
    : diagonal2
    ? [cells[2], cells[4], cells[6]]
    : [];

  const diagonalReach =
    diagonalCells.filter((cell) => cell.completed).length >= 2;

  // どれか一つでもリーチ条件を満たしていれば true を返す
  return rowReach || columnReach || diagonalReach;
};
</script>

<style scoped lang="scss">
.reach {
  background: linear-gradient(-120deg, var(--c1), #ffffff, var(--c4)) fixed;
  background-size: 800% 800%;
  animation: tada 3s infinite;
  border-radius: 7px;
}

@keyframes tada {
  0%,
  50%,
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  5%,
  10% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate(-3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate(-3deg);
  }
  15%,
  25%,
  35%,
  45% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate(3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate(3deg);
  }
  20%,
  30%,
  40% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate(-3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate(-3deg);
  }
}

.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  gap: 0.5rem;
  color: #fff;
}
.card {
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
  background: var(--bg-url);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
