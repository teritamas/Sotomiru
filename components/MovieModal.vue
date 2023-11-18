<template>
  <!-- Extra Large Modal -->
  <div class="movie-modal-bg fixed top-0 left-0 right-0 z-50">
    <!-- Modal content -->
    <div
      class="relative border bg-white rounded-lg border-gray-700 w-11/12 md:w-9/12 lg:7/12 m-auto"
    >
      <ShareButton
        :title="`Sotomiruからの投稿`"
        :text="`「${bingoCard.name}」のビンゴカードをクリアしました！`"
        :url="props.clearMovieUrl"
      ></ShareButton>
      <!-- Modal header -->
      <div class="flex items-center justify-between pt-5 px-5 rounded-t">
        <h3 class="text-lg font-extrabold text-gray-00 pl-2"></h3>
        <button
          @click="closeMovieModal()"
          type="button"
          class="text-gray-700 border border-gray-300 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
      <!-- Modal body -->
      <div class="px-6">
        <video
          class="m-auto w-11/12 md:w-8/12 lg:w-6/12 sm:h-[74vh]"
          :src="clearMovieUrl"
          controls
        ></video>
      </div>
      <!-- Modal footer -->
      <div class="flex justify-between pb-6 px-6 space-x-2 rounded-b">
        <button
          @click="closeMovieModal()"
          data-modal-hide="extralarge-modal"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          戻る
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BingoCard } from "~/server/models/bingoCard/dto";
const props = defineProps({
  bingoCard: {
    type: Object as PropType<BingoCard>,
    required: true,
  },
  clearMovieUrl: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["closeMovieModal", "closeVideoModal"]);

/**
 * モーダルの状態に関する定義
 */
// モーダルクローズのイベント発火
const closeMovieModal = () => {
  emits("closeMovieModal");
  emits("closeVideoModal"); //親の親の BingoCardCarouselでのステータス管理のため
};
</script>

<style scoped>
.movie-modal-bg {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
</style>
