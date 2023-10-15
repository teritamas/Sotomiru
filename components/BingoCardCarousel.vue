<template>
  <div
    id="vue-carousel"
    style="height: 31rem"
    @touchstart="onTouchStart"
    @mousedown="onTouchStart"
  >
    <div class="carousel">
      <button
        class="nav left text-4xl"
        v-if="state.currentNum > 0"
        @click="activeDecrement"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          version="1.2"
          baseProfile="tiny"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 20c-.802 0-1.555-.312-2.122-.879l-7.121-7.121 7.122-7.121c1.133-1.133 3.11-1.133 4.243 0 .566.566.878 1.32.878 2.121s-.312 1.555-.879 2.122l-2.878 2.878 2.878 2.879c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.122c-.566.566-1.319.878-2.121.878zm-6.415-8l5.708 5.707c.378.378 1.037.377 1.414 0 .189-.189.293-.439.293-.707s-.104-.518-.293-.707l-4.292-4.293 4.292-4.293c.189-.189.293-.44.293-.707s-.104-.518-.293-.707c-.378-.379-1.037-.378-1.414-.001l-5.708 5.708z"
          ></path>
        </svg>
      </button>
      <div
        v-for="(bingoCard, i) in props.bingoCards"
        class="card-container"
        :style="
          '--currentNum:' +
          [i === state.currentNum ? 1 : 0] +
          ';' +
          '--offset:' +
          [(state.currentNum - i) / 3] +
          ';' +
          '--direction:' +
          [Math.sign(state.currentNum - i)] +
          ';' +
          '--abs-offset:' +
          [Math.abs(state.currentNum - i) / 3] +
          ';' +
          'pointer-events:' +
          [i === state.currentNum ? 'auto' : 'none'] +
          ';' +
          'opacity:' +
          [Math.abs(state.currentNum - i) >= maxVisibility ? '0' : '1'] +
          ';' +
          'display:' +
          [Math.abs(state.currentNum - i) > maxVisibility ? 'none' : 'block']
        "
      >
        <div class="card bg-white">
          <BingoCardView
            @openBingoCardDetailModal="openBingoCardDetailModal(bingoCard.id)"
            :title="bingoCard?.name!"
            :imageColor="bingoCard?.imageColor!"
            :bingoCells="bingoCard?.bingoCells!"
          />
          <BingoCardDetailModal
            v-if="modalIsOpen"
            @closeBingoCardDetailModal="closeBingoCardDetailModal"
            @postBingoCellRequest="postBingoCellRequest"
            @postCheckFollowingSubject="postCheckFollowingSubject"
            :bingoCells="bingoCard?.bingoCells!"
            :bingoCellId="bingoCellId"
            :isFollowingSubject="isFollowingSubject"
          />
        </div>
      </div>
      <button
        class="nav right text-4xl"
        v-if="state.currentNum < props.bingoCards.length - 1"
        @click="activeIncrement"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          version="1.2"
          baseProfile="tiny"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 20c-.802 0-1.555-.312-2.122-.879-.566-.566-.878-1.32-.878-2.121s.312-1.555.879-2.122l2.878-2.878-2.878-2.879c-.567-.566-.879-1.32-.879-2.121s.312-1.555.879-2.122c1.133-1.132 3.109-1.133 4.243.001l7.121 7.121-7.122 7.121c-.566.567-1.319.879-2.121.879zm0-14c-.268 0-.518.104-.707.292-.189.19-.293.441-.293.708s.104.518.293.707l4.292 4.293-4.292 4.293c-.189.189-.293.439-.293.707s.104.518.293.707c.378.379 1.037.378 1.414.001l5.708-5.708-5.708-5.707c-.189-.189-.439-.293-.707-.293z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "@/server/models/bingo/dto";
const MOVE_THRESHOLD = 30;
const NUM_DISPLAY_ITEM = 5;

const maxVisibility = ref(3);

const OFFSET_INDEXES = [...Array(NUM_DISPLAY_ITEM).keys()].map(
  (index) => index - Math.floor(NUM_DISPLAY_ITEM / 2)
);

const props = defineProps({
  bingoCards: {
    default: [],
    type: Array as PropType<BingoCard[]>,
    required: true,
  },
});

const state = reactive({
  currentNum: 3,
  isSwiping: false,
  startX: null,
  diffX: 0,
});

const onTouchMove = (event) => {
  if (state.startX == null) {
    return;
  }
  const currentX =
    "touches" in event ? event.touches[0].clientX : event.clientX;
  state.diffX = currentX - state.startX;
};

const canMove = (index) => {
  return props.loop ? true : props.bingoCards[index] != null;
};

const onTouchEnd = () => {
  if (state.startX == null) {
    return;
  }
  if (state.diffX > MOVE_THRESHOLD && canMove(state.currentNum - 1)) {
    state.currentNum--;
  } else if (state.diffX < -MOVE_THRESHOLD && canMove(state.currentNum + 1)) {
    state.currentNum++;
  }
  state.isSwiping = false;
  state.startX = null;
  state.diffX = 0;
};

onMounted(() => {
  window.addEventListener("mousemove", onTouchMove);
  window.addEventListener("touchmove", onTouchMove);
  window.addEventListener("mouseup", onTouchEnd);
  window.addEventListener("touchend", onTouchEnd);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onTouchMove);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("mouseup", onTouchEnd);
  window.removeEventListener("touchend", onTouchEnd);
});

const activeIncrement = () => state.currentNum++;
const activeDecrement = () => state.currentNum--;

const onTouchStart = (event) => {
  state.isSwiping = true;
  state.startX = "touches" in event ? event.touches[0].clientX : event.clientX;
};

import { BingoCardsGetResponse } from "~/server/models/bingo/response";
import { IsFollowingSubjectResponse } from "~/server/models/facades/visionai/imageDescription";
const route = useRoute();

const bingoCardId = ref("");
//const bingoCardId = route.params.bingoId as string;
const modalIsOpen = ref(false);
const bingoCellId = ref("");
//const bingoCard = ref(null as BingoCard | null);
const isFollowingSubject = ref(null as IsFollowingSubjectResponse | null);

// 最初の画面描画時にビンゴルームを作成
//onMounted(async () => {
//  const res = await fetchBingoCard();
//  bingoCard.value = res.bingoCard;
//  console.log(res);
//});

// ビンゴカードの情報取得
const fetchBingoCard = async () => {
  const res = await fetch(`/api/bingoCard/${bingoCardId}`);
  const data = (await res.json()) as BingoCardsGetResponse;
  return data;
};

// ビンゴカードの詳細を開く
const openBingoCardDetailModal = async (bingoCellIdByChild: string) => {
  bingoCardId.value = bingoCellIdByChild;
  modalIsOpen.value = true;
};

// ビンゴカードの詳細を閉じる
const closeBingoCardDetailModal = async () => {
  modalIsOpen.value = false;
  isFollowingSubject.value = null;
};

// アップロードした画像がテーマに沿っているかを確認する。
const postCheckFollowingSubject = async (file: any) => {
  // 前の検証結果をクリア
  isFollowingSubject.value = null;

  // リクエストボディの作成
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId.value,
    } as CheckFollowingSubjectPostRequest)
  );
  const res = await fetch(
    `/api/bingoCell/checkFollowingSubject/${bingoCardId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  isFollowingSubject.value = await res.json();
};

// ビンゴカードの詳細を投稿する
// 投稿完了後、ビンゴカードの最新の状態を取得し、モーダルを閉じる
const postBingoCellRequest = async (form: { comments: string }, file: any) => {
  const formData = new FormData();
  formData.append(
    "request",
    JSON.stringify({
      bingoCellId: bingoCellId.value,
      ...form,
    } as BingoCellPostRequest)
  );
  formData.append("file", file);
  await useFetch(`/api/bingoCell/${bingoCardId}`, {
    method: "PUT",
    body: formData,
  });
  const res = await fetchBingoCard();
  bingoCard.value = res.bingoCard;
  modalIsOpen.value = false;
};
</script>

<style lang="scss" scoped>
$color-purple: #8b5cf6;
$color-pink: #ec4899;
$color-gray: #9ca3af;
$color-black: #1f2937;
$card-size: 23rem;
$card-size: 20rem; //スマホだとこっちのほうがよさそう
.carousel {
  position: relative;
  width: $card-size;
  height: $card-size;
  perspective: 500px;
  transform-style: preserve-3d;
  margin: 1rem auto;
}

.card-container {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateY(calc(var(--offset) * 50deg))
    scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -30rem))
    translateX(calc(var(--direction) * -5rem));
  transition: all 0.3s ease-out;
}
.nav {
  color: rgb(106, 106, 106);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 70%;
  z-index: 2;
  user-select: none;
  background: unset;
  border: unset;

  &.left {
    transform: translateX(-100%) translatey(-50%);
  }

  &.right {
    right: 0;
    transform: translateX(100%) translatey(-50%);
  }
}
</style>
