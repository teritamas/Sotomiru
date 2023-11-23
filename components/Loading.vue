<template>
  <div class="full-view">
    <div class="demo_stage">
      <div class="demo_wrap">
        <span class="demo_item demo_item_1 anime-updown"></span>
      </div>
      <div v-for="x in 20">
        <div
          class="demo_wrap"
          data-order="right"
          :style="'margin-right: ' + x * 411 + 'px'"
        >
          <span class="demo_item demo_item_2 anime"></span>
        </div>
        <div
          class="demo_wrap"
          data-order="right"
          :style="'margin-right: ' + x * 590 + 'px'"
        >
          <span class="demo_item demo_item_3 anime"></span>
        </div>
        <div
          class="demo_wrap"
          data-order="right"
          :style="'margin-right: ' + x * 700 + 'px'"
        >
          <span class="demo_item demo_item_4 anime"></span>
        </div>
      </div>
      <p
        class="font-bold text-white text-center"
        style="position: relative; top: 74px; font-size: 0.9em"
      >
        {{ LoadingText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  LoadingText: {
    type: String,
  },
});
</script>
<style scoped>
.demo_item {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-size: 100% 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
  display: block;
  position: relative;
}
.demo_item_1 {
  left: 72px;
  background-image: url("@/assets/img/car.png");
}
.demo_item_2 {
  /*木*/
  top: 14px;
  z-index: -1;
  width: 30px;
  height: 30px;
  background-image: url("@/assets/img/00663.png");
}
.demo_item_3 {
  /*建物*/
  top: -5px;
  z-index: -1;
  background-image: url("@/assets/img/01152.png");
}
.demo_item_4 {
  /*家*/
  top: 4px;
  z-index: -1;
  width: 40px;
  height: 40px;
  background-image: url("@/assets/img/00033.png");
}

.anime-updown {
  animation-name: upDown;
  animation-iteration-count: infinite;
  animation-duration: 0.1s;
  animation-direction: alternate;
  animation-timing-function: steps(2);
}
.demo_item_2.anime {
  transition-duration: 0.3s;
  transition-property: transform;
}

.demo_stage {
  position: relative;
  left: 30%;
  width: 40vw;
  height: 65px;
  top: 41%;
  display: block;
  border-bottom: solid #777 1px;
}

.demo_wrap {
  display: block;
  position: absolute;
  top: 20px;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-duration: 2250s;
  animation-iteration-count: 1;
}

.demo_wrap[data-order="right"] {
  animation-name: GoRight;
}

[data-order="right"] > .demo_item {
  transform: rotateY(180deg);
}
@keyframes GoRight {
  0% {
    right: 90%;
  }
  100% {
    right: -100000%;
  }
}

@keyframes upDown {
  0% {
    top: 0;
  }
  100% {
    top: 3px;
  }
}

.full-view {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
