<template>
  <div
    class="bingo-owner-badge-object font-bold text-center text-start"
    :class="
      isAnonymousCard ? 'bingo-owner-badge-anonymous' : 'bingo-owner-badge-own'
    "
  >
    <!-- ログインしないユーザが作成したビンゴカードの場合は、匿名ユーザとして表示する。 -->
    <svg
      v-if="isAnonymousCard || !hasPhotoURL"
      fill="currentColor"
      class="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clip-rule="evenodd"
      />
    </svg>
    <img
      v-else-if="!isAnonymousCard"
      :src="props.createdUserDetail!.photoURL"
      alt=""
      class="rounded-full w-7"
    />
    <!-- 自分のカードの場合「あなた」と表示 -->
    <span class="text-xs">{{ message }}</span>
  </div>
  <div class="hidden group-hover:block absolute bg-white p-5 shadow-lg rounded">
    Detail Information Here.
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  currentUserUid: {
    type: Object as PropType<String | undefined>,
    required: true,
  },
  createdUid: {
    type: Object as PropType<String | undefined>,
    required: true,
  },
  createdUserDetail: {
    type: Object as PropType<UserInfo>,
    required: false,
  },
});

const message = computed(() => {
  if (props.createdUid === "") return "匿名";
  if (props.createdUid !== "" && props.createdUid === props.currentUserUid)
    return "あなた";
  return "誰か";
});

const hasPhotoURL = computed(() => {
  return props.createdUserDetail;
});

const isAnonymousCard = computed(() => {
  return props.createdUid === "";
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
