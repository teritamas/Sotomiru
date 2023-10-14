<template>
  <div
    id="vue-carousel"
    style="height: 31rem"
    @touchstart="onTouchStart"
    @mousedown="onTouchStart"
    @transitionend="onTransitionEnd"
  >
    <div class="carousel">
      <div
        v-for="(bingoCard, i) in items"
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
          <a
            :href="`/BingoCard/${bingoCard.id}`"
            class="min-w-[98%] md:min-w-[70%] mr-1"
          >
            <BingoCardView
              :title="bingoCard.name"
              :imageColor="bingoCard.imageColor"
              :bingoCells="bingoCard.bingoCells"
            />
          </a>
        </div>
      </div>
      <!--<template v-if="getItem(state.currentNum + i) != null">-->
      <!--{{ i }}
        <div
          class="carousel__item"
          :style="{
            transition: state.isSwiping ? 'none' : undefined,
            transform: `translate3d(${
              -50 + (i - state.moveIndex) * 100
            }%, -50%, 0) translate3d(${state.diffX}px, 0, 0)`,
          }"
        >-->
      <!--<slot v-bind="{ item: getItem(state.currentNum + i) }"></slot>-->
      <!--<div class="card">-->
      <!--<a
                :href="`/BingoCard/${bingoCard.id}`"
                class="min-w-[98%] md:min-w-[70%] mr-1"
              >-->
      <!--<BingoCardView
              :title="bingoCard.name"
              :imageColor="bingoCard.imageColor"
              :bingoCells="bingoCard.bingoCells"
            />-->
      <!--</a>-->
      <!--</div>-->
      <!--</div></template-->
      <!--</template>-->
      <!--
      </template>-->
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
  items: { type: Array, default: () => [] },
  bingoCards: {
    default: [],
    type: Array as PropType<BingoCard[]>,
    required: true,
  },
});
const state = reactive({
  currentNum: 3,
  isSwiping: false,
  moveIndex: 0,
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
  console.log(currentX);
};

const canMove = (index) => {
  return props.loop ? true : props.items[index] != null;
};

const onTouchEnd = () => {
  if (state.startX == null) {
    return;
  }
  if (state.diffX > MOVE_THRESHOLD && canMove(state.currentNum - 1)) {
    state.moveIndex = -1;
  } else if (state.diffX < -MOVE_THRESHOLD && canMove(state.currentNum + 1)) {
    state.moveIndex = 1;
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

const onTouchStart = (event) => {
  state.isSwiping = true;
  state.startX = "touches" in event ? event.touches[0].clientX : event.clientX;

  // 既に移動中の場合はcurrentNumを更新する
  if (state.moveIndex !== 0) {
    state.currentNum =
      (state.currentNum + state.moveIndex + props.items.length) %
      props.items.length;
    state.moveIndex = 0;
  }
};
const onTransitionEnd = () => {
  if (state.moveIndex !== 0) {
    state.currentNum =
      (state.currentNum + state.moveIndex + props.items.length) %
      props.items.length;
    state.moveIndex = 0;
  }
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

.item {
  width: 100%;
  height: 100%;
  border: solid 1px #000;
}
</style>
