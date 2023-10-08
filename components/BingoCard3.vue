<template>
  <div class="block p-6">
    <h1
      class="text-center mb-10 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl"
    >
      Memorial Bingo
    </h1>
    <div class="bingo-card-frame grid grid-cols-3 gap-3">
      <div v-for="mission in missions" :key="mission">
        <a
          class="hover:cursor-pointer block text-center"
          :data-modal-target="'authentication-modal' + mission.mission_id"
          :data-modal-toggle="'authentication-modal' + mission.mission_id"
        >
          <img
            class="h-auto max-w-full rounded-lg"
            src="@/assets/img/tree.jpg"
            alt=""
          />
        </a>
        <BingoCardDetail :mission="mission" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      missions: [
        {
          mission_id: 1,
          clear_flag: false,
          mission_title: "自然の美しさ",
          mission_detail: "美しい山々、湖、森林などの自然の景色を捉えた写真",
        },
        {
          mission_id: 2,
          clear_flag: false,
          mission_title: "街の風景",
          mission_detail: "ドライブ中に通過する街や町の風景をキャッチした写真",
        },
        {
          mission_id: 3,
          clear_flag: false,
          mission_title: "路の途中のカフェ",
          mission_detail:
            "道路脇にあるカフェやレストランでの風景や料理を撮影した写真",
        },
        {
          mission_id: 4,
          clear_flag: false,
          mission_title: "休憩ポイント",
          mission_detail:
            "ドライブ中に立ち寄った休憩スポットでの風景や活動を記録した写真",
        },
        {
          mission_id: 5,
          clear_flag: false,
          mission_title: "季節の変化",
          mission_detail: "季節ごとの変化を示す風景や植物を捉えた写真",
        },
        {
          mission_id: 6,
          clear_flag: false,
          mission_title: "地元のアート",
          mission_detail:
            "地元のアート作品、壁画、彫刻などを探し、撮影した写真",
        },
        {
          mission_id: 7,
          clear_flag: false,
          mission_title: "車のディテール",
          mission_detail:
            "愛車のディテールやカスタマイズをアップクローズで撮影した写真",
        },
        {
          mission_id: 8,
          clear_flag: false,
          mission_title: "日の出または日の入り",
          mission_detail: "美しい日の出や日の入りをキャッチした写真",
        },
        {
          mission_id: 9,
          clear_flag: false,
          mission_title: "道路のカーブ",
          mission_detail: "道路のカーブや山道の風景を楽しんで撮影した写真",
        },
      ],
    };
  },
};
</script>

<style>
.bingo-card-frame {
  max-width: 800px;
  margin: 0 auto;
}
</style>
