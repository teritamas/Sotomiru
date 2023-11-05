<template>
  <div
    class="bingo-owner-badge-object font-bold"
    :class="
      props.isAnonymousCard
        ? 'bingo-owner-badge-anonymous'
        : 'bingo-owner-badge-own'
    "
  >
    <img
      v-if="!props.isAnonymousCard && currentUser"
      :src="currentUser.photoURL"
      alt="プロフィールアイコン"
      class="rounded-full w-7"
    />
    <span v-if="!props.isAnonymousCard && !currentUser">{{ message }}</span>
    <svg v-if="props.isAnonymousCard" fill="currentColor" class="w-6 h-6">
      <path
        fill-rule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { BingoCardDetail } from "~/server/models/bingo/dto";
import { useCurrentUser } from "vuefire";
const currentUser = useCurrentUser();

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
  //position: absolute;
  //top: 16px;
  //left: 0px;
  //padding: 5px;
  //font-size: 14px;
  //text-align: center;
  //border-radius: 0 0 10px 0;
}

.bingo-owner-badge-own {
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}

.bingo-owner-badge-anonymous {
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
</style>
