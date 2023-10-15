<template>
  <div class="bg p-10 md:p-20">
    <!-- Modal header -->
    <div class="flex items-center justify-end p-5 rounded-t">
      <button
        @click="closeCongratulationsBingoView"
        type="button"
        class="text-gray-700 border border-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <div class="flex justify-center items-center">
      <div v-for="x in 15" :class="'firework-' + x"></div>
      <div class="text-center pt-20">
        <div class="title">Nice Bingo! 🎉</div>
        <div>あと マスでコンプリート！</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["closeCongratulationsBingoView"]);
const closeCongratulationsBingoView = async () => {
  await emits("closeCongratulationsBingoView");
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
.bg {
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  top: 0;
  position: fixed;
}
.title {
  font-family: "Pacifico", cursive;
  font-size: clamp(36px, 0.6rem, 100px);
  color: #e2aa01;
}
[class^="firework-"] {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
}

$count: 15;
$frame-list: firework-sm, firework-md, firework-lg;
@for $i from 1 through $count {
  .firework-#{$i} {
    animation: nth($frame-list, random(3)) 1.2s both infinite;
    animation-delay: #{random($count) * 0.1}s;
    top: random(16) * 5% + 10%;
    left: random(16) * 5% + 10%;
  }
}

// dots generator
@function dots($r) {
  $result: ();
  // straight
  @for $i from 1 through 4 {
    $x: 0;
    $y: 0;
    @if $i <= 2 {
      $x: $r;
    } @else {
      $y: $r;
    }
    @if $i % 2 != 0 {
      $x: -$x;
      $y: -$y;
    }
    $result: append($result, #{$x}rem #{$y}rem 0 #e2aa01, comma);
  }
  // diagonal
  @for $i from 1 through 4 {
    $dist2: $r * 0.7;
    $x: $dist2;
    $y: $dist2;
    @if $i > 2 {
      $x: -$x;
    }
    @if $i % 2 != 0 {
      $y: -$y;
    }
    $result: append($result, #{$x}rem #{$y}rem 0 #e2aa01, comma);
  }
  @return $result;
}

// firework animation
@mixin fireworkSize($name, $r) {
  @keyframes firework-#{$name} {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    70% {
      opacity: 1;
    }
    100% {
      box-shadow: dots($r);
    }
  }
}
@include fireworkSize(sm, 0.5);
@include fireworkSize(md, 0.7);
@include fireworkSize(lg, 0.9);
</style>
