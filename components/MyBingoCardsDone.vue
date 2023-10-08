<template>
  <div class="pb-20">
    <h2 class="text-center text-bray-700 text-xl mt-2.5">クリアしたビンゴ</h2>
    <div v-if="doneBingoCards.length === 0" class="text-white p-5 text-center">
      <p>
        交換したビンゴはありません！<br />
        ミッションを達成してビンゴを目指しましょう！
      </p>
    </div>
    <div class="p-2">
      <div class="flex" style="display: flex; overflow-x: scroll">
        <!--デザイン未定-->
        <bingo-card
          v-for="doneBingoCard in doneBingoCards"
          :key="doneBingoCard.index"
          style="min-width: 85vw"
          class="mx-1"
        />
        <!--デザイン未定-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      doneBingoCards: [
        {
          mission_id: 1,
          clear_flag: false,
          mission_title: "自然の美しさ",
          mission_detail: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        },
        {
          mission_id: 1,
          clear_flag: false,
          mission_title: "自然の美しさ",
          mission_detail: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        },
        {
          mission_id: 1,
          clear_flag: false,
          mission_title: "自然の美しさ",
          mission_detail: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        },
        {
          mission_id: 1,
          clear_flag: false,
          mission_title: "自然の美しさ",
          mission_detail: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        },
      ],
    };
  },
};
</script>
