<template>
  <div
    class="bingo-owner-badge-object font-bold"
    :class="
      props.isAnonymousCard
        ? 'bingo-owner-badge-anonymous'
        : 'bingo-owner-badge-own'
    "
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { BingoCardDetail } from "~/server/models/bingo/dto";

const props = defineProps({
  isAnonymousCard: {
    type: Boolean,
    required: true,
  },
});

const message = computed(() => {
  return props.isAnonymousCard ? "だれか" : "あなた";
});
</script>

<style lang="scss" scoped>
.bingo-owner-badge-area {
  position: relative;
}
.not-show-vote-result {
  height: 90px;
  padding: 15px;
}
.bingo-owner-badge-object {
  position: absolute;
  top: 16px;
  left: 0px;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  border-radius: 0 0 10px 0;
}

.bingo-owner-badge-own {
  background: #ffca28;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}

.bingo-owner-badge-anonymous {
  background: #939087;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
</style>
