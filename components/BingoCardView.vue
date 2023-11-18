<template>
  <div
    class="block bingo-card-frame rounded-lg border border-gray-800"
    :class="bingoCard.completed ? 'bingo-card' : ''"
  >
    <h1
      class="text-center tracking-wider font-normal text-xl text-gray-700"
      :class="bingoCard.name.length > 12 ? 'mb-2' : 'mb-7'"
    >
      <BingoCardCategoryIcon :bingoCardTheme="bingoCard.theme" />
      <div class="inline">
        {{ bingoCard.name }}
      </div>
    </h1>
    <div
      class="movie-button text-center"
      v-if="isDisplayCenter && bingoCard.completed"
      @click="openMovieModal(bingoCard.clearMovieUrl)"
    >
      <span v-if="bingoCard.clearMovieUrl" class="text-xs font-bold">
        \ Click Me /</span
      >
      <svg viewBox="0 0 512 512" class="movie-icon">
        <g>
          <path
            d="M485.234,69.25H26.766C11.984,69.25,0,81.234,0,96v319.984c0,14.797,11.984,26.766,26.766,26.766h458.469   c14.781,0,26.766-11.969,26.766-26.766V96C512,81.234,500.016,69.25,485.234,69.25z M383.594,373.828   c0,8.5-6.906,15.422-15.422,15.422H66.844c-8.531,0-15.438-6.922-15.438-15.422V144.469c0-8.516,6.906-15.422,15.438-15.422   h301.328c8.516,0,15.422,6.906,15.422,15.422V373.828z M473.188,286.438h-45.125v-45.125h45.125V286.438z M449.047,186.766   c-13.906,0-25.172-11.281-25.172-25.188c0-13.922,11.266-25.188,25.172-25.188s25.172,11.266,25.172,25.188   C474.219,175.484,462.953,186.766,449.047,186.766z"
          />
          <path
            d="M171.578,201.078c-0.672-0.406-1.531-0.422-2.234-0.031c-0.672,0.391-1.094,1.125-1.094,1.922v56.172v56.188   c0,0.797,0.422,1.531,1.094,1.922c0.703,0.391,1.563,0.375,2.234-0.031l94.109-56.172c0.672-0.391,1.078-1.125,1.078-1.906   c0-0.766-0.406-1.5-1.078-1.891L171.578,201.078z"
          />
        </g>
      </svg>
      <span v-if="bingoCard.clearMovieUrl" class="text-xs font-bold">
        動画を見る
      </span>
      <span v-if="!bingoCard.clearMovieUrl" class="text-xs font-bold">
        動画準備中
      </span>
    </div>

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

    <!-- 公開ビンゴカードとするか -->
    <div class="pt-2">
      <label class="relative inline-flex items-center cursor-pointer mb-3 m">
        <input
          type="checkbox"
          v-model="bingoCard.isPublic"
          @change="emits('changeBingoViewSetting', bingoCard.isPublic)"
          :disabled="bingoCard.createdUid !== props.currentUserUid"
          class="sr-only peer"
        />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span
          class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ bingoCardPublicMessage }}</span
        >
      </label>
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
  <MovieModal
    v-if="movieModalIsOpen && bingoCard.clearMovieUrl"
    :clearMovieUrl="bingoCard.clearMovieUrl"
    :bingoCard="bingoCard"
    @closeMovieModal="closeMovieModal"
  />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/ja"; // 日本語ロケールを有効化
import { BingoCardDetail } from "@/server/models/bingo/dto";

const props = defineProps({
  bingoCard: {
    type: Object as PropType<BingoCardDetail>,
    required: true,
  },
  currentUserUid: {
    type: Object as PropType<String | undefined>,
    required: true,
  },
  isDisplayCenter: {
    type: Boolean,
  },
});

const emits = defineEmits([
  "openBingoCardDetailModal",
  "changeBingoViewSetting",
]);
const openBingoCardDetailModal = async (bingoCellId: string) => {
  await emits("openBingoCardDetailModal", bingoCellId);
};
// computed プロパティを作成
const createdAt = computed(() => {
  return dayjs(props.bingoCard.createdAt).locale("ja").format("YYYY/M/D HH:mm");
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

/**
 * ビンゴカードの公開設定
 */
const bingoCardPublicMessage = computed(() => {
  if (props.bingoCard.createdUid !== props.currentUserUid) {
    return "公開中";
  } else {
    return props.bingoCard.isPublic ? "公開中" : "非公開";
  }
});

/**
 * モーダルの処理
 */
// ムービーモーダルを開く
const movieModalIsOpen = ref(false);
const openMovieModal = (clearMovieUrl: String) => {
  if (!clearMovieUrl) return false;
  movieModalIsOpen.value = true;
};
// ビンゴカード詳細モーダルを閉じる
const closeMovieModal = async () => {
  movieModalIsOpen.value = false;
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
  border: 1px solid gray;
  border-radius: 5px;
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

.bingo-card {
  --angle: 0deg;
  --gradient: linear-gradient(var(--angle), var(--c5), var(--c4));
  appearance: none;
  border: 1px solid;
  -o-border-image: var(--gradient) 1;
  border-image: var(--gradient) 1;
  animation: 3s gradientRotate linear infinite;
  border-radius: 0.5rem;
}
@-webkit-keyframes gradientRotate {
  to {
    --angle: 360deg;
  }
}

@keyframes gradientRotate {
  to {
    --angle: 360deg;
  }
}
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.movie-button {
  position: absolute;
  top: -1%;
  right: 0px;
  z-index: 2;
  cursor: pointer;
}

.movie-button::before {
  position: absolute;
  content: "";
  background: linear-gradient(217deg, #fae3f2, var(--c4));
  //background: linear-gradient(217deg, #448ad5, #b8eaf9);
  width: 70px;
  height: 70px;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 6px 20px 0 rgba(179, 107, 221, 0.3);
  animation: border-transform 6s linear infinite;
  z-index: -1;
}

.movie-icon {
  width: 36px;
  margin: -5px auto;
}

.movie-icon path {
  fill: gray;
}
@keyframes border-transform {
  0%,
  100% {
    border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  }
  14% {
    border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
  }
  28% {
    border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
  }
  42% {
    border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
  }
  56% {
    border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
  }
  70% {
    border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
  }
  84% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
  }
}

.contents {
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
</style>
