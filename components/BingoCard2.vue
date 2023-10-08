<template>
  <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow">
    <h1
      class="text-center mb-10 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
    >
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400"
        >Memorial Bingo</span
      >
    </h1>
    <div
      class="bingo-card-frame grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 grid-cols-3"
    >
      <figure
        v-for="mission in missions"
        :key="mission"
        class="flex flex-col hover:bg-blue-100 items-center justify-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700"
      >
        <a
          class="hover:cursor-pointer block text-center md:p-8"
          :data-modal-target="'authentication-modal' + mission.mission_id"
          :data-modal-toggle="'authentication-modal' + mission.mission_id"
        >
          <blockquote
            class="max-w-2xl p-3 mx-auto text-gray-500 lg:mb-8 dark:text-gray-400"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ mission.mission_title }}
            </h3>
            <p class="my-4 hidden md:block">
              {{ mission.mission_detail }}
            </p>
          </blockquote>
        </a>
        <BingoCardDetail :mission="mission" />
      </figure>
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
