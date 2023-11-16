<template>
  <div
    id="vue-carousel"
    style="height: 32rem; width: 100vw; overflow: hidden"
    @touchstart="onTouchStartCard"
    @mousedown="onTouchStartCard"
  >
    <div class="carousel">
      <button
        class="nav left text-4xl"
        v-if="state.currentNum > 0 && !modalIsOpen"
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
        <div
          v-if="Math.abs(state.currentNum - i) < maxVisibility"
          class="card bg-white rounded-lg"
        >
          <BingoCardView
            @openBingoCardDetailModal="openBingoCardDetailModal"
            @changeBingoViewSetting="
              emits('changeBingoViewSetting', bingoCard.id, $event)
            "
            :bingoCard="bingoCard"
            :currentUserUid="props.currentUserUid"
            :isDisplayCenter="state.currentNum == i"
          />
        </div>
      </div>
      <button
        class="nav right text-4xl"
        v-if="state.currentNum < props.bingoCards.length - 1 && !modalIsOpen"
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
    <BingoCardDetailModal
      v-if="modalIsOpen"
      @closeBingoCardDetailModal="closeBingoCardDetailModal"
      @postBingoCellRequest="postBingoCellRequest"
      @postCheckFollowingSubject="postCheckFollowingSubject"
      @openNextBingoCardDetailModal="openNextBingoCardDetailModal"
      :currentUserUid="props.currentUserUid"
      :selectedBingoCell="selectedBingoCardCell"
      :isFollowingSubject="isFollowingSubject"
      :selectedBingoCardCellNo="selectedBingoCardCellNo"
      :answeredUserDetail="props.selectedBingoCellDetail?.answeredUserDetail"
    />
  </div>
</template>

<script setup lang="ts">
import { BingoCardDetail, BingoCellDetail } from "@/server/models/bingo/dto";
import { IsFollowingSubjectResponse } from "@/server/models/facades/visionai/imageDescription";

const props = defineProps({
  currentUserUid: {
    type: Object as PropType<String | undefined>,
    required: true,
  },
  bingoCards: {
    default: [],
    type: Array as PropType<BingoCardDetail[]>,
    required: true,
  },
  isFollowingSubject: {
    type: Object as PropType<IsFollowingSubjectResponse | null>,
    required: true,
  },
  selectedBingoCellDetail: {
    // モーダルで選択中のセルの詳細
    type: Object as PropType<BingoCellDetail | null>,
    required: false,
  },
});

const emits = defineEmits([
  "postBingoCellRequest",
  "postCheckFollowingSubject",
  "clearIsFollowingSubject",
  "getBingoCellDetail",
  "changeBingoViewSetting",
]);

const bingoCellId = ref("");
const moveThreshold = 30;
const maxVisibility = 3; // 画面に描画されるビンゴカードの数
const state = reactive({
  currentNum: 0, // 少ないと変な感じになるので1
  isSwiping: false,
  startX: null,
  diffX: 0,
});

/**
 *  ビンゴカード一覧のスワイプ処理
 */
const onTouchMoveCard = (event: any) => {
  if (state.startX == null) {
    return;
  }
  const currentX =
    "touches" in event ? event.touches[0].clientX : event.clientX;
  state.diffX = currentX - state.startX;
};

const canMove = (index: any) => {
  // return props.loop ? true : props.bingoCards[index] != null; // prop.loopは未実装のためコメントアウト
  return props.bingoCards[index] != null;
};

const onTouchEndCard = () => {
  if (state.startX == null) {
    return;
  }
  if (state.diffX > moveThreshold && canMove(state.currentNum - 1)) {
    state.currentNum--;
  } else if (state.diffX < -moveThreshold && canMove(state.currentNum + 1)) {
    state.currentNum++;
  }
  state.isSwiping = false;
  state.startX = null;
  state.diffX = 0;
};

onMounted(() => {
  window.addEventListener("mousemove", onTouchMoveCard);
  window.addEventListener("touchmove", onTouchMoveCard);
  window.addEventListener("mouseup", onTouchEndCard);
  window.addEventListener("touchend", onTouchEndCard);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onTouchMoveCard);
  window.removeEventListener("touchmove", onTouchMoveCard);
  window.removeEventListener("mouseup", onTouchEndCard);
  window.removeEventListener("touchend", onTouchEndCard);
});

const activeIncrement = () => state.currentNum++;
const activeDecrement = () => state.currentNum--;

const onTouchStartCard = (event: any) => {
  if (modalIsOpen.value) return false;
  state.isSwiping = true;
  state.startX = "touches" in event ? event.touches[0].clientX : event.clientX;
};

/**
 *  トップに表示されているビンゴカード
 */
const selectedBingoCard = computed(() => {
  return props.bingoCards[state.currentNum];
});
const selectedBingoCardId = computed(() => {
  return selectedBingoCard.value.id;
});
// モーダルに表示するビンゴのセル
const selectedBingoCardCell = computed(() => {
  return selectedBingoCard.value.bingoCells.filter(
    (value) => value.id === bingoCellId.value
  )[0];
});
// モーダルに表示するビンゴのセル
const selectedBingoCardCellNo = computed(() => {
  return selectedBingoCard.value.bingoCells.findIndex(
    (value) => value.id === bingoCellId.value
  );
});

/**
 * モーダルの処理
 */
// ビンゴカード詳細モーダルを開く
const modalIsOpen = ref(false);
const openNextBingoCardDetailModal = (index: number) => {
  openBingoCardDetailModal(selectedBingoCard.value.bingoCells[index].id);
};
const openBingoCardDetailModal = async (bingoCellIdByChild: string) => {
  // ビンゴセルの詳細情報を取得する
  await emits(
    "getBingoCellDetail",
    selectedBingoCardId.value,
    bingoCellIdByChild
  );
  bingoCellId.value = bingoCellIdByChild;
  modalIsOpen.value = true;
};
// ビンゴカード詳細モーダルを閉じる
const closeBingoCardDetailModal = async () => {
  modalIsOpen.value = false;
  emits("clearIsFollowingSubject"); // モーダルを閉じる時に、検証結果をクローズする。
};
// モーダルの投稿ボタンが押されたときの処理のイベント発火
const postBingoCellRequest = async (form: { comments: string }, file: any) => {
  // bingoCellIdを付与して返す。
  await emits(
    "postBingoCellRequest",
    selectedBingoCardId.value,
    bingoCellId.value,
    form,
    file
  );
  // 投稿処理後、モーダルを閉じる
  modalIsOpen.value = false;
};
// モーダルでアップロードした画像がテーマに沿っているかを確認するイベント発火
const postCheckFollowingSubject = async (file: any) => {
  // bingoCellIdを付与して返す。
  await emits(
    "postCheckFollowingSubject",
    selectedBingoCardId.value,
    bingoCellId.value,
    file
  );
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
  user-select: none;
  background: white;
  border: unset;
  border-radius: 5px;

  &.left {
    transform: translateX(-100%) translatey(-50%);
  }

  &.right {
    right: 0;
    transform: translateX(100%) translatey(-50%);
  }
}
</style>
